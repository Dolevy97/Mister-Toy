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

    if (!toy) <h2>Loading..</h2>
    console.log(toy)
    return (
        <h2>Toy Details</h2>
    )
}