import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorFrame } from '@vixen-front/ui'
import { GlobalStateType } from '../state'
import { Api } from '../api'

type FeatureCallback = (
    initialRoute: string,
    initialState: GlobalStateType
) => JSX.Element

function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search)

    return {
        featureName: urlParams.get('feature'),
        initialRoute: urlParams.get('route'),
        clientId: urlParams.get('client_id'),
    }
}

export function create(container: HTMLElement) {
    const urlParams = getUrlParams()

    const ErrorFeature = (message: string) => {
        return <ErrorFrame message={message} />
    }

    async function getFeatureByImport(
        importCallback: (feature: string | null) => Promise<any>
    ): Promise<FeatureCallback> {
        const featureName = urlParams.featureName

        if (!featureName) {
            throw new Error('Missing feature parameter !')
        }

        try {
            const feature = (await importCallback(featureName)).default
            if (!feature) throw new Error()
            return feature as FeatureCallback
        } catch (error: any) {
            throw new Error(`Feature '${urlParams.featureName}' not found !`)
        }
    }

    function insertFeature(feature: JSX.Element) {
        const Feature = () => feature

        ReactDOM.createRoot(container).render(
            <React.StrictMode>
                <Feature />
            </React.StrictMode>
        )
    }

    async function initFeature(feature: FeatureCallback) {
        if (!urlParams.clientId) {
            throw new Error('Missing client parameter !')
        }

        Api.init(urlParams.featureName!, urlParams.clientId!)

        const response = await fetch(Api.routes.featureState())

        if (!response.ok) {
            switch (response.status) {
                case 409: {
                    return response.json().then((data) => {
                        throw new Error(data.message + '.')
                    })
                }
                default: {
                    throw new Error('Unexpected error')
                }
            }
        }

        const data: any = await response.json()

        if ('state' in data) {
            const initialState = data.state
            console.log(urlParams.clientId)

            insertFeature(feature(urlParams.initialRoute!, initialState))
        } else {
            throw new Error('Missing initial State.')
        }
    }

    async function render(parameters: {
        importCallback: (featureName: string | null) => Promise<any>
    }) {
        try {
            const feature = await getFeatureByImport(parameters.importCallback)
            await initFeature(feature)
        } catch (error: any) {
            console.error(error)
            insertFeature(ErrorFeature(error.message))
        }
    }

    return { render }
}
