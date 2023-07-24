import React from "react";
import { useReducer } from "react"

import { produce } from "immer"
import { productReducer } from "../reducers/Product";

export const ProductContext = React.createContext({} as any)


const initialState = {
  products: [],
  isLoading: false,
  error: ""
}



const ProductProvider = (props: any) => {
  const [state, dispatch] = useReducer(produce(productReducer), initialState)
  
  return <ProductContext.Provider value={{ state, dispatch }}>
    {props.children}
  </ProductContext.Provider>
}

export default ProductProvider
