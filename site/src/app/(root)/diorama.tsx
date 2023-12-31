'use client'
import * as React from 'react'

const Component = React.lazy(() => import('@/ui/drawings/diorama').then((m) => ({ default: m.Diorama })))

export default function Diorama() {
    return (
        <React.Suspense fallback={<div style={{ height: 'var(--content-width)' }}><p>loading...</p></div>}>
            <Component />
        </React.Suspense>
    )
}