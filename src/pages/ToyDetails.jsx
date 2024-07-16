import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { toyService } from "../services/toy.service";
import { useSelector } from "react-redux";
import { Messages } from "../cmps/Messages";
import { Reviews } from "../cmps/Reviews";
import { ChatRoom } from "./ChatRoom";

export function ToyDetails() {
    const { toyId } = useParams()
    const [toy, setToy] = useState(null)
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    useEffect(() => {
        toyService.getById(toyId)
            .then(setToy)


    }, [])

    if (!toy) return <h2>Loading..</h2>


    return (
        <article className="toy-details-container">
            <button className="btn-back" onClick={() => navigate(-1)}>←</button>
            <h1>{toy.name}</h1>
            <h4>{toy.labels.join(', ')} </h4>
            <hr />
            <img className="toy-image" src={toy.img} title="Image" />
            <p>${toy.price}</p>
            <h3>{toy.inStock ? 'Currently in stock!' : 'Out of stock'}</h3>
            <Button size="large" variant="contained" className="btn btn-checkout">{toy.inStock ? 'Buy now!' : "Notify me when available"}</Button>
            <Messages user={user} toy={toy} setToy={setToy} />
            <Reviews user={user} toy={toy} />
            <ChatRoom toy={toy} />
        </article>
    )
}