import { toyService } from "../services/toy.service.js";
import { useNavigate, useParams } from "react-router-dom";


export function Messages({ toy, user, setToy }) {

    const { toyId } = useParams()

    async function onAddMsg(ev) {
        ev.preventDefault()
        const msgTxt = ev.target.elements.msgtxt.value
        try {
            const savedMsg = await toyService.addToyMsg(toyId, msgTxt)
            setToy(prevToy => ({
                ...prevToy,
                msgs: [...(prevToy.msgs || []), savedMsg],
            }))
            ev.target.elements.msgtxt.value = ''
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async function onDeleteMsg(msgId) {
        try {
            const removedMsgId = await toyService.removeToyMsg(toyId, msgId)
            setToy((prevToy) => ({
                ...prevToy,
                msgs: prevToy.msgs.filter((msg) => removedMsgId !== msg.id),
              }))
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    console.log(toy)

    return (
        <section className="messages">
            <h2>Toy Messages</h2>
            {!toy.msgs.length && 'No messages yet, be the first!'}
            {user ? <form onSubmit={() => onAddMsg(event)}>
                <textarea name="msgtxt" placeholder="Enter your message"></textarea>
                <button>Add</button>
            </form> : <h3>Log in to add a message!</h3>}
            {toy.msgs.map(msg =>
                <article className="toy-message" key={msg.id}>
                    <h5>{msg.by.fullname}:</h5>
                    <h4>{msg.txt}</h4>
                    <hr />
                    {user && user.isAdmin && <button onClick={() => onDeleteMsg(msg.id)} title="delete message" className="btn-delete">X</button>}
                </article>
            )}
        </section>
    )
}