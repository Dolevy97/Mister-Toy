import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { ReviewFilters } from "../cmps/ReviewFilters"

export function ReviewExplore() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const [reviews, setReviews] = useState(null)
    const [filterBy, setFilterBy] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        loadReviews()
    }, [filterBy])

    async function loadReviews() {
        const reviews = await toyService.getReviews(filterBy)
        setReviews(reviews)
    }

    function onSetFilter(filter) {
        setFilterBy(filter)
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
        <section className="review-explore">
            <h2>Explore reviews</h2>
            <ReviewFilters onSetFilter={onSetFilter} filterBy={filterBy} />
            <section className="explore-reviews-container">
                {reviews && reviews.length && reviews.map(review =>
                    <article className="explore-review-container" key={review._id}>
                        <h3>Written by: {review.user.fullname}</h3>
                        <button className="btn-user-profile" onClick={() => navigate(`/user/${review.user._id}`)}>{review.user.fullname}'s Profile</button>
                        <p>Toy name: {review.toy.name}</p>
                        <p>Review text: {review.txt}</p>
                        <button className="btn-go-to-toy" onClick={() => navigate(`/toy/${review.toy._id}`)}>Go to toy</button>
                        {user && user.isAdmin && <button onClick={() => onDeleteReview(review._id)} title="delete message" className="btn-delete">Delete Review</button>}
                    </article>
                )}
            </section>
        </section>
    )
}