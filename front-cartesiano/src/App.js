import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Scatter } from 'react-chartjs-2';
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import { getAnalytics } from "firebase/analytics";
import { getDatabase,ref, set,onValue,get ,onChildChanged } from "firebase/database";

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
  
  const dataRef = ref(db, 'data/');
  const updateLocalData = () =>{
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      setX1(data.X1)
      setY1(data.Y1)
      setY2(data.Y2)
      setAlarma(data.alarma)
      if(data.alarma){
        setBackColor('red')
      }else{
        setBackColor('white')
      }
    });
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
      <h1 className='title'>Scatter Chart</h1>
      <Scatter data={data} options={options} />
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
