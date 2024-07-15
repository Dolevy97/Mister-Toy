import { useEffect, useState } from "react";
import { toyService } from "../services/toy.service.js";


export function Reviews({ user, toy }) {
    const [reviews, setReviews] = useState(null)

    useEffect(() => {
        loadReviews()
    }, [])

    async function loadReviews() {
        const reviews = await toyService.getReviews({ byToyId: toy._id })
        setReviews(reviews)
    }

    async function onAddReview(ev) {
        ev.preventDefault()
        const reviewTxt = ev.target.elements.reviewtxt.value
        ev.target.elements.reviewtxt.value = ''
        try {
            await toyService.addToyReview(toy._id, user._id, reviewTxt)
            loadReviews()
        } catch (error) {
            console.log('Error adding review:', error)
            throw error
        }
    }

    async function onDeleteReview(reviewId) {
        try {
            await toyService.removeToyReview(reviewId)
            loadReviews()
        } catch (error) {
            console.log('Error removing review:', error)
            throw error
        }
    }

    return (
        <section className="reviews-container">
            <h1>Reviews</h1>
            <button onClick={() => onAddReview()}>Test</button>

            {user ? <form onSubmit={() => onAddReview(event)}>
                <textarea name="reviewtxt" placeholder="Enter your review" required></textarea>
                <button>Add</button>
            </form> : <h3>Log in to add a review!</h3>}

            {reviews && reviews.map(review =>
                <article className="toy-review" key={review._id}>
                    <h5>{review.user.fullname} wrote:</h5>
                    <h4>{review.txt}</h4>
                    <hr />
                    {user && user.isAdmin && <button onClick={() => onDeleteReview(review._id)} title="delete message" className="btn-delete">X</button>}
                </article>
            )}
        </section>
    )
}