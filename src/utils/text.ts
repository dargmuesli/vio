export const copyText = async (text: string) =>
  (await import('clipboardy')).default.write(text)
