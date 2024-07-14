import { showSuccessMsg } from "../../services/event-bus.service"
import { toyService } from "../../services/toy.service"
import { ADD_TOY, REMOVE_TOY, SET_FILTER_BY, SET_IS_LOADING, SET_SORT_BY, SET_TOYS, TOY_UNDO, UPDATE_TOY } from "../reducers/toy.reducer.js"
import { store } from "../store.js"



export async function loadToys() {
    
    const { filterBy, sortBy } = store.getState().toyModule
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    try {
        const toys = await toyService.query(filterBy, sortBy)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (error) {
        console.log('toy action -> Cannot load toys', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeToy(toyId) {
    try {
        store.dispatch({ type: REMOVE_TOY, toyId })
        await toyService.remove(toyId)
        showSuccessMsg('Removed toy successfully!')
    } catch (err) {
        store.dispatch({ type: TOY_UNDO })
        console.log('toy action -> Cannot remove toy', err)
        throw err
    }
}

export async function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    try {
        const savedToy = await toyService.save(toy)
        store.dispatch({ type, toy: savedToy })
        console.log(savedToy)
        return savedToy
    } catch (err) {
        console.log('toy action -> Cannot save toy', err)
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setSortBy(sortBy) {
    store.dispatch({ type: SET_SORT_BY, sortBy })
}