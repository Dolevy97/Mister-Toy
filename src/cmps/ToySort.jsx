import { Button, ButtonGroup } from "@mui/material"
import { useEffect, useState } from "react"
import { createTheme } from '@mui/material/styles';

export function ToySort({ sortBy, onSetSort }) {

    const [sortDirection, setSortDirection] = useState(1)
    const [sortByToEdit, setSortByToEdit] = useState({ field: 'name', dir: 1 })

    const fields = [
        { field: 'name', label: 'Name' },
        { field: 'price', label: 'Price' },
        { field: 'createdAt', label: 'Created at' }
    ]

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
            <ButtonGroup color="inherit" variant="outlined" aria-label="Basic button group" className="sort-btn-group">
                {fields.map(item =>
                    <Button
                        key={item.field}
                        className={sortByToEdit.field === item.field ? 'active' : ''}
                        onClick={() => onSortBy(item.field)}>
                        {item.label}
                    </Button>
                )}
            </ButtonGroup>
        </section>
    )
}