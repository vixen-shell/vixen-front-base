import { RouterLink } from '../../__library'
import { Frame } from '@vixen-front/ui'

export default function Main() {
    return (
        <Frame>
            <p>Test Route from feature A!</p>
            <p>Hello Noha!</p>
            <RouterLink route="main">
                Click to return to the Main Route ...
            </RouterLink>
        </Frame>
    )
}
