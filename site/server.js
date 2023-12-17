const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const httpProxy = require('http-proxy')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

const apiServer = process.env.API_URL
const proxy = httpProxy.createProxyServer({ target: apiServer, ws: true })

app.prepare().then(() => {
    const s = createServer(async (req, res) => {
        try {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true)
            const { pathname, query } = parsedUrl
            await handle(req, res, parsedUrl)
        } catch (err) {
            console.error('Error occurred handling', req.url, err)
            res.statusCode = 500
            res.end('internal server error')
        }
    })
        .once('error', (err) => {
            console.error(err)
            process.exit(1)
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`)
        })

    // listen to requests to `/api` and proxy them to `apiServer`
    s.on('request', (req, res) => {
        const parsedUrl = parse(req.url, true)
        const { pathname } = parsedUrl
        if (pathname.startsWith('/api')) {
            console.log(`Proxying ${req.url} http to ${apiServer}`)
            proxy.web(req, res, { target: apiServer })
        }
    })

    s.on('upgrade', (req, socket, head) => {
        const parsedUrl = parse(req.url, true)
        const { pathname } = parsedUrl
        if (pathname.startsWith('/api')) {
            console.log(`Proxying ${req.url} websocket to ${apiServer}`)
            proxy.ws(req, socket, head)
        }
    })

})