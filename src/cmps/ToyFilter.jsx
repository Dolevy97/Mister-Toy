
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"


export function ToyFilter({ toys, filterBy, onSetFilter }) {
    const [labels, setLabels] = useState()

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        getLabels()
    }, [])

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type, selectedOptions } = target
        value = type === 'number' ? +value : value
        if (field === 'labels') {
            const options = Array.from(selectedOptions).map(option => option.value)
            setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: options }))
        } else {
            setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
        }
    }

    function getLabels() {
        const labelSet = new Set()
        toys.forEach(toy => {
            toy.labels.forEach(label => {
                labelSet.add(label)
            })
        })
        setLabels(Array.from(labelSet))
    }

    return (
        <section className="toy-filter">
            <h2>Toys Filter</h2>
            <form>
                <label htmlFor="name">Name: </label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />
                <label htmlFor="stock">By stock: </label>
                <select onChange={handleChange} name="inStock" id="stock">
                    <option value="all">All</option>
                    <option value="inStock">In stock</option>
                    <option value="notInStock">Not in stock</option>
                </select>

                <label htmlFor="labels">By labels:(Hold ctrl and click)</label>
                <select onChange={handleChange} name="labels" id="labels" multiple>
                    {labels && labels.map(label =>
                        <option value={label} key={label}>{label}</option>
                    )}
                </select>
            </form>

        </section>
    )
}