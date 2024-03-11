export namespace EventData {
    export type StateItem = {
        key: string
        value: null | string | number | boolean
    }
}

export namespace Output {
    export type Ids = 'SET_STATE' | 'SAVE_STATE'
    export type Data = EventData.StateItem

    export type Event = {
        id: Ids
        data?: Data
    }
}

export namespace Input {
    export type Ids = 'UPDATE_STATE'
    export type Data = EventData.StateItem

    export type Event = {
        id: Ids
        data?: Data
    }
}

export type EventListenerCallback = (data: Input.Data) => void

export type EventListeners = {
    [key in Input.Ids]: EventListenerCallback[]
}
