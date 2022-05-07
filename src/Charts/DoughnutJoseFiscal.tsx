import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from  'chart.js'
import { Doughnut } from 'react-chartjs-2'
import axios from 'axios';

ChartJS.register(
    Tooltip, Legend, Title,
    ArcElement
)

const DoughnutChart = () => {
    const [chartDebts, setChartDebts] = useState<any[]>([]);

    const fetchSaving1 = async () => {
        try {
            const res = await axios.get('/chartFiscalJ');
            setChartDebts(res.data);
            
          } catch (error) {
            console.log(error);
          }
    }
    useEffect(() =>  {
        fetchSaving1();
    }, []);

    
    const data =  {
        labels: chartDebts.map((y) => y.detail),
        datasets: [{
            label: 'Fiscal year (Jose)',
            data: chartDebts.map((y) => y.valor),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(155, 206, 86, 0.2)',
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(155, 206, 86, 1)',
          ],
            borderWidth: 1
        }]
    }
    const options: any = {
        scales: {
          x: {
            beginAtZero: true,
            stacked: true,
            display: true,
            title: {
              display: true,
              text: '.'
            },
            ticks: {
              major: {
                enabled: true
              },
              
            }
          },
          y: {
            beginAtZero: true,
            stacked: true,
            display: true,
            title: {
              display: true,
              text: '.'
            }
          }
        }
      }
    
        
    
    return (
           <Doughnut data={data} options={options} height={60}/>
    )    
}

export default DoughnutChart;