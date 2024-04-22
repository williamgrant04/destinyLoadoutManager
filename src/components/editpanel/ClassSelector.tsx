import { useEffect, useState } from "react"
import styled from "styled-components"
import { initDB, readProfile } from "../../store/indexedDBHandler"
import { User, Character } from "../../destinyTypes/bungieInterfaces"
import { ClassType } from "../../destinyTypes/destinyEnums"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons"
import ClassDropdown from "./ClassDropdown"

interface EmblemProps {
  $backgroundImage: string,
  $active: boolean
}

const ClassSelector = (): React.JSX.Element => {
  const [displayName, setDisplayName] = useState("")
  const [emblemUrl, setEmblemUrl] = useState("")
  const [activeCharacter, setActiveCharacter] = useState(["", Object as unknown as Character])
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("primaryID") !== null) {
      const user = JSON.parse(localStorage.getItem("primaryID")!) as User
      setDisplayName(user.name)
    }

    initDB().then(success => {
      if (success) {
        readProfile("user-profile").then((profile) => {
          // Get first character
          const character = Object.entries(profile.characters.data)[0]
          if (localStorage.getItem("activeCharacter") !== null) {
            setActiveCharacter(JSON.parse(localStorage.getItem("activeCharacter")!))
          } else {
            // First index on character is the character ID
            localStorage.setItem("activeCharacter", JSON.stringify(character))
            setActiveCharacter([character[0], character[1] as Character])
          }
          const largeEmblemPath = (activeCharacter[1] as Character).emblemBackgroundPath
          if (largeEmblemPath !== undefined) { setEmblemUrl(`https://www.bungie.net${largeEmblemPath}`) }
        })
      }
    })
  }, [activeCharacter])

  useEffect(() => {
    console.log("dropdown: ", dropdownOpen)
  }, [dropdownOpen])

  return (
    <>
      <Emblem $backgroundImage={emblemUrl} $active={dropdownOpen} onClick={()=> {setDropdownOpen(!dropdownOpen)}}>
        <ClassText>
          <h2>{displayName}</h2>
          <h3>{ClassType[(activeCharacter[1] as Character).classType]}</h3>
        </ClassText>
        <FontAwesomeIcon icon={faAngleDown}/>
      </Emblem>
      { dropdownOpen && <ClassDropdown characters={[""]}/> }
    </>
  )
}

const Emblem = styled.div<EmblemProps>`
  position: absolute;
  right: 10px;
  top: 10px;
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
