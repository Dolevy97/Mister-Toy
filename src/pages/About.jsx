import { Button } from "@mui/material";
import { GoogleMap } from "../cmps/GoogleMap";

export function About() {

    return (
        <section className="about">
            <h1>About us</h1>
            <p>At Mister Toy, we believe in the magic of play.</p>
            <p>Since 1997, we've been dedicated to bringing joy to children and families with our wide selection of quality toys.</p>
            <p>From classic favorites to the latest innovations, each item in our collection is chosen with care to inspire creativity, learning, and endless fun.</p>
            <p>Whether you're shopping for a special occasion or simply adding to your toy box, Mister Toy is your trusted destination for smiles and memorable playtime experiences. </p>
            <p>Discover the joy of playing with us today!</p>
            <div className="about-branches">
                <h1>Our Branches</h1>
                <p>We have branches all around the country, and we're steadily growing!</p>
            </div>
            <GoogleMap />
        </section>
    )
}