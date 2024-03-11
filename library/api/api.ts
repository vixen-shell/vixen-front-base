import { ApiRoutes } from './ApiRoutes'
import { ApiEvents } from './ApiEvents'

export class Api {
    private static _routes: ApiRoutes | undefined = undefined
    private static _events: ApiEvents | undefined = undefined

    static init(featureName: string, clientId: string) {
        Api._routes = new ApiRoutes(featureName, clientId)
        Api._events = new ApiEvents(Api._routes.featureEvents())
    }

    static get events(): ApiEvents {
        if (Api._events) return Api._events
        throw new Error('Api not initialized.')
    }

    static get routes(): ApiRoutes {
        if (Api._routes) return Api._routes
        throw new Error('Api not initialized.')
    }
}
