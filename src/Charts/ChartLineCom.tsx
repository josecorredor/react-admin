import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Title, Filler} from  'chart.js'
import { Line } from 'react-chartjs-2'
import axios from 'axios';

ChartJS.register(
    Tooltip, Legend, Title, Filler,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
)

const ChartLinePetCom = () => {
    const [chartFood, setChartFood] = useState<any[]>([]);

    const fetchSaving1 = async () => {
        try {
            const res1 = await axios.get('/chartFood');
            setChartFood(res1.data);

          } catch (error) {
            console.log(error);
          }
    }
    useEffect(() =>  {
        fetchSaving1();
    }, []);

    
    const data: any =  {
        labels: chartFood.map((y) => y.name),
        datasets: [{
            label: 'Food',
            data: chartFood.map((y) => y.valexp),
            fill:true,
            backgroundColor: [
                'rgba(155, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(155, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    }
    const options: any = {
        scales: {
          x: {
            beginAtZero: true,
            stacked: false,
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
            stacked: false,
            display: true,
            title: {
              display: false,
              text: 'value'
            }
          }
        }
      }
    
        
    
    return (
           <Line data={data} options={options}/>
    )    
}

export default ChartLinePetCom;