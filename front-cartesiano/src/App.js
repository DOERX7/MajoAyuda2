import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Scatter } from 'react-chartjs-2';
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import { getAnalytics } from "firebase/analytics";
import { getDatabase,ref, set,onValue,get ,onChildChanged } from "firebase/database";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyBBfKm1uRfDZdgYYRM1eIAkCB_Gfu7Llkg",
    authDomain: "majosensorbluetooth.firebaseapp.com",
    databaseURL: "https://majosensorbluetooth-default-rtdb.firebaseio.com",
    projectId: "majosensorbluetooth",
    storageBucket: "majosensorbluetooth.appspot.com",
    messagingSenderId: "486079356399",
    appId: "1:486079356399:web:eba540e96ea9b23d2a2a1a",
    measurementId: "G-9P87TCXZJB"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase(app);
  
  const [x1, setX1] = React.useState(0);
  const [y1, setY1] = React.useState(0);
  const [y2, setY2] = React.useState(0);
  const [alarma,setAlarma] = React.useState(false);
  const [backColor,setBackColor] = React.useState('white');
  const [rows,setRows] = React.useState([]);
  
  const dataRef = ref(db, 'data/');
  const updateLocalData = () =>{
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      setX1(data.X1)
      setY1(data.Y1)
      setY2(data.Y2)
      var r = rows
      r.push(createData(data.X1,data.Y1,data.Y2,data.alarma))
      setRows(r)
      console.log(r)
      setAlarma(data.alarma)
      if(data.alarma){
        setBackColor('red')
      }else{
        setBackColor('white')
      }
    });
  }
  function createData(x1, y1, y2, alarma) {
    return { x1, y1, y2, alarma};
  }
  
  
  useEffect(()=>{
    updateLocalData()
  })
  const data = {
    datasets: [
      {
        label: 'Sensor 1',
        data: [
          { x: x1, y: y1 },
        ],
        backgroundColor: '#d32f2f',
        pointRadius: 15,
        fill: false,
        pointHoverRadius: 20
      },
      {
        label: 'Sensor 2',
        data: [
          { x: 0, y: y2 },
        ],
        backgroundColor: '#1565c0',
        pointRadius: 15,
        fill: false,
        pointHoverRadius: 20
      },
    ],
  };
  

  return (
    <div className="App" style={{backgroundColor:backColor,marginLeft:'130px',marginRight:'130px',alignContent:"center"}}>
      <div className='header'>
      <h1 className='title'>Gráfica de sensores</h1>
      <Scatter data={data} options={options} />
      <br/>
      <div style={{height:'500px', maxHeight:'500px',overflow:'auto'}}>
      <h1 className='title'>Historial de valores</h1>

      <Table stickyHeader  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">X1</TableCell>
            <TableCell align="right">Y1</TableCell>
            <TableCell align="right">Y2</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{height:'500px', maxHeight:'500px'}}>
          {rows.map((row,index) => {
            console.log(row)
            return(

            <TableRow key={index}>
              <TableCell align="right">{row.x1}</TableCell>
              <TableCell align="right">{row.y1}</TableCell>
              <TableCell align="right">{row.y2}</TableCell>
            </TableRow>
            )
          })}
        </TableBody>
      </Table>
      </div>
    </div>

    </div>
  );
}

const options = {
  scales: {
    responsive: false,

    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          reverse: false,
          stepSize: 3
        },
      },
    ],
  },
};



export default App;
