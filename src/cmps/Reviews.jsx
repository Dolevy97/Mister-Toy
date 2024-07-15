import { useEffect, useState } from "react";
import { toyService } from "../services/toy.service.js";


export function Reviews({ user, toy }) {
    const [reviews, setReviews] = useState(null)

    // useEffect(() => {
        // loadReviews()
    // }, [])

    async function loadReviews() {
        const reviews = await toyService.getReviews()
        console.log(reviews)
    }

    async function onAddReview() {
        const newReview = await toyService.addToyReview(toy._id, user._id, 'test')
        console.log(newReview)
    }

    // console.log(toy)

    return (
        <section className="reviews-container">
            <h1>Reviews</h1>
            <button onClick={() => onAddReview()}>Test</button>
        </section>
    )
}