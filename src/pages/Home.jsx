import { MyCarousel } from "../cmps/MyCarousel";

export function Home() {
    return (
        <section className="home-container">
            <div className="background-image">
            </div>
            <h1>Welcome to Mister Toy</h1>
            <section className="hero">
                <MyCarousel />
            </section>
        </section>
    )
}