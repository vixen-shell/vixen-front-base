import type { GlobalStateTypes } from '../types'
import { createContext, useContext, useReducer } from 'react'

export function create(
    initialState: GlobalStateTypes.State
): GlobalStateTypes.GlobalState {
    const actions = (() => {
        const thisActions: GlobalStateTypes.Actions = {}

        for (const key in initialState) {
            thisActions[`update_${key}`] = key
        }

        return thisActions
    })()

    function reducer(
        state: GlobalStateTypes.State,
        action: { type: string; payload: any }
    ): GlobalStateTypes.State {
        if (action.type in actions) {
            return { ...state, [actions[action.type]]: action.payload }
        }
        return state
    }

    const Context = createContext<
        | {
              state: GlobalStateTypes.State
              dispatch: React.Dispatch<{ type: string; payload: any }>
          }
        | undefined
    >(undefined)

    function Provider({ children }: { children: React.ReactNode }) {
        const [state, dispatch] = useReducer(reducer, initialState)

        return (
            <Context.Provider value={{ state, dispatch }}>
                {children}
            </Context.Provider>
        )
    }

    function use() {
        const { state, dispatch } = useContext(Context)!

        function get(key: string) {
            return state[key]
        }

        function set(key: string, value: any) {
            dispatch({ type: `update_${key}`, payload: value })
        }

        return { get, set }
    }

    return {
        Provider,
        use,
    }
}
