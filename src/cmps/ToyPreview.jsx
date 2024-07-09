export function ToyPreview({ toy }) {

    return (
        <article className="toy-preview">
            <h2>{toy.name}</h2>
            <p>${toy.price}</p>
        </article>
    )
}