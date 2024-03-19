import type {
    Output,
    Input,
    EventListenerCallback,
    EventListeners,
} from './eventTypes'

export class ApiEvents {
    private _webSocket: WebSocket
    private _listeners: EventListeners = {
        LOG: [],
        UPDATE_STATE: [],
    }

    constructor(pipeRoute: string) {
        this._webSocket = new WebSocket(pipeRoute)

        this._webSocket.onmessage = (e) => {
            const event: Input.Event = JSON.parse(e.data)
            this._handleInputs(event)
        }
    }

    private _handleInputs(event: Input.Event) {
        if (event.id in this._listeners) {
            if (event.data) {
                this._listeners[event.id].forEach((listener) => {
                    listener(event.data)
                })
            }
        }
    }

    hasListeners(eventId: Input.Ids) {
        return this._listeners[eventId].length !== 0
    }

    addListener(eventId: Input.Ids, callback: EventListenerCallback) {
        this._listeners[eventId].push(callback)
    }

    removeListener(eventId: Input.Ids, callback: EventListenerCallback) {
        this._listeners[eventId] = this._listeners[eventId].filter(
            (listener) => listener !== callback
        )
    }

    send(event: Output.Event) {
        this._webSocket.send(JSON.stringify(event))
    }
}
