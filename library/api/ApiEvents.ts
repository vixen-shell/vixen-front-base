import type {
    EventData as Data,
    Output,
    Input,
    EventListenerCallback,
    EventListeners,
} from './eventTypes'

export class ApiEvents {
    private _webSocket: WebSocket
    private _listeners: EventListeners = {
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
        switch (event.id) {
            case 'UPDATE_STATE': {
                if (event.data) {
                    this._listeners[event.id].forEach((listener) => {
                        listener(event.data as Data.StateItem)
                    })
                }
                break
            }
        }
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
