import { NavLink } from 'react-router-dom'


export function AppHeader() {
    return (
        <header className="header-container">
            <h1>Mister Toy</h1>

            <nav className="app-nav">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/toy" >Toys</NavLink>
                <NavLink to="/dashboard" >Dashboard</NavLink>
                <NavLink to="/about" >About</NavLink>
            </nav>
        </header>
    )
}