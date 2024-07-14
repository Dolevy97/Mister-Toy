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

import { Bar, Pie } from 'react-chartjs-2';
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

export function BarChart() {
    const [labels, setLabels] = useState(null)
    const [values, setValues] = useState(null)

    useEffect(() => {
        toyService.getPriceStats()
            .then(stats => {
                setLabels(stats.labels)
                setValues(stats.values)
            })
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Prices per Label',
            },
        },
    }

    const data = {
        labels,
        datasets: [
            {
                label: 'Prices per Label',
                data: values,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }

    // if (!labels || !values) return <h3>Loading..</h3>
    return <Bar options={options} data={data} />;
}
