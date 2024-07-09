import { useEffect, useState } from "react"

export function ToySort({ sortBy, onSetSort }) {

    const [sortDirection, setSortDirection] = useState(1)
    const [sortByToEdit, setSortByToEdit] = useState({ field: 'name', dir: 1 })


    useEffect(() => {
        // Notify parent
        onSetSort(sortByToEdit)
    }, [sortByToEdit])

    function onSortBy(value) {
        setSortByToEdit(({ field: value, dir: sortDirection }))
        setSortDirection(sortDirection === 1 ? -1 : 1)
    }
    
    return (
        <section className="toy-sort">
            <h2 className="sort-header">Toy Sort</h2>
            <button onClick={() => onSortBy('name')} className="btn sort-btn">Name</button>
            <button onClick={() => onSortBy('price')} className="btn sort-btn">Price</button>
            <button onClick={() => onSortBy('createdAt')} className="btn sort-btn">Created at</button>
        </section>
    )
}