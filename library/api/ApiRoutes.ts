function uri(scheme: 'http' | 'ws', path: string) {
    const [host, port] = ['localhost', '6481']
    return `${scheme}://${host}:${port}${path}`
}

export class ApiRoutes {
    private _featureName: string
    private _clientId: string

    constructor(featureName: string, clientId: string) {
        this._featureName = featureName
        this._clientId = clientId
    }

    static ping = () => uri('http', '/ping')

    featureEvents = () =>
        uri('ws', `/feature/${this._featureName}/pipe/${this._clientId}`)

    featureNames = () => uri('http', '/features/names')

    startFeature = () => uri('http', `/feature/${this._featureName}/start`)

    stopFeature = () => uri('http', `/feature/${this._featureName}/stop`)

    featureState = () => uri('http', `/feature/${this._featureName}/state`)

    frameIds = () => uri('http', `/frames/${this._featureName}/ids`)

    toggleFrame = (frameId: string) =>
        uri('http', `/frame/${this._featureName}/toggle/${frameId}`)

    openFrame = (frameId: string) =>
        uri('http', `/frame/${this._featureName}/open/${frameId}`)

    closeFrame = (frameId: string) =>
        uri('http', `/frame/${this._featureName}/close/${frameId}`)
}
