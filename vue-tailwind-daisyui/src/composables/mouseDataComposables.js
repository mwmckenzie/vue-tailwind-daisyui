import { ref } from 'vue'
import { useEventListener } from './eventComposables.js'
import {eventTypes} from "@/js/constants.js";


export function useMouse() {
    const x = ref(0)
    const y = ref(0)

    useEventListener(window, eventTypes.MOUSE_MOVE, (event) => {
        x.value = event.pageX
        y.value = event.pageY
    })

    return { x, y }
}