import { RouterLink } from '../../__library'
import { useGlobalState } from '../../__library'
import { Frame } from '@vixen-front/ui'

export default function Main() {
    const { getStateItem, setStateItem } = useGlobalState()

    return (
        <Frame direction="column" padding={20} gap={20}>
            <Frame height={{ ratio: 30 }} gap={20}>
                <p>Main Route from feature A!</p>
                <p>Hello Noha!</p>
                <p>{getStateItem('string')}</p>
                <button onClick={() => setStateItem('string', 'AAA !!!')}>
                    click me
                </button>
            </Frame>
            <Frame>
                <RouterLink route="test">
                    Click to get Test Route ...
                </RouterLink>
            </Frame>
        </Frame>
    )
}
