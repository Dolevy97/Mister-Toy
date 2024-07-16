import { useEffect, useState } from "react";
import { addReview, loadReviews, removeReview } from "../store/actions/review.actions.js";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";


export function Reviews({ user, toy }) {

    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    useEffect(() => {
        loadReviews({byToyId: toy._id})
    }, [])


    async function onAddReview(ev) {
        ev.preventDefault()
        const reviewTxt = ev.target.elements.reviewtxt.value
        ev.target.elements.reviewtxt.value = ''
        try {
            await addReview({ txt: reviewTxt, toyId: toy._id })
            showSuccessMsg('Review added successfully')

        } catch (error) {
            console.log('Error adding review:', error)
            showErrorMsg('Error adding review')
        }
    }

    async function onDeleteReview(reviewId) {
        try {
            await removeReview(reviewId)
            showSuccessMsg('Review removed successfully')
        } catch (error) {
            showErrorMsg('Error removing review')
        }
    }

    return (
        <section className="reviews-container">
            <h1>Reviews</h1>
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