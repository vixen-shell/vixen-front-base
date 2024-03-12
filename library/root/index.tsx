import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorFrame } from '@vixen-front/ui'
import { GlobalStateType } from '../state'
import { Api } from '../api'

type ImportCallback = (featureName: string | null) => Promise<any>

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

    async function getFeature(
        importCallback: ImportCallback
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
        if (!urlParams.clientId) throw new Error('Missing client parameter !')

        await Api.init(urlParams.featureName!, urlParams.clientId!)

        const initialState = await Api.getFeatureState()
        insertFeature(feature(urlParams.initialRoute!, initialState))
    }

    async function render(importCallback: ImportCallback) {
        try {
            const feature = await getFeature(importCallback)
            await initFeature(feature)
        } catch (error: any) {
            console.error(error)
            insertFeature(ErrorFeature(error.message))
        }
    }

    return { render }
}
