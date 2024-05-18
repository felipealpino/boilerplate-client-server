import { LoadRoutes } from '@/components/InitApp/LoadRoutes'
import { LoadSocket } from '@/components/InitApp/LoadSocket'
import { Fragment } from 'react'

export function App() {
  return (
    <Fragment>
      <LoadSocket />
      <LoadRoutes />
    </Fragment>
  )
}
