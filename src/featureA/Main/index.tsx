import { router, globalState } from '..'
import { Frame } from '@vixen-front/ui'

export default function Main() {
    const { get, set } = globalState.use()

    const handleClick = () => {
        set('user', 'Noha')
    }

    return (
        <Frame direction="column" padding={20} gap={20}>
            <Frame height={{ ratio: 30 }} gap={20}>
                <p>Main Route from feature A!</p>
                <p>Hello {get('user')}!</p>
                <button onClick={handleClick}>Mais, je suis Noha !!!</button>
            </Frame>
            <Frame>
                <router.Link route="test">
                    Click to get Test Route ...
                </router.Link>
            </Frame>
        </Frame>
    )
}
