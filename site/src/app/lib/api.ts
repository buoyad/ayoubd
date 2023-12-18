const httpUrl = process.env.NEXT_PUBLIC_API_URL
const apiURL = `${httpUrl}/api`

export const fetchAPI = async () => {
    try {
        const response = await fetch(apiURL + '/hello')
        const data = await response.text()
        return data
    } catch (error) {
        return JSON.stringify({ error })
    }
}

export const socketAPI = () => {
    const socket = new WebSocket(apiURL.replace('http', 'ws'))
    return socket
}