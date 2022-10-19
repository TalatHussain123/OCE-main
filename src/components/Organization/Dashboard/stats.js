import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab,Tabs,TabContent} from 'react-bootstrap';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' 
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
      scales: {
        y: {
            grid: {
                display: false
              },
          ticks: {
            display: false,
          }
        }
      }
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [3,4,4,4,4],
        backgroundColor: '#6930C3',
        borderRadius: 15,
        borderColor: '#fff',
      },

    ],
  };
function stats() {
    
  return (
    <div className='barStats' style={{ width:'700px',height:'auto'}}>
      <div className='statsHead'>
        <h3>Stats</h3>
        <select>
          <option>Last 30 Days</option>
          <option>Last 30 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>
      <div className='statTab'>
      <Tabs fill defaultActiveKey="home" id="uncontrolled-tab-example">
        <Tab
          eventKey="home"
          title="Condidates"
        >
          <TabContent tabTitle="Home">
          <Bar options={options} data={data} />
          </TabContent>
        </Tab>
        <Tab
          eventKey="profile"
          title="Tests"
        >
          <TabContent tabTitle="Profile">
          <Bar options={options} data={data} />
          </TabContent>
        </Tab>
      </Tabs>
      </div>
    </div>
  )
}

export default stats