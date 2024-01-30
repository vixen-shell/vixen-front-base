import { router, globalState } from '..'
import ui from '@vixen-front/ui'

export default function Main() {
    const { get } = globalState.use()

    return (
        <ui.Frame>
            <p>Test Route from feature A!</p>
            <p>Hello {get('user')}!</p>
            <router.Link route="main">
                Click to return to the Main Route ...
            </router.Link>
        </ui.Frame>
    )
}
