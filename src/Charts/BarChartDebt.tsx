import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title} from  'chart.js'
import { Bar } from 'react-chartjs-2'
import axios from 'axios';

ChartJS.register(
    Tooltip, Legend, Title,
    CategoryScale,
    LinearScale,
    BarElement
)

const BarChartDebt = () => {
    const [chartDebts, setChartDebts] = useState<any[]>([]);

    const fetchSaving1 = async () => {
        try {
            const res = await axios.get('/chartStateDebt');
            setChartDebts(res.data.filter((u: { curDebt: number; }) => u.curDebt > 0));
            
            // const updatePercentage = () => {
            //     const newDebt = chartDebts.map((debt) => {
            //         return{
            //             ...debt,
            //             payment: (debt.payment * 100),
            //             currentdeb: (debt.currentdeb * 100),
            //         }
                    
            //     });
            //     setChartDebts(newDebt);
            // }
            
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
            label: 'Repayment',
            data: chartDebts.map((y) => y.payment),
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        },{
            label: 'Current Debt',
            data: chartDebts.map((y) => y.curDebt),
            backgroundColor: [
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 159, 64, 1)'
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
              display: false,
              text: 'Date'
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
              display: false,
              text: 'value'
            }
          }
        }
      }
    
        
    
    return (
           <Bar data={data} options={options}/>
    )    
}

export default BarChartDebt;