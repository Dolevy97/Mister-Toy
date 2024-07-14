import { Button } from "@mui/material";
import { ToyPreview } from "./ToyPreview.jsx";
import { useSelector } from "react-redux";

export function ToyList({ toys, onMoveToToy, onRemoveToy, onEditToy }) {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    console.log(toys)
    return (
        <section className="toys-list">
            {toys.map(toy =>
                <article className="toy-container" key={toy._id} onClick={() => onMoveToToy(toy._id)}>
                    <ToyPreview toy={toy} />

                    <div className="btns-container">
                        {user && user.isAdmin && <Button size="small" variant="text" color="inherit" onClick={(ev) => onRemoveToy(ev, toy._id)} className="btn btn-remove">X</Button>}
                        {user && user.isAdmin && <Button size="small" variant="text" color="inherit" onClick={(ev) => onEditToy(ev, toy._id)} className="btn btn-edit">Edit</Button>}
                        <Button size="small" variant="text" color="inherit" className="btn btn-buy" disabled={!toy.inStock}>Buy</Button>
                    </div>
                </article>)}
        </section>
    )
}