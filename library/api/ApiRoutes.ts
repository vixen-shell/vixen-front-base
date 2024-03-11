export class ApiRoutes {
    private _featureName: string
    private _clientId: string

    constructor(featureName: string, clientId: string) {
        this._featureName = featureName
        this._clientId = clientId
    }

    private _uri(scheme: 'http' | 'ws', path: string) {
        const [host, port] = ['localhost', '6481']
        return `${scheme}://${host}:${port}${path}`
    }

    featureEvents = () =>
        this._uri('ws', `/feature/${this._featureName}/pipe/${this._clientId}`)

    featureNames = () => this._uri('http', '/features/names')

    startFeature = () =>
        this._uri('http', `/feature/${this._featureName}/start`)

    stopFeature = () => this._uri('http', `/feature/${this._featureName}/stop`)

    featureState = () =>
        this._uri('http', `/feature/${this._featureName}/state`)

    frameIds = () => this._uri('http', `/frames/${this._featureName}/ids`)

    toggleFrame = (frameId: string) =>
        this._uri('http', `/frame/${this._featureName}/toggle/${frameId}`)

    openFrame = (frameId: string) =>
        this._uri('http', `/frame/${this._featureName}/open/${frameId}`)

    closeFrame = (frameId: string) =>
        this._uri('http', `/frame/${this._featureName}/close/${frameId}`)
}
