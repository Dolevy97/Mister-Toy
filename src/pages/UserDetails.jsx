import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy.service";

export function UserDetails() {
    const { userId } = useParams()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const [reviews, setReviews] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadReviews()
    }, [])

    async function loadReviews() {
        const reviews = await toyService.getReviews({ byUserId: user._id })
        setReviews(reviews)
    }

    return (
        <section className="user-details">
            <h2>Welcome to {userId === user._id ? 'your profile page' : `${user.fullname}'s profile page`}</h2>
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