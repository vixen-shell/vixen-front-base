import { router, globalState } from '..'
import ui from '@vixen-front/ui'

export default function Main() {
    const { get, set } = globalState.use()

    const handleClick = () => {
        set('user', 'Noha')
    }

    return (
        <ui.Frame direction="column" padding={20} gap={20}>
            <ui.Frame height={{ ratio: 30 }} gap={20}>
                <p>Main Route from feature A!</p>
                <p>Hello {get('user')}!</p>
                <button onClick={handleClick}>Mais, je suis Noha !!!</button>
            </ui.Frame>
            <ui.Frame>
                <router.Link route="test">
                    Click to get Test Route ...
                </router.Link>
            </ui.Frame>
        </ui.Frame>
    )
}
