import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//  import "./main.css"
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import ChatProvider from '../Context/ChatProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
<BrowserRouter>
<ChatProvider>
<App />
</ChatProvider>
</BrowserRouter>
</ChakraProvider>,
);