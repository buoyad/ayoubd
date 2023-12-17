const http = require('http')
const httpProxy = require('http-proxy')

const API_URL = process.env.API_URL
const NEXT_APP_URL = 'http://localhost:3000'
const PORT = process.env.PROXY_PORT || 8080

const proxy = httpProxy.createProxyServer()

const server = http.createServer((req, res) => {
    if (req.url.startsWith('/api')) {
        console.log(`Forwarding API request to ${API_URL}`)
        proxy.web(req, res, { target: API_URL, changeOrigin: true })
    } else {
        proxy.web(req, res, { target: NEXT_APP_URL })
    }
}).listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

server.on('upgrade', (req, socket, head) => {
    if (req.url.startsWith('/api')) {
        const target = API_URL.replace(/^http/, 'ws')
        console.log(`Forwarding socket upgrade request to ${target}`)
        proxy.ws(req, socket, head, { target: API_URL, changeOrigin: true })
    } else {
        proxy.ws(req, socket, head, { target: NEXT_APP_URL })
    }
})

proxy.on('error', (err, req, res) => {
    console.error('Proxy error:', err)
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    })
    res.end('Something went wrong. And we are reporting a custom error message.')
})
