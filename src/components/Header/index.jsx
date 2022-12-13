import React from 'react'
import * as C from './styles'



const Header = ({ currentValues }) => {
  return (
    <C.Header>
      {currentValues.map((element, index) => (
        <C.Result key={index}>{element.value}</C.Result>
      ))}
    </C.Header>
  )
}

export default Header