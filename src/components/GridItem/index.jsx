import React from 'react'
import * as C from './styles'

const GridItem = ( { type, value, grow , returnValues}) => {
  
  return (
    <C.GridItem grow={grow} onClick={() => {returnValues({type: type, value: value})}}>{value}</C.GridItem>
  )
}

export default GridItem