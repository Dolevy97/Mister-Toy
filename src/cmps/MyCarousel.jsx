import { Carousel } from "react-responsive-carousel";

export function MyCarousel() {
    return (
        <Carousel showThumbs={false} autoPlay interval={3000} infiniteLoop>
            <div>
                <img src="path/to/your/image1.jpg" alt="Toy 1" />
                <div className="legend">
                    <h2>Discover the Latest Toys!</h2>
                    <p>Find the perfect toy for every child.</p>
                    <button className="cta-button">Shop Now</button>
                </div>
            </div>
            <div>
                <img src="path/to/your/image2.jpg" alt="Toy 2" />
                <div className="legend">
                    <h2>New Arrivals</h2>
                    <p>Check out the newest additions to our collection.</p>
                    <button className="cta-button">Explore</button>
                </div>
            </div>
            <div>
                <img src="path/to/your/image3.jpg" alt="Toy 3" />
                <div className="legend">
                    <h2>Exclusive Deals</h2>
                    <p>Save big on top toys with our exclusive offers.</p>
                    <button className="cta-button">Get Deals</button>
                </div>
            </div>
        </Carousel>
    )
}