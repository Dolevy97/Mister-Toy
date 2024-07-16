import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../store/actions/user.actions'


export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const navigate = useNavigate()

    async function onLogout() {
        try {
            await logout()
            navigate('/')
        } catch (error) {
            console.log('error logging out:', error)
            throw error
        }
    }
    
    return (
        <header className="header-container">
            <section className="header-left">
                <h1>Mister Toy</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    {user && user.isAdmin && <NavLink to="/reviews" >Reviews</NavLink>}
                </nav>
            </section>

            <section className="header-right">
                {user ?
                    <>
                        <h4 onClick={() => { navigate(`user/${user._id}`) }}>Hey {user.fullname}</h4>
                        <button onClick={() => onLogout()}>Logout</button>
                    </>
                    :
                    <NavLink to="/login" >Log in</NavLink>
                }

            </section>
        </header>
    )
}