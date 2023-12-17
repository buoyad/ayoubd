const apiURL = '/api/hello'
const apiSocketURL = '/api'

export const fetchAPI = async () => {
    const response = await fetch(apiURL)
    const data = await response.text()
    return data
}

export const socketAPI = () => {
    const socket = new WebSocket(apiSocketURL)
    return socket
}