import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DataTable from './components/DataTable'
import TShirtDesigner from './components/TshirtDesigner'

function App() {
  
  return (
    <div className='bg-[#f7f7f7]'>
     <DataTable/>
     <hr />
     <TShirtDesigner/>
    </div>
  )
}

export default App
