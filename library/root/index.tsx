import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorFrame } from '@vixen-front/ui'
import { GlobalStateType } from '../state'
import { error } from 'console'

type FeatureCallback = (
    initialRoute: string,
    initialState: GlobalStateType
) => JSX.Element

function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search)

    return {
        featureName: urlParams.get('feature'),
        initialRoute: urlParams.get('route'),
    }
}

export function create(container: HTMLElement) {
    const urlParams = getUrlParams()

    async function getFeatureByImport(
        importCallback: (feature: string | null) => Promise<any>
    ): Promise<FeatureCallback | void> {
        const featureName = urlParams.featureName

        try {
            const feature = (await importCallback(featureName)).default

            if (!feature) {
                throw new Error(
                    `'${featureName}' does not export feature as default !`
                )
            } else {
                return feature as FeatureCallback
            }
        } catch (error) {
            console.error(error)
            return
        }
    }

    const ErrorFeature = (message?: string) => {
        if (!message)
            message = urlParams.featureName
                ? `Feature '${urlParams.featureName}' not found !`
                : 'Missing feature parameter !'

        return <ErrorFrame message={message} />
    }

    function insertFeature(feature: JSX.Element) {
        const Feature = () => feature

        ReactDOM.createRoot(container).render(
            <React.StrictMode>
                <Feature />
            </React.StrictMode>
        )
    }

    function initFeature(feature: FeatureCallback | void) {
        if (!feature) {
            insertFeature(ErrorFeature())
        } else {
            fetch(
                `http://localhost:6481/feature/${urlParams.featureName}/state`
            )
                .then((response) => {
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
                    return response.json()
                })
                .then((data) => {
                    if ('state' in data) {
                        const initialState = data.state

                        insertFeature(
                            feature(urlParams.initialRoute!, initialState)
                        )
                    } else {
                        throw new Error('Missing initial State.')
                    }
                })
                .catch((error) => {
                    insertFeature(ErrorFeature(error.message))
                    console.error(error)
                })
        }
    }

    function render(parameters: {
        importCallback: (feature: string | null) => Promise<any>
    }) {
        if ('importCallback' in parameters) {
            getFeatureByImport(parameters.importCallback).then((feature) => {
                initFeature(feature)
            })
        }
    }

    return { render }
}
