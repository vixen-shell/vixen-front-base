import type { RouteItems } from '../router'
import type { GlobalStateType } from '../state'

import { Routes } from '../router'
import { GlobalState } from '../state'
import { Api } from '../api'

import Feature from './Feature'

export function create(routes: RouteItems) {
    Routes.define(routes)

    const feature = (
        featureName: string,
        initialRoute: string,
        initialState: GlobalStateType,
        clientId: string
    ) => {
        Api.init(featureName, clientId)
        GlobalState.initialState = initialState
        return <Feature initialRoute={initialRoute} />
    }

    return feature
}
