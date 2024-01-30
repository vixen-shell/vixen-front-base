// Hypr
// import { Hypr } from '../events'

const preventDefault = (event: Event) => {
    event.preventDefault()
}

const initFeature: React.EffectCallback = () => {
    document.addEventListener('contextmenu', preventDefault)
    // Hypr.startEventsListening()

    return destroyFeature
}

const destroyFeature = () => {
    document.removeEventListener('contextmenu', preventDefault)
    // Hypr.stopEventsListening()
}

export default initFeature
