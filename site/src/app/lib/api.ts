const httpUrl = process.env.NEXT_PUBLIC_SITE_URL
const apiURL = `${httpUrl}/api`

export const fetchAPI = async () => {
    const response = await fetch(apiURL)
    const data = await response.text()
    return data
}

export const socketAPI = () => {
    const socket = new WebSocket(apiURL.replace('http', 'ws'))
    return socket
}