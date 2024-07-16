import { httpService } from './http.service'
// import { storageService } from './async-storage.service'
// import { userService } from './user.service'


export const reviewService = {
  add,
  query,
  remove
}

async function query(filterBy = {}) {
  try {
    const res = await httpService.get(`review`, filterBy)
    return res
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error
  }
}

async function add({ txt, toyId }) {
  try {
    const addedReview = await httpService.post(`review`, { txt, toyId })
    return addedReview
  } catch (error) {
    console.error('Error adding review:', error)
    throw error
  }
}

async function remove(reviewId) {
  try {
    await httpService.delete(`review/${reviewId}`)
  } catch (error) {
    console.error('Error removing message:', error)
    throw error
  }
}