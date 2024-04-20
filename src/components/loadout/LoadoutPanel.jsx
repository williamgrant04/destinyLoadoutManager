import { useContext, useState } from "react"
import LoadoutButton from "./LoadoutButton"
import { styled } from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import APIContext from "../../store/bungieAPIContext"

const LoadoutPanel = () => {
  const [panelOpen, setPanelOpen] = useState(false)
  const api = useContext(APIContext)

  const pillClickHandler = (e) => {
    setPanelOpen(!panelOpen)

    api.getItems()

    if (panelOpen) {
      e.currentTarget.parentElement.style.left = "-20%"
    } else {
      e.currentTarget.parentElement.style.left = "0"
    }
  }


  return (
    <>
      <LoadoutBackdrop>
        <LoadoutPill onClick={ pillClickHandler }>
          <FontAwesomeIcon icon={ faBars }/>
        </LoadoutPill>
        <h2>LOADOUTS</h2>
        <ButtonGrid>
          { [...Array(28)].map((_, i) => <LoadoutButton key={ i } image={i}></LoadoutButton>) }
        </ButtonGrid>
      </LoadoutBackdrop>
    </>
  )
}

const LoadoutBackdrop = styled.div`
  left: -20%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: red;
  height: 100vh;
  width: 20%;
  transition: 0.2s;

  h2 {
    margin: 26px 0 0 0;
    font-family: 'Noto Sans';
    font-weight: 800;
    font-size: 1.75rem;
  }
`

const LoadoutPill = styled.button`
  background-color: orange;
  height: 50px;
  width: 50px;
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: -50px;
  top: 20px;
  border: none;
  border-radius: 0 50% 50% 0;

  .fa-bars {
    font-size: 22px;
  }
`

const ButtonGrid = styled.div`
  margin-top: 120px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
`

export default LoadoutPanel
