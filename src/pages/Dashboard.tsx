import React, { useEffect } from 'react';
import Wrapper from '../components/Wrapper';
import * as c3 from 'c3'; 
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from  'chart.js'
import { Bar } from 'react-chartjs-2'
import BarChart from '../Charts/BarChart';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const Dashboard = () => {

    var data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
    var options: {
        maintainAspectRadio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        legend: {
            fontSize: 26
        }
    }

    useEffect(() => {
        (
            async () => {

            
                const chart = c3.generate({
                    bindto: '#chart',
                    data: {
                        x: 'x',
                        columns: [
                            ['x'],
                            ['Sales'],
                        ],
                        types: {
                            Sales: 'bar'
                        }
                    },
                    axis: {
                        x: {
                            type: 'timeseries',
                            tick:{
                                format: '%Y-%m-%d'
                            }
                        }
                    }
                });
                const {data} = await axios.get('chart');

                chart.load({
                    columns: [
                        ['x', ...data.map((r: any) => r.date)], 
                        ['Sales', ...data.map((r: any) => r.sum)]
                    ]
                })
            }
        )()
    },[]);
        
    
    return (
        <Wrapper>
           <h2>Daily sales</h2>

           {/* <div id="chart"></div> */}
           <BarChart />

        </Wrapper>
    )   
}

export default Dashboard;