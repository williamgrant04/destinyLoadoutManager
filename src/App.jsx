import { useState } from 'react'
import LoginModal from './components/bungieAuth/LoginModal'
import styled from 'styled-components'
import LoadoutPanel from './components/loadout/LoadoutPanel'

const App = () => {

  // useEffect(() => {
  //   console.log(window.location.href)
  // }, [])

  return (
    <>
      <LoginModal/>
      <LoadoutPanel/>
    </>
  )
}

export default App
