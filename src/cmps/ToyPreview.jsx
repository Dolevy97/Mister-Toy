export function ToyPreview({ toy }) {

    return (
        <article className="toy-preview">
            <h2>{toy.name}</h2>
            <p>${toy.price}</p>
            <img src={toy.img} alt="toy image" />
            <p>{toy.inStock ? 'In stock' : 'Out of stock'}</p>
        </article>
    )
}