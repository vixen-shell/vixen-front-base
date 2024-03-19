export namespace EventData {
    export type StateItem = {
        key: string
        value: null | string | number | boolean
    }

    export type Log = {
        level: 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL'
        purpose: string
        data?: {
            type: 'TEXT' | 'DATA'
            content: string | { [key: string]: string | number | boolean }
            asset?: string
        }
    }
}

export namespace Output {
    export type Ids = 'GET_STATE' | 'SET_STATE' | 'SAVE_STATE' | 'LOG'
    export type Data = EventData.StateItem | EventData.Log

    export type Event = {
        id: Ids
        data?: Data
    }
}

export namespace Input {
    export type Ids = 'UPDATE_STATE' | 'LOG'
    export type Data = EventData.StateItem | EventData.Log

    export type Event = {
        id: Ids
        data?: Data
    }
}

export type EventListenerCallback = (data: any) => void

export type EventListeners = {
    [key in Input.Ids]: EventListenerCallback[]
}
