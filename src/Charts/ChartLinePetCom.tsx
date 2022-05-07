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
    const [chartPetrol, setChartPetrol] = useState<any[]>([]);

    const fetchSaving1 = async () => {
        try {
            const res = await axios.get('/chartPetrol');
            setChartPetrol(res.data);

          } catch (error) {
            console.log(error);
          }
    }
    useEffect(() =>  {
        fetchSaving1();
    }, []);

    
    const data: any =  {
        labels: chartPetrol.map((y) => y.name),
        datasets: [{
            label: 'Petrol',
            data: chartPetrol.map((y) => y.valexp),
            fill:true,
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