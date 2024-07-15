import { useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { useEffectUpdate } from "../customHooks/useEffectUpdate"

export function ReviewFilters({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type, selectedOptions } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { byUsername } = setFilterByToEdit

    return (
        <section className="filter-review-container">
            <h2>Filter Reviews</h2>
            <input value={byUsername} type="text" onChange={handleChange} placeholder="By username" name="byUsername" />
        </section>
    )
}