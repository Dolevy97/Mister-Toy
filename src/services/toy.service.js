import { httpService } from "./http.service.js";
import { utilService } from './util.service.js'

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    remove,
    save,
    addToyMsg,
    removeToyMsg,
    getRandomToy,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getFilterFromSearchParams,
    getSortFromSearchParams,
    getInventoryStats,
    getPriceStats
}

async function query(filterBy = {}, sortBy = {}) {
    const filterAndSort = { ...filterBy, ...sortBy }
    try {
        const res = await httpService.get(BASE_URL, filterAndSort)
        return res
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error
    }
}

async function getById(toyId) {
    try {
        const res = await httpService.get(BASE_URL + toyId)
        return res
    } catch (err) {
        console.error('Error fetching toy by ID:', err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const res = await httpService.delete(BASE_URL + toyId)
        return res
    } catch (err) {
        console.error('Error fetching toy by ID:', err)
        throw err
    }
}

async function save(toy) {
    try {
        if (toy._id) {
            await httpService.put(`${BASE_URL}${toy._id}`, toy)
            return toy
        } else {
            await httpService.post(BASE_URL, toy)
            return toy
        }
    } catch (error) {
        console.error('Error saving toy:', error)
        throw error
    }
}

async function addToyMsg(toyId, txt) {
    try {
        const savedMsg = await httpService.post(`${BASE_URL}${toyId}/msg`, { txt })
        return savedMsg
    } catch (error) {
        console.error('Error saving message:', error)
        throw error
    }
}

async function removeToyMsg(toyId, msgId) {
    try {
        const res = await httpService.delete(`${BASE_URL}${toyId}/msg/${msgId}`)
        return res
    } catch (error) {
        console.error('Error removing message:', error)
        throw error
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

async function getInventoryStats() {
    try {
        const toys = await httpService.get(BASE_URL)
        const toyCountByInventoryMap = _getToyCountByInventoryMap(toys)
        const labels = Object.keys(toyCountByInventoryMap)
        const values = Object.values(toyCountByInventoryMap)
        return { labels, values }
    } catch (err) {
        console.error('Error getting inventory stats:', err)
        throw err
    }
}

function _getToyCountByInventoryMap(toys) {
    const toyCountByImportanceMap = toys.reduce((map, toy) => {
        if (toy.inStock) {
            toy.labels.forEach(label => {
                map[label] = (map[label] || 0) + 1
            })
        }
        return map
    }, {})
    return toyCountByImportanceMap
}

async function getPriceStats() {
    try {
        const toys = await httpService.get(BASE_URL)
        const toyCountByPriceMap = _getToyCountByPriceMap(toys)
        const labels = Object.keys(toyCountByPriceMap)
        const values = Object.values(toyCountByPriceMap)
        return { labels, values }
    } catch (err) {
        console.error('Error getting price stats:', err)
        throw err
    }
}

function _getToyCountByPriceMap(toys) {
    const toyCountByPriceMap = toys.reduce((map, toy) => {
        toy.labels.forEach(label => {
            if (!map[label]) map[label] = 0
            map[label] += +toy.price
        })
        return map
    }, {})
    return toyCountByPriceMap
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