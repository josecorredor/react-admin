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

const ChartLine = () => {
    const [chartKind, setChartKind] = useState<any[]>([]);
    const [chartKind1, setChartKind1] = useState<any[]>([]);

    const fetchSaving1 = async () => {
        try {
            const res = await axios.get('/chartKindExp');
            setChartKind(res.data);
            const res1 = await axios.get('/chartKindExp1');
            setChartKind1(res1.data);

          } catch (error) {
            console.log(error);
          }
    }
    useEffect(() =>  {
        fetchSaving1();
    }, []);

    
    const data: any =  {
        labels: chartKind.map((y) => y.name),
        datasets: [{
            label: 'Incomes',
            data: chartKind.map((y) => y.valexp),
            fill:true,
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        },{
          label: 'Outcomes',
          data: chartKind1.map((j) => j.valexp),
          fill:false,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
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
           <Line data={data} options={options} height={90}/>
    )    
}

export default ChartLine;