"use client"
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'



const AppContext = createContext({
  inputEl: null,
})

export const AppWrapper = ({ children }) => {

  const inputEl = useRef(null);
  const bodyScroll = useRef(null);
  const [state, setState] = useState({
    inputEl: inputEl
  })

  const [stateScroll, setStateScroll] = useState({
    bodyScroll: bodyScroll
  })
  const [userName, setUserName] = useState("")
  const [disabled, setDisabled] = useState(false)
  const [listaPrecios, setListaPrecios] = useState([{
    plan: 'Basico',
    precio: "$0"
  }, {
    plan: 'Semi Intenso',
    precio: "$0"
  }, {
    plan: 'Super Intenso',
    precio: "$0"
  }])
  const [isOpenCapitulo, setIsOpenCapitulo] = useState(false)
  const [isOpenVersiculo, setIsOpenVersiculo] = useState(false)
  const [isOpenLibro, setIsOpenLibro] = useState(false)
  const [isOpenBiblia, setIsOpenBiblia] = useState(false);
  const [cambioHeader, setCambioHeader] = useState(false)
  const [ancho, setAncho] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAncho(window.innerWidth)
    }
  }, [])

  const obj = {
    inputEl: state,
    userName: userName,
    setUserName: setUserName,
    stateScroll,
    setStateScroll,
    disabled,
    setDisabled,
    isOpenCapitulo,
    setIsOpenCapitulo,
    isOpenVersiculo,
    setIsOpenVersiculo,
    isOpenBiblia,
    setIsOpenBiblia,
    isOpenLibro,
    setIsOpenLibro,
    listaPrecios,
    setListaPrecios,
    cambioHeader,
    setCambioHeader,
    ancho,
    setAncho
  }
  return (
    <AppContext.Provider value={obj}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}