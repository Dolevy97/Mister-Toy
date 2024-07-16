import { useEffect, useState } from "react";
import { toyService } from "../services/toy.service.js";
import { reviewService } from "../services/review.service.js";
import { addReview, loadReviews, removeReview } from "../store/actions/review.actions.js";
import { useSelector } from "react-redux";


export function Reviews({ user, toy }) {

    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    useEffect(() => {
        loadReviews()
    }, [])


    async function onAddReview(ev) {
        ev.preventDefault()
        const reviewTxt = ev.target.elements.reviewtxt.value
        ev.target.elements.reviewtxt.value = ''
        try {
            await addReview({ txt: reviewTxt, toyId: toy._id })
        } catch (error) {
            console.log('Error adding review:', error)
            throw error
        }
    }

    async function onDeleteReview(reviewId) {
        try {
            await removeReview(reviewId)
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