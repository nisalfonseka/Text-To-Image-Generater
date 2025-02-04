import { useState } from 'react'
import Imagegen from './Components/Imagegen'
import Home from './Components/Home'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Imagegen/>
      
    </div>
    
  )
}

export default App
