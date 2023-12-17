// replay any /api/* requests to the ayoubd-api app

function replayToAPI(req: Request) {
    if (process.env.NODE_ENV === 'development') {
        // redirect to localhost:3001
        const urlParsed = new URL(req.url)
        urlParsed.host = 'localhost:3001'
        return new Response('', {
            status: 302,
            headers: { "Location": urlParsed.toString() }
        })
    }
    return new Response('', {
        status: 200,
        headers: { "fly-replay": "app=ayoubd-api" }
    })
}

export { replayToAPI as GET, replayToAPI as POST }