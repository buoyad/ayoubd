'use client'
import * as React from 'react'
import { dims } from '@/ui/drawings/dimensions'

const Component = React.lazy(() =>
  import('@/ui/drawings/diorama').then((m) => ({ default: m.Diorama })),
)

export default function Diorama() {
  return (
    <React.Suspense
      fallback={
        <div style={{ height: dims.diorama.height, width: dims.diorama.width }}>
          <p>loading...</p>
        </div>
      }
    >
      <Component />
    </React.Suspense>
  )
}
