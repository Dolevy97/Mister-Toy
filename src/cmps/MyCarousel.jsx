// import { Carousel } from "react-responsive-carousel";

// export function MyCarousel() {
//     return (
//         <Carousel showThumbs={false} autoPlay interval={3000} infiniteLoop>
//             <div>
//                 <img src="../src/assets/imgs/image1.jpg" />
//                 <p className="legend">Legend 1</p>
//             </div>
//             <div>
//                 <img src="../src/assets/imgs/image2.jpg" />
//                 <p className="legend">Legend 2</p>
//             </div>
//             <div>
//                 <img src="../src/assets/imgs/image3.jpg" />
//                 <p className="legend">Legend 3</p>
//             </div>
//         </Carousel>
//     )
// }

// NewHeroCarousel.js

import React from 'react';
import { Carousel } from 'react-responsive-carousel';

export function MyCarousel() {
    return (
        <>
            <div className="carousel-container">
                <section className="carousel">
                    <section className="carousel-inner">
                        <article className="carousel-item">
                            <img src="../src/assets/imgs/image1.jpg" alt="Slide 1" />
                        </article>
                        <article className="carousel-item">
                            <img src="../src/assets/imgs/image2.jpg" alt="Slide 2" />
                        </article>
                        <article className="carousel-item">
                            <img src="../src/assets/imgs/image3.jpg" alt="Slide 3" />
                        </article>
                    </section>
                </section>
            </div>
        </>
    );
}
