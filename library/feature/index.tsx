import type { RouteItems } from '../router'
import type { GlobalStateType } from '../state'

import { Routes } from '../router'
import { GlobalState } from '../state'

import Feature from './Feature'

export function create(routes: RouteItems) {
    Routes.define(routes)

    const feature = (initialRoute: string, initialState: GlobalStateType) => {
        GlobalState.initialState = initialState
        return <Feature initialRoute={initialRoute} />
    }

    return feature
}
