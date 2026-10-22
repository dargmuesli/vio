// Runs the dev server on an internal port, warms it up, then proxies the
// public port to it transparently.
//
// nuxt dev answers 503 "Starting Nuxt..." while it starts up, and a request
// that reaches it during the switch to the real app can hang without ever
// being answered. Playwright's webServer availability check has no
// per-request timeout and does not retry while one is in flight, so a single
// check landing in that window would exhaust the whole timeout even though
// the site is up. Keeping the server on an internal port until it has
// answered real page loads twice in a row means the checks and the browsers
// only ever talk to a warm server; until the proxy opens they get connection
// refused, which they retry without hanging. The warmup polls use a fresh
// connection and a hard timeout per attempt, so a single orphaned request
// cannot stall them.
//
// Usage: node warm-dev-server.mjs
// The public port comes from PORT (as set by the e2e script); the dev server
// runs on PORT + 1000.

import { spawn } from 'node:child_process'
import https from 'node:https'
import net from 'node:net'

const host = process.env.HOST || 'app.localhost'
const publicPort = Number(process.env.PORT || 3000)
const internalPort = publicPort + 1000
const warmupBudgetMs = 120_000

const server = spawn('pnpm run --dir ../src start:dev', {
  env: { ...process.env, PORT: String(internalPort) },
  shell: true,
  stdio: 'inherit',
})

function stop(code) {
  server.kill('SIGTERM')
  process.exit(code)
}

process.on('SIGTERM', () => stop(0))
process.on('SIGINT', () => stop(0))
server.on('exit', (code) => stop(code ?? 1))

// matches playwright's own availability check: 200 to 403
function probe() {
  return new Promise((resolve) => {
    const request = https.get(
      {
        host,
        path: '/',
        port: internalPort,
        // talks only to the local dev server we just spawned on an internal, un-exposed
        // loopback port, with our own mkcert dev cert, so there is no untrusted peer to
        // authenticate; mirrors the e2e's ignoreHTTPSErrors. We only care that it is up.
        rejectUnauthorized: false,
        timeout: 2500,
      },
      (response) => {
        const available =
          response.statusCode >= 200 && response.statusCode < 404
        response.resume()
        response.on('end', () => resolve(available))
      },
    )
    request.on('error', () => resolve(false))
    request.on('timeout', () => {
      request.destroy()
      resolve(false)
    })
  })
}

async function waitForWarmup() {
  const start = Date.now()
  let consecutive = 0
  while (Date.now() - start < warmupBudgetMs) {
    if (await probe()) consecutive += 1
    else consecutive = 0
    if (consecutive >= 2) return true
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  return false
}

async function openProxy() {
  const proxy = net.createServer((socket) => {
    const upstream = net.connect({ host: '127.0.0.1', port: internalPort })
    socket.pipe(upstream)
    upstream.pipe(socket)
    socket.on('error', () => upstream.destroy())
    upstream.on('error', () => socket.destroy())
  })
  await new Promise((resolve, reject) => {
    proxy.once('error', reject)
    proxy.listen(publicPort, resolve)
  })
  return proxy
}

if (!(await waitForWarmup())) {
  process.stderr.write('dev server did not warm up in time\n')
  stop(1)
}

let proxy
try {
  proxy = await openProxy()
} catch (error) {
  process.stderr.write(
    `could not open the proxy on port ${publicPort}: ${error.message}\n`,
  )
  stop(1)
}

proxy.on('close', () => stop(0))
