import { useEffect, useState } from "react"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { Link, useNavigate, useParams } from "react-router-dom"

export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(setToyToEdit)
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field, checked } = target
        value = type === 'number' ? +value : value
        value = type === 'checkbox' ? checked : value
        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if (!Array.isArray(toyToEdit.labels)) {
            let splitLabels = toyToEdit.labels.split(',')
            splitLabels = splitLabels.map(label => label.trim())
            toyToEdit.labels = splitLabels
        }
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Had issues in toy details')
            })
    }

    // console.log(toyToEdit)

    const { name, price, labels, inStock } = toyToEdit

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSaveToy} className="edit-form">
                <label htmlFor="name">Name:</label>
                <input required name="name" onChange={handleChange} type="text" id="name" value={name} placeholder="Enter a name" />

                <label htmlFor="price">Price:</label>
                <input required name="price" onChange={handleChange} type="number" id="price" value={price} placeholder="Enter a price" />

                <label htmlFor="labels">Labels:</label>
                <input name="labels" onChange={handleChange} type="text" id="labels" value={labels} placeholder="Labels (separated by commas)" />

                <label htmlFor="inStock">In stock?</label>
                <input name="inStock" onChange={handleChange} type="checkbox" id="inStock" checked={inStock} />

                <div className="edit-btns">
                    <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )
}