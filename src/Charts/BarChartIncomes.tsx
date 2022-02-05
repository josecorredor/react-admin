import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from  'chart.js'
import { Bar } from 'react-chartjs-2'
import axios from 'axios';

ChartJS.register(
    Tooltip, Legend, Title,
    CategoryScale,
    LinearScale,
    BarElement
)

const BarChartIncomes = () => {
    const [chart, setChart] = useState<any[]>([]);
    const [chartR, setChartR] = useState<any[]>([]);

    const fetchSaving = async () => {
        try {
            const res = await axios.get('/chartIncomesJ');
            setChart(res.data);

            const resp = await axios.get('/chartSIncomesP');
            setChartR(resp.data);
          } catch (error) {
            console.log(error);
          }
    }
    useEffect(() =>  {fetchSaving();}, []);

    
    var data = {
        labels: chart.map((x) => x.name),
        datasets: [{
            label: 'Incomes Jose',
            data: chart.map((x) => x.valexp),
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        },{
            label: 'Incomes Paola',
            data: chartR.map((x) => x.valexp),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    }
    var options: {
        plugins: {
            title: {
              display: true,
              text: 'Chart.js Bar Chart - Stacked'
            },
          },
        responsive: true,
        indexAxis: 'y',
        maintainApect: true,
        scales: {
            xAxes: {
                beginAtZero: true,
                stacked: true
            },
            yAxes: {
                beginAtZero: true,
                stacked: true
            }
            
        },
        legend:{
            labels: {
                fontSize: 26
            }
        }
    }
    
        
    
    return (
           <Bar data={data} options={options!} height={150}/>
    )    
}

export default BarChartIncomes;