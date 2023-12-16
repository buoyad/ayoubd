const apiURL = 'http://localhost:3001/api/hello'
const apiSocketURL = 'ws://127.0.0.1:3001/api'

export const fetchAPI = async () => {
    const response = await fetch(apiURL)
    const data = await response.text()
    return data
}

export const socketAPI = () => {
    const socket = new WebSocket(apiSocketURL)
    return socket
}