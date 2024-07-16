import { useEffect, useRef, useState } from "react"
import { eventBusService, showSuccessMsg } from "../services/event-bus.service.js"
import { SOCKET_EVENT_REVIEW_ABOUT_YOU, socketService } from "../services/socket.service.js"

export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            setMsg(msg)
            if (timeoutIdRef.current) {
                timeoutIdRef.current = null
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(closeMsg, 3000)
        })

        socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, review => {
            showSuccessMsg(`New review about me: ${review.txt}`)
        })

        return () => {
            unsubscribe()
            socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
        }
    }, [])

    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return <span></span>
    return (
        <section className={`user-msg ${msg.type}`}>
            <button onClick={closeMsg}>x</button>
            {msg.txt}
        </section>
    )
}
