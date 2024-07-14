import { useEffect, useState } from "react"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { MyForm } from "../cmps/MyForm.jsx"

export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToyToEdit(toy)
        } catch (err) {
            console.log('Had issues in toy edit', err)
            navigate('/toy')
        }
    }

    function handleChange({ target }) {
        let { value, type, name: field, checked } = target
        value = type === 'number' ? +value : value
        value = type === 'checkbox' ? checked : value
        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    async function onSaveToy() {
        // ev.preventDefault()
        if (!Array.isArray(toyToEdit.labels)) {
            let splitLabels = toyToEdit.labels.split(',')
            splitLabels = splitLabels.map(label => label.trim())
            toyToEdit.labels = splitLabels
        }
        try {
            await saveToy(toyToEdit)
            showSuccessMsg('Toy Saved!')
            navigate('/toy')
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Had issues in toy details')
        }
    }

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>
            <MyForm onSaveToy={onSaveToy} toyToEdit={toyToEdit} handleChange={handleChange} />
        </section>
    )
}