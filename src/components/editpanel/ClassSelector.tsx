import { useContext, useEffect, useState, useLayoutEffect } from "react"
import styled from "styled-components"
import { User } from "../../destinyTypes/bungieInterfaces"
import { ClassType } from "../../destinyTypes/destinyEnums"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import ClassDropdown from "./ClassDropdown"
import characterContext from "../../store/characterContext"

interface ActiveProps {
  $backgroundImage: string,
  $active: boolean
}

const ClassSelector = (): React.JSX.Element => {
  const chars = useContext(characterContext)
  const [displayName, setDisplayName] = useState("")
  const [emblemUrl, setEmblemUrl] = useState("")

  useLayoutEffect(() => {
    console.log(chars.characters)
    if (localStorage.getItem("primaryID") !== null) {
      const user = JSON.parse(localStorage.getItem("primaryID")!) as User
      setDisplayName(user.name)
    }

    const largeEmblemPath = chars.activeCharacter?.emblemBackgroundPath
    if (largeEmblemPath !== undefined) { setEmblemUrl(`https://www.bungie.net${largeEmblemPath}`) }
  }, [chars, chars.activeCharacter])

  useEffect(() => {
    chars.initChar()
  }, [chars.characterDropdownOpen])

  return (
    <Wrapper>
      <Active $backgroundImage={emblemUrl} $active={chars.characterDropdownOpen} onClick={() => {chars.setDropdownOpen(!chars.characterDropdownOpen)}}>
        <ClassText>
          <h2>{displayName}</h2>
          <h3>{ClassType[chars.activeCharacter?.classType]}</h3>
        </ClassText>
        <FontAwesomeIcon icon={faAngleDown}/>
      </Active>
      <ClassDropdown characters={chars.characters} username={displayName} open={chars.characterDropdownOpen}/>
    </Wrapper>
  )
}

const Active = styled.div<ActiveProps>`
  height: 75px;
  width: 370px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: url(${props => props.$backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  color: white;

  .fa-angle-down {
    font-size: 30px;
    margin-right: 10px;
    cursor: pointer;
    transition: 0.3s;
    transform: rotate(${props => props.$active ? "0deg" : "90deg"});
  }
`

const Wrapper = styled.div`
  z-index: 100;
  position: absolute;
  right: 15px;
  top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ClassText = styled.div`
  margin: 0 0 0 75px;
  & > h2, h3 {
    margin: 0;
    font-weight: normal;
  }

  & > h3 {
    font-style: italic;
    font-weight: light;
    height: 33px;
  }
`

export default ClassSelector
