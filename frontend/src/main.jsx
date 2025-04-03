import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MyRoutes from './config/AppRoutes'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'
import { ChatProvider } from './context/ChatContext.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Toaster />
    <ChatProvider>
      <MyRoutes />
    </ChatProvider>
  </BrowserRouter>
)
