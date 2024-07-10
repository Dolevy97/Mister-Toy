import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js'

import { Bar } from 'react-chartjs-2'
import { Pie } from 'react-chartjs-2';
import { toyService } from '../services/toy.service'

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export function MyDashboard() {
    const [labels, setLabels] = useState(null)
    const [values, setValues] = useState(null)

    useEffect(() => {
        toyService.getInventoryStats()
            .then(stats => {
                setLabels(stats.labels)
                setValues(stats.values)
            })
    }, [labels])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Inventory by Labels',
            },
        },
    }

    const data = {
        labels,
        datasets: [
            {
                label: 'Inventory by Labels',
                data: values,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    const pieData = {
        labels,
        datasets: [
            {
                label: '# of toys',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(180, 150, 255, 0.2)',
                    'rgba(255, 125, 100, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(180, 150, 255, 1)',
                    'rgba(255, 125, 100, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    if (!labels || !values) return <h3>Loading..</h3>
    return (
        <>
            <Bar options={options} data={data} style={{ width: '60vw', height: '40vh' }} />
            <hr />
            <Pie data={pieData} />
        </>
    )
}
