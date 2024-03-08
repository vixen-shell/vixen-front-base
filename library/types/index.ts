export namespace RouterTypes {
    export type RouterContext = {
        route: string
        updateRoute: (key: string) => void
        error: string
    }

    export type Routes = { [key: string]: JSX.Element }

    export type Router = {
        setInitialRoute: (route: string) => void
        Provider: ({ children }: { children: React.ReactNode }) => JSX.Element
        useRouter: () => RouterContext
        Route: () => JSX.Element
        Link: ({
            className,
            route,
            children,
        }: {
            className?: string | undefined
            route: string
            children: React.ReactNode
        }) => JSX.Element
    }
}

export namespace GlobalStateTypes {
    export type State = { [key: string]: null | string | number | boolean }

    export type Actions = { [key: string]: string }

    export type GlobalState = {
        set: (featureName: string) => void
        Provider: ({ children }: { children: React.ReactNode }) => JSX.Element
        use: () => {
            get: (key: string) => any
            set: (key: string, value: any) => void
        }
    }
}

export namespace EventData {
    export type State = {
        state: { [key: string]: null | string | number | boolean }
    }
    export type StateItem = {
        key: string
        value?: null | string | number | boolean
    }
}

export namespace EventTypes {
    export type PipeEvent = {
        id: 'GET_STATE' | 'SET_STATE' | 'SAVE_STATE'
        data?: EventData.State | EventData.StateItem
    }

    export type ClientEvent = {
        id: 'GET_STATE' | 'UPDATE_STATE'
        data?: EventData.State | EventData.StateItem
    }
}
