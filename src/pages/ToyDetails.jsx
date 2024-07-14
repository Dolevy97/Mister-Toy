import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy.service";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

export function ToyDetails() {
    const { toyId } = useParams()
    const [toy, setToy] = useState(null)
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    useEffect(() => {
        toyService.getById(toyId)
            .then(setToy)
    }, [toy])

    async function onAddMsg(ev) {
        ev.preventDefault()
        const msgTxt = ev.target.elements.msgtxt.value
        try {
            await toyService.addToyMsg(toyId, msgTxt)
            ev.target.elements.msgtxt.value = ''
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async function onDeleteMsg(msgId) {
        try {
            await toyService.removeToyMsg(toyId, msgId)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    if (!toy) return <h2>Loading..</h2>

    return (
        <article className="toy-details-container">
            <button className="btn-back" onClick={() => navigate(-1)}>←</button>
            <h1>{toy.name}</h1>
            <h4>{toy.labels.join(', ')} </h4>
            <hr />
            <img className="toy-image" src="https://images.unsplash.com/photo-1581557991964-125469da3b8a?q=80&w=1433&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="Image" />
            <p>${toy.price}</p>
            <h3>{toy.inStock ? 'Currently in stock!' : 'Out of stock'}</h3>
            <Button size="large" variant="contained" className="btn btn-checkout">{toy.inStock ? 'Buy now!' : "Notify me when available"}</Button>

            <section className="messages">
                <h2>Toy Messages</h2>
                {/* <hr /> */}

                {!toy.msgs.length && 'No messages yet, be the first!'}
                {user && <form onSubmit={() => onAddMsg(event)}>
                    <textarea name="msgtxt" placeholder="Enter your message"></textarea>
                    <button>Add</button>
                </form>}
                {toy.msgs.map(msg =>
                    <article className="toy-message" key={msg.id}>
                        <h5>{msg.by.fullname}:</h5>
                        <h4>{msg.txt}</h4>
                        <hr />
                        {user.isAdmin && <button onClick={() => onDeleteMsg(msg.id)} title="delete message" className="btn-delete">X</button>}
                    </article>
                )}
            </section>
        </article>
    )
}