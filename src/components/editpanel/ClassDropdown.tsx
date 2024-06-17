import styled from "styled-components"
import { Character } from "../../destinyTypes/bungieInterfaces"
import { ClassType } from "../../destinyTypes/destinyEnums"
import { useContext, useEffect, useState } from "react"
import characterContext from "../../store/characterContext"

interface DropdownProps {
  $backgroundImage: string,
  $show: boolean,
  $index: number,
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, charId: string) => void
}

const ClassDropdown = (props: { characters: Array<Character>, username: string, open: boolean }): React.JSX.Element => {
  const chars = useContext(characterContext)
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(props.open)
  }, [props.open])

  const handleSelectCharacterClick = (charId: string) => {
    if (chars.activeCharacter.characterId === charId) { return }
    chars.setDropdownOpen(false)
    chars.changeActiveCharacter(charId)
  }

  return (
    <>
      {props.characters.map((char, i) => {
        return (
          <Dropdown onClick={() => { handleSelectCharacterClick(char.characterId) }} $backgroundImage={`https://bungie.net${char.emblemBackgroundPath}`} key={char.characterId} $show = {active} $index={i+1}>
            <ClassText>
              <h2>{props.username}</h2>
              <h3>{ClassType[char.classType]}</h3>
            </ClassText>
          </Dropdown>
        )
      })}
    </>
  )

}

const Dropdown = styled.div<DropdownProps>`
  position: absolute;
  top: ${props => props.$show ? (75 * props.$index)+ "px" : "0px"};
  transition: 0.3s;
  opacity: ${props => props.$show ? "1" : "0"};
  margin-top: 5px;
  height: 70px;
  width: 365px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: url(${props => props.$backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  z-index: -1;
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

export default ClassDropdown
