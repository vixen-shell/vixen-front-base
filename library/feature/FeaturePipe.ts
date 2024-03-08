import { EventTypes } from '../types'

export class FeaturePipe {
    private _webSocket: WebSocket | null = null
    private _listeners: (() => void)[] = []

    connect(featureName: string, clientId: string) {
        if (!this._webSocket) {
            this._webSocket = new WebSocket(
                `ws://localhost:6481/feature/${featureName}/pipe/${clientId}`
            )

            this._webSocket.onmessage = (e) => {
                const pipeEvent = JSON.parse(e.data)
                this._handlePipeEvents(pipeEvent)
            }
        }
    }

    private _handlePipeEvents(pipeEvent: EventTypes.ClientEvent) {
        console.log(pipeEvent)
        this._listeners.forEach((listener) => {
            listener()
        })
    }

    addEventListener(listener: () => void) {
        this._listeners.push(listener)
    }

    removeEventListener(listener: () => void) {
        const i = this._listeners.indexOf(listener)
        if (i) this._listeners.splice(i)
    }

    sendEvent(event: EventTypes.PipeEvent) {
        if (this._webSocket) {
            this._webSocket.send(JSON.stringify(event))
        }
    }
}

export class State {
    private _pipe: FeaturePipe | null = null

    connect(pipe: FeaturePipe) {
        this._pipe = pipe
    }

    get(key?: string) {
        if (this._pipe) {
            if (key) {
                this._pipe.sendEvent({
                    id: 'GET_STATE',
                    data: { key: key },
                })
            } else {
                this._pipe.sendEvent({
                    id: 'GET_STATE',
                })
            }
        }
    }

    set(value: any, key?: string) {
        if (this._pipe) {
            if (key) {
                this._pipe.sendEvent({
                    id: 'SET_STATE',
                    data: { key: key, value: value },
                })
            } else {
                this._pipe.sendEvent({
                    id: 'SET_STATE',
                    data: { state: value },
                })
            }
        }
    }
}
