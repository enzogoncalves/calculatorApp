import React from 'react'
import * as C from './styles'
import GridItem from '../GridItem'

const Grid = ({ returnValues }) => {
  const gridItens = [
    { value: 'AC', type: 'operation' },
    { value: '+/-', type: 'operation' },
    { value: '%', type: 'operation' },
    { value: '/', type: 'operation' },
    { value: 7, type: 'number' },
    { value: 8, type: 'number' },
    { value: 9, type: 'number' },
    { value: 'x', type: 'operation' },
    { value: 4, type: 'number' },
    { value: 5, type: 'number' },
    { value: 6, type: 'number' },
    { value: '-', type: 'operation' },
    { value: 1, type: 'number' },
    { value: 2, type: 'number' },
    { value: 3, type: 'number' },
    { value: '+', type: 'operation' },
    { value: 0, type: 'number' },
    { value: '.', type: 'number' },
    { value: '=', type: 'operation' },
  ]

  return (
    <C.Grid>
      {gridItens.map((gridItem, index) => (
        <GridItem key={index} grow={gridItem.value == '0'} type={gridItem.type} value={gridItem.value} returnValues={returnValues}>{gridItem}</GridItem>
      ))}
    </C.Grid>
  )
}

export default Grid