import { httpService } from "./http.service.js";
import { utilService } from './util.service.js'

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getRandomToy,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getFilterFromSearchParams,
    getSortFromSearchParams
}

function query(filterBy = {}, sortBy = {}) {
    const filterAndSort = { ...filterBy, ...sortBy }
    return httpService.get(BASE_URL, filterAndSort)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function getDefaultFilter() {
    return { name: '', inStock: '', labels: [] }
}

function getRandomToy() {
    return {
        _id: utilService.makeId(),
        name: _getRandomName(),
        price: _getRandomPrice(),
        labels: _getRandomLabels(),
        createdAt: Date.now(),
        inStock: true,
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: true,
    }
}

function getDefaultSort() {
    return { field: 'name', dir: 1 }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        if (field === 'pageIdx') {
            filterBy[field] = parseInt(searchParams.get(field))
            if (isNaN(filterBy[field])) filterBy[field] = undefined
        } else {
            filterBy[field] = searchParams.get(field) || ''
        }
    }
    return filterBy
}

function getSortFromSearchParams(searchParams) {
    const defaultSort = getDefaultSort()
    const sortBy = {}
    for (const field in defaultSort) {
        sortBy[field] = searchParams.get(field) || ''
    }
    return sortBy
}


function _getRandomName() {
    const names = ['Teddy Bear', 'Action Figure', 'Doll', 'Lego Set', 'Puzzle', 'Race Car', 'Drone', 'Board Game']
    return names[Math.floor(Math.random() * names.length)]
}

function _getRandomPrice(min = 10, max = 100) {
    return (Math.random() * (max - min) + min).toFixed(2)
}

function _getRandomLabels() {
    const allLabels = ['Educational', 'Outdoor', 'Indoor', 'Electronic', 'DIY', 'Creative', 'Sports', 'Collectible']
    const numLabels = Math.floor(Math.random() * allLabels.length) + 1
    const labels = []
    while (labels.length < numLabels) {
        const label = allLabels[Math.floor(Math.random() * allLabels.length)]
        if (!labels.includes(label)) {
            labels.push(label)
        }
    }
    return labels
}

function _createRandomToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        for (var i = 0; i < 10; i++) {
            toys.push(getRandomToy())
        }
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
    console.log(JSON.stringify(toys))
}