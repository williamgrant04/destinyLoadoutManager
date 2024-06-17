import { createContext, useState } from "react"
import { initDB, readProfile } from "./indexedDBHandler"
import { Character } from "../destinyTypes/bungieInterfaces"

const characterContext = createContext({
  activeCharacter: {} as unknown as Character,
  changeActiveCharacter: (_charID: string) => {},
  characters: [] as Array<Character>,
  characterDropdownOpen: false,
  setDropdownOpen: (_open: boolean) => {},
  initChar: () => {}
})

// TODO: Save active character to local storage so it persists between sessions which might eliminate the need for this context

export const CharacterContextProvider = ({ children }: { children: React.JSX.Element }) => {
  const [activeCharacter, setActiveCharacter] = useState(Object as unknown as Character)
  const [characters, setCharacters] = useState([] as Array<Character>)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const openDropdown = (open: boolean) => {
    setDropdownOpen(open)
  }

  const initChar = () => {
    initDB().then(success => {
      if (!success) { return }

      readProfile("user-profile").then((profile) => {
        // Get first character
        const character = Object.values(profile.characters.data)[0]

        if (localStorage.getItem("activeCharacter") !== null) {
          const storedChar = JSON.parse(localStorage.getItem("activeCharacter")!) as Character

          if (activeCharacter.characterId === storedChar.characterId) { return }
          setActiveCharacter(storedChar)

          const { [storedChar.characterId]: _, ...others } = profile.characters.data
          setCharacters(Object.values(others))

        } else {

          localStorage.setItem("activeCharacter", JSON.stringify(character))
          setActiveCharacter(character)
          const { [character.characterId]: _, ...others } = profile.characters.data
          setCharacters(Object.values(others))
        }
      })
    })
  }

  const changeActiveCharacter = (charID: string) => {
    initDB().then((success) => {
      if (!success) { return }

      readProfile("user-profile").then((profile) => {
        setActiveCharacter(profile.characters.data[charID])
        localStorage.setItem("activeCharacter", JSON.stringify(profile.characters.data[charID]))
        const { [charID]: _, ...others } = profile.characters.data
        setCharacters(Object.values(others))
      })
    })
  }

  return (
    <characterContext.Provider value={{
      activeCharacter: activeCharacter,
      changeActiveCharacter: changeActiveCharacter,
      characters: characters,
      characterDropdownOpen: dropdownOpen,
      setDropdownOpen: openDropdown,
      initChar: initChar
    }}>
      { children }
    </characterContext.Provider>
  )
}

export default characterContext
