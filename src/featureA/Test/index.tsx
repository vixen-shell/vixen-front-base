import { Feature } from '../../__library'
import { Frame } from '@vixen-front/ui'

export default function Main() {
    return (
        <Frame>
            <p>Test Route from feature A!</p>
            <p>Hello Noha!</p>
            <Feature.Link route="main">
                Click to return to the Main Route ...
            </Feature.Link>
        </Frame>
    )
}
