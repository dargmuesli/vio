import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '../..')

const certSuffix = process.env.CI ? '-ci' : '-dev'
const certPath = path.join(root, `.config/certificates/ssl${certSuffix}.crt`)
const keyPath = path.join(root, `.config/certificates/ssl${certSuffix}.key`)

const serveProcess = spawn(
  'serve',
  ['playground/.output/public', '--ssl-cert', certPath, '--ssl-key', keyPath],
  {
    stdio: 'inherit',
    cwd: root,
  },
)

serveProcess.on('error', (error) => {
  console.error('Failed to start serve:', error)
  process.exit(1)
})

serveProcess.on('exit', (code) => {
  process.exit(code || 0)
})
