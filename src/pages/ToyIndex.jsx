import { toyService } from "../services/toy.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { loadToys, saveToy } from "../store/actions/toy.actions.js";

import { useEffect } from "react";
import { useSelector } from "react-redux";

export function ToyIndex() {

    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
                console.log('Cannot load toys! err:', err)
            })
    }, [filterBy])

    function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                console.log('show-user-msg');
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })

    }

    return (
        <button onClick={onAddToy} className="btn btn-add">Add Random Toy</button>
    )
}