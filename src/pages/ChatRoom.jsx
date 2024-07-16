import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'
import { saveToy } from '../store/actions/toy.actions'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'


export function ChatRoom({ toy }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState(toy.chatHistory || [])
    const [topic, setTopic] = useState(null)

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        setTopic(toy._id)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])

    useEffect(() => {
        if (topic) socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [topic])

    useEffectUpdate(() => {
        const toyToSave = toy
        toyToSave.chatHistory = msgs
        saveToy(toyToSave)
    }, [msgs])


    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname || 'Me'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    if (!topic) return <h3>Loading..</h3>

    return (
        <section className="chat-room-container">
            <h3>Chat about {toy.name}</h3>
            <section className="chat-container">
                <ul>
                    {msgs.map((msg, idx) => (<li key={idx}>{msg.from === loggedInUser.fullname? 'Me' : msg.from}: {msg.txt}</li>))}
                </ul>
            </section>

            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" />
                <button>Send</button>
            </form>

        </section>
    )
}