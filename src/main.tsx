import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ProductProvider from './context/Product.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ProductProvider>
    <App/>
  </ProductProvider>
)
