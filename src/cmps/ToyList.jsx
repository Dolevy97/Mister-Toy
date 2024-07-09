import { ToyPreview } from "./ToyPreview.jsx";

export function ToyList({ toys, onMoveToToy, onRemoveToy, onEditToy }) {
    return (
        <section className="toys-list">
            {toys.map(toy =>
                <article className="toy-container" key={toy._id} onClick={() => onMoveToToy(toy._id)}>
                    <ToyPreview toy={toy} />

                    <div className="btns-container">
                        <button onClick={(ev) => onRemoveToy(ev, toy._id)} className="btn btn-remove">X</button>
                        <button onClick={(ev) => onEditToy(ev, toy._id)} className="btn btn-edit">Edit</button>
                        <button className="btn btn-buy">Buy</button>
                    </div>
                </article>)}
        </section>
    )
}