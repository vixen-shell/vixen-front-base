export namespace RouterTypes {
    export type RouterContext = {
        route: string
        updateRoute: ((key: string) => void) | undefined
        error: string
    }

    export type Routes = { [key: string]: JSX.Element }

    export type Router = {
        Provider: ({ children }: { children: React.ReactNode }) => JSX.Element
        setRoutes: (routes: Routes) => void
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
    export type State = { [key: string]: any }
    export type Actions = { [key: string]: string }
    export type GlobalState = {
        Provider: ({ children }: { children: React.ReactNode }) => JSX.Element
        use: () => {
            get: (key: string) => any
            set: (key: string, value: any) => void
        }
    }
}
