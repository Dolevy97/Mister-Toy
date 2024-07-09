import { storageService } from "./async-storage.service.js";
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

_createRandomToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getRandomToy,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            // add filter logic
            toys = _filter(toys, filterBy)
            return toys
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
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
        for (var i = 0; i < 5; i++) {
            toys.push(getRandomToy())
        }
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
}


function _filter(toys, filterBy) {
    if (filterBy.name) {
        const regExp = new RegExp(filterBy.name, 'i')
        toys = toys.filter(toy => regExp.test(toy.name))
    }
    if (filterBy.inStock === 'inStock') {
        toys = toys.filter(toy => toy.inStock)
    } else if (filterBy.inStock === 'notInStock') {
        toys = toys.filter(toy => !toy.inStock)
    }

    if (filterBy.labels.length) {
        toys = toys.filter(toy => toy.labels.some(label => filterBy.labels.includes(label)))
    }
    return toys
}