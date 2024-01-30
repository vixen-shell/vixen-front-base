import { Router, Features } from '../__library'

export const router = Router.create()

router.setRoutes({
    main: <router.Link route="test">Hello Extension C</router.Link>,
    test: <router.Link route="main">Hello Link !!</router.Link>,
})

export default Features.create({ router })
