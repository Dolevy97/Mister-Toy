import { toyService } from "../services/toy.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { loadToys, removeToy, saveToy } from "../store/actions/toy.actions.js";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToyList } from "../cmps/ToyList.jsx";
import { useNavigate } from "react-router-dom";

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    const navigate = useNavigate()

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
                console.log('Cannot load toys! err:', err)
            })
    }, [filterBy])

    function onAddRandomToy() {
        const toyToSave = toyService.getRandomToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onAddToy() {
        navigate('/toy/edit')
    }

    function onMoveToToy(toyId) {
        navigate(`/toy/${toyId}`)
    }

    function onRemoveToy(ev, toyId) {
        ev.stopPropagation()
        removeToy(toyId)
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onEditToy(ev, toyId) {
        ev.stopPropagation()
        navigate(`/toy/edit/${toyId}`)

    }

    console.log(toys)

    if (!toys.length) return <h2>Loading toys..</h2>

    return (
        <section className="toy-index">
            <button onClick={onAddRandomToy} className="btn btn-add">Add Random Toy</button>
            <button onClick={onAddToy} className="btn btn-add">Add Toy</button>
            <ToyList toys={toys} onMoveToToy={onMoveToToy} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />
        </section>
    )
}