import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { store } from './store/store.js'
import { Home } from './pages/Home.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { About } from './pages/About.jsx'
import { Login } from './pages/Login.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { ReviewExplore } from './pages/ReviewExplore.jsx'

import "../src/assets/style/main.scss"


export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />
          <main className="main-layout">
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<Login />} path="/login" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId?" />
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<About />} path="/about" />
              <Route element={<UserDetails />} path="/user/:userId" />
              <Route element={<ReviewExplore />} path="/reviews" />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
      <UserMsg />
    </Provider>
  )
}

