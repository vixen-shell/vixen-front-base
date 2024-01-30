import type { RouterTypes, GlobalStateTypes } from '../types'

import Feature from './Feature'

export function create(
    content:
        | {
              router: RouterTypes.Router
              globalState?: GlobalStateTypes.GlobalState
          }
        | { feature: JSX.Element }
) {
    return <Feature content={content} />
}
