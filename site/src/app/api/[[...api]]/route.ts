import { STATUS_CODES } from "http";
import { NextRequest, NextResponse } from "next/server";

// replay any /api/* requests to the ayoubd-api app

function replayToAPI() {
    return new Response('', {
        status: 200,
        headers: { "fly-replay": "app=ayoubd-api" }
    })
}

export { replayToAPI as GET, replayToAPI as POST }