import { Feature } from '../../__library'
import { Frame } from '@vixen-front/ui'

export default function Main() {
    const { getStateItem, setStateItem, saveState } = Feature.Use.State()
    const { logHistory, latestLog } = Feature.Use.LogHistory()

    return (
        <Frame direction="column" padding={20} gap={20}>
            <Frame height={{ ratio: 100 }} gap={20}>
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

                <Frame
                    height={500}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    overflow={true}
                    padding={20}
                    reverse={true}
                >
                    {logHistory
                        .map((item, i) => (
                            <p key={i}>{`[${item.level}]: ${item.purpose}`}</p>
                        ))
                        .reverse()}
                </Frame>

                <p>{latestLog?.purpose}</p>

                <input
                    type="text"
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            const i = e.target as HTMLInputElement

                            Feature.log({
                                level: 'INFO',
                                purpose: i.value,
                            })
                        }
                    }}
                />
            </Frame>
            <Frame height={200}>
                <Feature.Link route="test">
                    Click to get Test Route ...
                </Feature.Link>
            </Frame>
        </Frame>
    )
}
