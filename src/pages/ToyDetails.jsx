import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toyService } from "../services/toy.service";


export function ToyDetails() {
    const { toyId } = useParams()
    const [toy, setToy] = useState(null)

    useEffect(() => {
        toyService.getById(toyId)
            .then(setToy)
    }, [])

    if (!toy) return <h2>Loading..</h2>

    return (
        <article className="toy-details-container">
            <h1>{toy.name}</h1>
            <h4>{toy.labels.join(', ')} </h4>
            <hr />
            <img className="toy-image" src="https://images.unsplash.com/photo-1581557991964-125469da3b8a?q=80&w=1433&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="Image" />
            <p>${toy.price}</p>
            <h3>{toy.inStock ? 'Currently in stock!' : 'Out of stock'}</h3>
            <button className="btn btn-checkout">{toy.inStock ? 'Buy now!' : "Notify me when available"}</button>
        </article>
    )
}