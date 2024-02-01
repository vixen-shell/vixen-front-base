import type { RouterTypes, GlobalStateTypes } from '../types'

import { useEffect } from 'react'
import initFeature from './initFeature'
import { ErrorFrame } from '@vixen-front/ui'

interface FeatureProps {
    content:
        | {
              router: RouterTypes.Router
              globalState?: GlobalStateTypes.GlobalState
          }
        | { feature: JSX.Element }
}

export default function Feature({ content }: FeatureProps) {
    useEffect(initFeature, [])
    let feature: JSX.Element = <ErrorFrame />

    if ('router' in content) {
        const routedFeature = (
            <content.router.Provider>
                <content.router.Route />
            </content.router.Provider>
        )

        if (content.globalState) {
            const RoutedFeature = () => routedFeature
            feature = (
                <content.globalState.Provider>
                    <RoutedFeature />
                </content.globalState.Provider>
            )
        } else {
            feature = routedFeature
        }
    }

    if ('feature' in content) {
        feature = content.feature
    }

    return feature
}
