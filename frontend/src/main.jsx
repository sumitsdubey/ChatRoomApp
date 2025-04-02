import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MyRoutes from './config/AppRoutes'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MyRoutes />
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
)
