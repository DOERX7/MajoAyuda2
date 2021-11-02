import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app'
import { initializeApp } from 'firebase/app';
import { getDatabase,ref, set,onValue,get ,onChildChanged } from "firebase/database";


import {
  Card,
  CardActions,
  CardContent,
  Button, 
  Grid,
  IconButton
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
 

function App() {
  const [datosActuales, setDatosActuales] = React.useState("X1: 0, Y1: 0; X2:0, Y2: 0");

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
  const app = firebase.initializeApp(firebaseConfig)

  const db = getDatabase(app);


  const [x1, setX1] = React.useState(0);
  const [y1, setY1] = React.useState(0);
  const [x2, setX2] = React.useState(0);
  const [y2, setY2] = React.useState(0);
  const [alarma, setAlarma] = React.useState(false);
  const dataRef = ref(db, 'data/');

  const changeVal = (nameVar,val) => {
    var tmpX1=x1;
    var tmpY1=y1;
    var tmpX2=x2;
    var tmpY2=y2;
    if(nameVar=="X1"){
      tmpX1 = tmpX1 + val;
      setX1(tmpX1);
    }else if(nameVar=="X2"){
      tmpX2 = tmpX2 + val;
      setX2(tmpX2);
    }else if(nameVar=="Y1"){
      tmpY1 = tmpY1 + val;
      setY1(tmpY1)
    }else{
      tmpY2 = tmpY2 + val;
      setY2(tmpY2)
    }
    set(ref(db,'data/'),{
      "X1":tmpX1,
      "X2":tmpX2,
      "Y1":tmpY1,
      "Y2":tmpY2,
      "alarma":alarma
    })
    
    setDatosActuales("X1: "+tmpX1+", Y1: "+tmpY1+"; X2: "+tmpX2+", Y2: "+tmpY2)
  }
  // const updateLocalData = () =>{
  //   get(dataRef, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log(data)
  //     setX1(data.X1)
  //     setY1(data.Y1)
  //     setY2(data.Y2)
  //     setDatosActuales("X1: "+x1+", Y1: "+y1+"; X2:0, Y2: "+y2)
  //   });
  // }
  return (
    <div className="App">
      <header className="App-header">
        <Card style={{maxHeight:'900px',maxWidth:'450px',padding:'10px'}}>
          <CardContent>
            <h2>Configuraciones</h2>
            <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"

            >
              <Grid
              item
              xs={12}
              >
                <Grid
                container
                justifyContent="center"
                alignItems="center"
                    
                >
                  </Grid>
                Valores actuales
                <br/>
                {datosActuales}
              </Grid>
              <Grid
              item
              xs={12}
              >
                Sensor 1
              </Grid>
              <Grid
              item
              xs={2}
              >
                <h4>X1</h4>
              </Grid>
              <Grid
              item
              xs={2}
              >
                <IconButton
                style={{margin:'20px'}} 
                variant="contained"
                color="primary"
                onClick={()=>{changeVal('X1',-1)}}
                >
                  <ExposureNeg1Icon fontSize="large"  />
                </IconButton>
              </Grid>
              <Grid
              item
              xs={2}
              >
                <IconButton
                style={{margin:'20px'}} 
                variant="contained"
                color="primary"
                onClick={()=>{changeVal('X1',1)}}
                >
                  <ExposurePlus1Icon fontSize="large"  />
                </IconButton>
              </Grid>
              <Grid
              item
              xs={2}
              >
                <h4>Y1</h4>
              </Grid>
              <Grid
              item
              xs={2}
              >
                <IconButton
                style={{margin:'20px'}} 
                variant="contained"
                color="primary"
                onClick={()=>{changeVal('Y1',-1)}}

                >
                  <ExposureNeg1Icon fontSize="large"  />
                </IconButton>
              </Grid>
              <Grid
              item
              xs={2}
              >
                <IconButton
                style={{margin:'20px'}} 
                variant="contained"
                color="primary"
                onClick={()=>{changeVal('Y1',1)}}

                >
                  <ExposurePlus1Icon fontSize="large"  />
                </IconButton>
              </Grid>
              <Grid
              item
              xs={12}
              >
                Sensor 2
              </Grid>
              <Grid
              item
              xs={2}
              
              >
                <h4>X2</h4>
              </Grid>
              <Grid
              item
              xs={2}
              >
                <IconButton
                style={{margin:'20px'}} 
                variant="contained"
                color="primary"
                onClick={()=>{changeVal('X2',-1)}}

                >
                  <ExposureNeg1Icon fontSize="large"  />
                </IconButton>
              </Grid>
              <Grid
              item
              xs={2}
              >
                <IconButton
                style={{margin:'20px'}} 
                variant="contained"
                color="primary"
                onClick={()=>{changeVal('X2',1)}}

                >
                  <ExposurePlus1Icon fontSize="large"  />
                </IconButton>
              </Grid>
              <Grid
              item
              xs={2}
              
              >
                <h4>Y2</h4>
              </Grid>
              <Grid
              item
              xs={2}
              >
                <IconButton
                style={{margin:'20px'}} 
                variant="contained"
                color="primary"
                onClick={()=>{changeVal('Y2',-1)}}

                >
                  <ExposureNeg1Icon fontSize="large"  />
                </IconButton>
              </Grid>
              <Grid
              item
              xs={2}
              >
                <IconButton
                style={{margin:'20px'}} 
                color="primary"
                onClick={()=>{changeVal('Y2',1)}}
                >
                  <ExposurePlus1Icon fontSize="large"  />
                </IconButton>
              </Grid>
              <Grid
              item
              xs={12}
              >
                <Button
                fullWidth
                variant="contained"
                onClick={()=>{
                  set(ref(db,'data/'),{
                    "X1":x1,
                    "X2":x2,
                    "Y1":y1,
                    "Y2":y2,
                    "alarma":!alarma
                  })
                  setAlarma(!alarma)
                }}
                >ALARMA: {alarma?"ON":"OFF"}</Button>

                <Button
                fullWidth
                variant="contained"
                style={{marginTop:'10px'}}
                onClick={()=>{
                  set(ref(db,'data/'),{
                    "X1":0,
                    "X2":0,
                    "Y1":0,
                    "Y2":0,
                    "alarma":false
                  })
                  setAlarma(false)
                }}
                >Reiniciar valores</Button>

              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </header>
    </div>
  );
}

export default App;
