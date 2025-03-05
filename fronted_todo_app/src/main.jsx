import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, BrowserRouter as Router, Routes } from 'react-router'
import { ContextProviderTodo } from './context/ContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <ContextProviderTodo>
     <Router> 
      <Routes>
         <Route path='/' element = {<App/>} />
         <Route path='/:id' element = {<App/>} />

      </Routes>
    
    </Router>
  </ContextProviderTodo>,
)
