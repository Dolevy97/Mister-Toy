import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { reviewService } from "../services/review.service"
import { loadUsers } from "../store/actions/user.actions"

export function ReviewExplore() {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const users = useSelector(storeState => storeState.userModule.users)

    const [reviews, setReviews] = useState(null)
    const [filterBy, setFilterBy] = useState({ aboutToyId: '', byUserId: '' })
    const navigate = useNavigate()

    useEffect(() => {
        loadReviews()
    }, [filterBy])

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadReviews() {
        const reviews = await reviewService.query(filterBy)
        setReviews(reviews)
    }

    function handleChange(ev) {
        const { name, value } = ev.target
        setFilterBy((prevFilter) => ({ ...prevFilter, [name]: value }))
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
            <section className="filter-review-container">
                <h2>Filter reviews</h2>
                {users && loggedInUser && (
                    <form >
                        <select
                            onChange={handleChange}
                            value={filterBy.byUserId}
                            name='byUserId'
                        >
                            <option value=''>Select User</option>
                            {users.map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.fullname}
                                </option>
                            ))}
                        </select>
                    </form>
                )}
            </section>
            <section className="explore-reviews-container">
                {reviews && reviews.length ? reviews.map(review =>
                    <article className="explore-review-container" key={review._id}>
                        <h3 className="written-by-user" onClick={() => navigate(`/user/${review.user._id}`)}>Written by: {review.user.fullname}</h3>
                        <p>Toy name: {review.toy.name}</p>
                        <p>Review text: {review.txt}</p>
                        <button className="btn-go-to-toy" onClick={() => navigate(`/toy/${review.toy._id}`)}>Go to toy</button>
                        {loggedInUser && loggedInUser.isAdmin && <button onClick={() => onDeleteReview(review._id)} title="delete message" className="btn-delete">Delete Review</button>}
                    </article>
                ) : 'No reviews to show'}
            </section>
        </section>
    )
}