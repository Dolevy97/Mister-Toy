import { BarChart } from "../cmps/BarChart";
import { PieChart } from "../cmps/PieChart";

export function Dashboard() {
    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            <article className="dashboard-container">
                <PieChart />
                <hr />
                <BarChart />
            </article>
        </section>
    )
}