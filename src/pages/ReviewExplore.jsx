import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { reviewService } from "../services/review.service"
import { loadUsers } from "../store/actions/user.actions"

import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_REMOVED } from '../services/socket.service'
import { getActionAddReview, getActionRemoveReview, loadReviews, removeReview } from "../store/actions/review.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function ReviewExplore() {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const users = useSelector(storeState => storeState.userModule.users)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    const [filterBy, setFilterBy] = useState({ aboutToyId: '', byUserId: '' })
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        loadReviews(filterBy)
    }, [filterBy])

    useEffect(() => {
        loadUsers()

        socketService.on(SOCKET_EVENT_REVIEW_ADDED, review => {
            console.log('GOT from socket', review)
            dispatch(getActionAddReview(review))
        })

        socketService.on(SOCKET_EVENT_REVIEW_REMOVED, reviewId => {
            console.log('GOT from socket', reviewId)
            dispatch(getActionRemoveReview(reviewId))
        })

        return () => {
            socketService.off(SOCKET_EVENT_REVIEW_ADDED)
            socketService.off(SOCKET_EVENT_REVIEW_REMOVED)
        }
    }, [])

    function handleChange(ev) {
        const { name, value } = ev.target
        setFilterBy((prevFilter) => ({ ...prevFilter, [name]: value }))
    }

    async function onDeleteReview(reviewId) {
        try {
            await removeReview(reviewId)
            showSuccessMsg('Review removed')
        } catch (error) {
            showErrorMsg('Cannot remove')
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
                            name='byUserId'>
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