import type { RouterTypes } from '../types'
import { createContext, useContext, useState, useEffect } from 'react'
import ui from '@vixen-front/ui'

export function create(): RouterTypes.Router {
    const thisRoutes = (() => {
        let _thisRoutes: RouterTypes.Routes = {}

        function hasRoute(key: string) {
            return key in _thisRoutes
        }

        function setRoutes(routes: RouterTypes.Routes) {
            _thisRoutes = routes
        }

        function getRoute(key: string) {
            if (hasRoute(key)) return _thisRoutes![key]
            return <ui.ErrorFrame message={useRouter().error} />
        }

        return {
            hasRoute,
            setRoutes,
            getRoute,
        }
    })()

    const initialContext: RouterTypes.RouterContext = {
        route: '',
        updateRoute: undefined,
        error: '',
    }

    const Context = createContext<RouterTypes.RouterContext>(initialContext)

    function Provider({ children }: { children: React.ReactNode }) {
        const [route, setRoute] = useState<string>('')
        const [error, setError] = useState<string>('')

        const updateRoute = (key: string) => {
            const route = thisRoutes.hasRoute(key) && key
            if (!route) setError(`Route '${key}' not found.`)
            setRoute(route ? key : 'error')
        }

        useEffect(() => {
            updateRoute('main')
        }, [])

        return (
            <Context.Provider
                value={{
                    route,
                    updateRoute,
                    error,
                }}
            >
                {children}
            </Context.Provider>
        )
    }

    function useRouter() {
        return useContext(Context)
    }

    function Route(): JSX.Element {
        return thisRoutes.getRoute(useRouter().route)
    }

    function Link({
        className,
        route,
        children,
    }: {
        className?: string
        route: string
        children: React.ReactNode
    }) {
        const { updateRoute } = useRouter()

        const redirect = () => {
            updateRoute!(route)
        }

        return (
            <div
                className={`ui_link ${className}`}
                style={{ cursor: 'pointer' }}
                onClick={() => redirect()}
            >
                {children}
            </div>
        )
    }

    return {
        Provider,
        setRoutes: thisRoutes.setRoutes,
        useRouter,
        Route,
        Link,
    }
}
