import { useState } from 'react'
import './App.css'
import Switch from './components/Switch'
import LabelList from './components/LabelList';

import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';

function App() {
  return (
    <> 
    <div className="container">   
      <LabelList /> 
    </div>    
    </>
  )
}

export default App
