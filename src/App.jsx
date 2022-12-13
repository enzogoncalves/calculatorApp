import React, { useState, useEffect } from 'react'
import Grid from './components/Grid'
import Header from './components/Header'

let valuesSaved = {value: '', type: 'number'}
let decimals = 1;

function App() {
  const [currentValues, setCurrentValues] = useState([])
  const [firstPart, setFirstPart] = useState()
  const [secondPart, setSecondPart] = useState()
  const [operation, setOperation] = useState()

  function returnValues(obj) {
    if (obj.value == 'AC') {
      decimals = 1;
      valuesSaved = {value: '', type: 'number'}
      setSecondPart()
      setFirstPart()
      setCurrentValues([])
      setOperation()
      return
    }

    if (obj.value == '+/-' && firstPart) {
      if (firstPart && !operation) {
        setCurrentValues([{ value: 0 - firstPart, type: 'number' }])
        setFirstPart(0 - firstPart)
      } else if (secondPart) {
        calculate(false)
      }
      return
    }

    verifyObj(obj)
  }

  function verifyObj(obj) {
    if (obj.type == 'number') {
      if(obj.value == '.' && firstPart == undefined) {
        return;
      }
      if (!operation) {
        if (firstPart == undefined) {
          setFirstPart(obj.value)
        } else {
          if(obj.value == '.') {
            decimals *= 10;
            setCurrentValues(prevValues => [...prevValues, obj])
            return;
          } else if (decimals >= 10) {
            setFirstPart(Number((firstPart + (obj.value / (decimals))).toFixed(decimals.toString().length)))
            setCurrentValues(prevValues => [...prevValues, obj])        
            decimals *= 10
            return;
          }
          setFirstPart((firstPart * 10) + obj.value)
        }
      } else {
        if (!secondPart) {
          decimals = 1;
          setSecondPart(obj.value)
        } else {
          if(obj.value == '.') {
            decimals *= 10;
            setCurrentValues(prevValues => [...prevValues, obj])
            return;
          } else if (decimals >= 10) {
            setSecondPart(Number((secondPart + (obj.value / (decimals))).toFixed(decimals.toString().length)))
            setCurrentValues(prevValues => [...prevValues, obj])        
            decimals *= 10
            return;
          }
          setSecondPart((secondPart * 10) + obj.value)
        }
      }

      setCurrentValues(prevValues => [...prevValues, obj])        
    } else if (obj.type == 'operation' && firstPart != undefined) {
      if (operation && secondPart != undefined) {
        calculate(true)
        if(obj.value != '=') {
          valuesSaved = {value: obj.value, type: 'operation'}
          setCurrentValues(prevValues => [...prevValues, valuesSaved])
          setOperation(obj.value)
          return
        } else {
          return
        }
      } else if (obj.value == '=' && secondPart == undefined) {
        return
      } else if (operation && secondPart == undefined) {
        setOperation(obj.value)
        setCurrentValues(prevValues => [...prevValues.slice(0, prevValues.length - 1), obj])
        return;
      }
      
      setOperation(obj.value)
      setCurrentValues(prevValues => [...prevValues, obj])
    }
  }

  function calculate(positiveValue = true) {
    switch (operation) {
      case '+':
        if(positiveValue) {
          setCurrentValues([{ value: firstPart + secondPart, type: 'number' }])
          setFirstPart(firstPart + secondPart)
        } else {
          setCurrentValues([{ value: 0 - (firstPart + secondPart), type: 'number' }])
          setFirstPart(0 - (firstPart + secondPart))
        }
        break;

      case '-':
        if(positiveValue) {
          setCurrentValues([{ value: firstPart - secondPart, type: 'number' }])
          setFirstPart(firstPart - secondPart)
        } else {
          setCurrentValues([{ value: 0 - (firstPart - secondPart), type: 'number' }])
          setFirstPart(0 - (firstPart - secondPart))
        }
        break;

      case 'x':
        if(positiveValue) {
          setCurrentValues([{ value: firstPart * secondPart, type: 'number' }])
          setFirstPart(firstPart * secondPart)
        } else {
          setCurrentValues([{ value: 0 - (firstPart * secondPart), type: 'number' }])
          setFirstPart(0 - (firstPart * secondPart))
        }
        break;

      case '/':
        if(positiveValue) {
          setCurrentValues([{ value: firstPart / secondPart, type: 'number' }])
          setFirstPart(firstPart / secondPart)
        } else {
          setCurrentValues([{ value: 0 - (firstPart / secondPart), type: 'number' }])
          setFirstPart(0 - (firstPart / secondPart))
        }
        break;

      case '%':
        if(positiveValue) {
          setCurrentValues([{ value: firstPart % secondPart, type: 'number' }])
          setFirstPart(firstPart % secondPart)
        } else {
          setCurrentValues([{ value: 0 - (firstPart % secondPart), type: 'number' }])
          setFirstPart(0 - (firstPart % secondPart))
        }
        break;
    }
    setSecondPart()
    setOperation();
  }

  useEffect(() => {
  }, [currentValues])

  return (
    <>
      <Header currentValues={currentValues} />
      <Grid returnValues={returnValues} />
    </>
  )
}

export default App
