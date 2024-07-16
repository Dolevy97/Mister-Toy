import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy.service";
import { userService } from "../services/user.service";
import { reviewService } from "../services/review.service";

export function UserDetails() {
    const { userId } = useParams()
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const [user, setUser] = useState(null)
    const [reviews, setReviews] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadReviewsAndUser()
    }, [])

    async function loadReviewsAndUser() {
        const user = await userService.getById(userId)
        setUser(user)
        const reviews = await reviewService.query({ byUserId: user._id })
        setReviews(reviews)
    }

    if (!user) return <h3>Loading..</h3>
    return (
        <section className="user-details">
            {user && <h2>Welcome to {userId === loggedInUser._id ? 'your profile page' : `${user.fullname}'s profile page`}</h2>}
            <h3>Reviews</h3>
            {reviews && reviews.length ?
                reviews.map(review =>
                    <article className="user-details-review-container" key={review._id} >
                        <h4><span>Toy name:</span> {review.toy.name}</h4>
                        <h4><span>Review text:</span> {review.txt}</h4>
                        <button onClick={() => navigate(`/toy/${review.toy._id}`)}>Toy Details</button>
                        <hr />
                    </article>
                ) :
                'No reviews to show'}
        </section>
    )
}