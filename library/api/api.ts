import { ApiRoutes } from './ApiRoutes'
import { ApiEvents } from './ApiEvents'
import { GlobalStateType } from '../state'

export class Api {
    private static _routes: ApiRoutes | undefined = undefined
    private static _events: ApiEvents | undefined = undefined

    static async init(featureName: string, clientId: string) {
        if (!(await Api.ping())) throw new Error('Unable to acces Vixen Api.')
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

    static async ping(): Promise<Boolean> {
        try {
            if (!(await fetch(ApiRoutes.ping())).ok) return false
            return true
        } catch (error) {
            return false
        }
    }

    static async getFeatureState(): Promise<GlobalStateType> {
        const response = await fetch(Api.routes.featureState())

        if (!response.ok) {
            if (response.status === 409) {
                return response.json().then((data) => {
                    throw new Error(data.message)
                })
            } else {
                throw new Error('Unexpected error')
            }
        }

        const data: any = await response.json()

        if ('state' in data) {
            return data.state as GlobalStateType
        } else {
            throw new Error('Unable to acces any state.')
        }
    }
}
