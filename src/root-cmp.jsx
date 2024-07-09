import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { store } from './store/store.js'

export function App() {

  return (
    <Provider store={store}>
      <h1>Testing</h1>
    </Provider>
  )
}

