import { MyDashboard } from "../cmps/MyDashboard";

export function Dashboard() {
    return (
        <section className="dashboard">
            <h2>Dashboard</h2>
            <article className="dashboard-container">
                <MyDashboard />
            </article>
        </section>
    )
}