import { RouterLink } from '../../__library'
import { useGlobalState } from '../../__library'
import { Frame } from '@vixen-front/ui'

export default function Main() {
    const { getStateItem, setStateItem, saveState } = useGlobalState()

    return (
        <Frame direction="column" padding={20} gap={20}>
            <Frame height={{ ratio: 30 }} gap={20}>
                <p>Main Route from feature A!</p>
                <p>Hello Noha!</p>
                <p>{getStateItem('string')}</p>
                <button
                    onClick={() => {
                        if (getStateItem('string') === 'OOO !!!') {
                            setStateItem('string', 'AAA !!!')
                        } else {
                            setStateItem('string', 'OOO !!!')
                        }
                    }}
                >
                    click me
                </button>
                <button onClick={() => saveState()}>Save State</button>
            </Frame>
            <Frame>
                <RouterLink route="test">
                    Click to get Test Route ...
                </RouterLink>
            </Frame>
        </Frame>
    )
}
