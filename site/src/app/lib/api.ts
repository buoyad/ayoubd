const httpUrl = process.env.NEXT_PUBLIC_SITE_URL
if (!httpUrl) {
    throw new Error('NEXT_PUBLIC_SITE_URL is not defined')
}
const wsUrl = new URL(httpUrl)
wsUrl.protocol = wsUrl.protocol === 'https:' ? 'wss:' : 'ws:'
wsUrl.pathname = '/api/ws'
const apiURL = `${httpUrl}/api/hello`
console.log('trying to connect to websocket at', wsUrl.toString())
const apiSocketURL = wsUrl

export const fetchAPI = async () => {
    const response = await fetch(apiURL)
    const data = await response.text()
    return data
}

export const socketAPI = () => {
    const socket = new WebSocket(apiSocketURL)
    return socket
}