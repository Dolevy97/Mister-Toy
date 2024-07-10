
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"
import { MySelect } from "./MySelect.jsx"
import { MenuItem, Select, TextField } from "@mui/material"


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
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
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

    function onSetLabels(labels) {
        setFilterByToEdit(prevFilter => ({ ...prevFilter, labels }))
    }

    return (
        <section className="toy-filter">
            <h2>Toys Filter</h2>
            <form>

                <TextField
                name="name"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={filterByToEdit.txt}
                onChange={handleChange} />
                <MySelect labels={labels} onSetLabels={onSetLabels} />
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filterByToEdit.inStock || "All"}
                    onChange={handleChange}
                    name="inStock"
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="inStock">In stock</MenuItem>
                    <MenuItem value="notInStock">Not in stock</MenuItem>
                </Select>
            </form>

        </section>
    )
}