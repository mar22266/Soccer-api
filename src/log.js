/* eslint-disable no-console */

const logError = (message) => {
  const now = new Date()
  console.error(now.toISOString(), message)
}

const logAPiRequest = (method, path, body) => {
  const now = new Date()
  console.log('[REQUEST]', now.toISOString(), method, path, body)
}

const logAPiResponse = (method, path, body) => {
  const now = new Date()
  console.log('[RESPONSE]', now.toISOString(), method, path, body)
}

export { logError, logAPiRequest, logAPiResponse }
