import { useContext, useEffect, useState } from "react"
import SubclassDetails from "./SubclassDetails"
import { initDB, readManifest, readProfile } from "../../../store/indexedDBHandler"
import characterContext from "../../../store/characterContext"
import { Item } from "../../../destinyTypes/bungieInterfaces"
import styled from "styled-components"

const SubclassSelector = (): React.JSX.Element => {
  const chars = useContext(characterContext)
  const [subclasses, setSubclasses] = useState(Array<Item>)
  const [activeSubclass, setActiveSubclass] = useState(Object as unknown as Item)
  const [activeSubclassDisplay, setActiveSubclassDisplay] = useState({})
  const [subclassSockets, setSubclassSockets] = useState(Array<{ [key: string]: any }>) // This is a placeholder type
  const [aspects, setAspects] = useState(Array<any>) // * Placeholder type
  const [fragments, setFragments] = useState(Array<any>) // * Placeholder type
  const [abilities, setAbilities] = useState(Array<any>) // * Placeholder type

  useEffect(() => {
    console.log("Subclass stuff Render");
    initDB().then(success => {
      if (!success) { return }

      readManifest("DestinyInventoryItemDefinition").then((manifest) => {
        try {
          const activeDisplay = manifest[activeSubclass.itemHash].displayProperties
          activeDisplay.screenshot = manifest[activeSubclass.itemHash].screenshot // This is because there is no "highResIcon" for subclasses other than Strand (for some reason?)
          setActiveSubclassDisplay(activeDisplay)

          const aspectsArray = [] as Array<any> // * Placeholder type
          const fragmentsArray = [] as Array<any> // * Placeholder type
          const abilitiesArray = [] as Array<any> // * Placeholder type
          subclassSockets.forEach((socket) => {
            const socketName = manifest[socket.plugHash].itemTypeDisplayName

            if (socketName.includes("Aspect") && aspects.length <= 2) {
              aspectsArray.push(manifest[socket.plugHash])
              setAspects(aspectsArray)
            }

            if ((socketName.includes("Fragment") || manifest[socket.plugHash].displayProperties.name.includes("Fragment")) && fragments.length <= 6) {
              fragmentsArray.push(manifest[socket.plugHash])
              setFragments(fragmentsArray)
            }

            if (socketName.includes("Ability") || socketName.includes("Grenade") || socketName.includes("Melee")) {
              if (socketName.includes("Utility") || socketName.includes("Prismatic") || socketName.includes("Aspect")) { return } // TODO: Patch fix, look for improvement later
              abilitiesArray.push(manifest[socket.plugHash])
              if (socketName.includes("Super")) {
                // Put the super at the top of the array so it displays first, probably a better way but this works
                const t = abilitiesArray[abilitiesArray.indexOf(manifest[socket.plugHash])]
                abilitiesArray[abilitiesArray.indexOf(manifest[socket.plugHash])] = abilitiesArray[0]
                abilitiesArray[0] = t
              }
              setAbilities(abilitiesArray)
            }
          })
        } catch (e) {
          // This error is irrelevant because the character hasn't been loaded yet so there is no activeCharacter
          // and it just gets loaded next cycle
        }
      })
    })

  }, [subclassSockets])

  useEffect(() => {
    console.log("Active character Render");

    setSubclassSockets([])
    setActiveSubclass({} as Item)
    initDB().then(success => {
      if (!success) { return }

      readProfile("user-profile").then((profile) => {
        try {
          const items = profile.characterInventories.data[chars.activeCharacter.characterId].items as Array<Item>
          setSubclasses(items.filter(item => item.bucketHash === 3284755031))

          const equippedItems = profile.characterEquipment.data[chars.activeCharacter.characterId].items as Array<Item>
          setActiveSubclass(equippedItems.find(item => item.bucketHash === 3284755031)!) // Will never be null because you must have an equipped subclass

          setSubclassSockets(profile.itemComponents.sockets.data[equippedItems.find(item => item.bucketHash === 3284755031)!.itemInstanceId].sockets)
        } catch (e) {
          // This error is irrelevant because the character hasn't been loaded yet so there is no activeCharacter
          // and it just gets loaded next cycle
        }
      })
    })
  }, [chars.activeCharacter])

  return (
    <SubclassWrapper>
      <SubclassAspectsFragments>
        <SubclassDetails subclassDisplay={activeSubclassDisplay} />
        <Aspects>
          {aspects.map((aspect, i) => {
            return (
              <Aspect $backgroundImage={`https://bungie.net${aspect.secondaryIcon}`} key={aspect.index + i}> {/* This is because I can't find unique keys */}
                <h2>{aspect.displayProperties.name}</h2>
                <em>{aspect.itemTypeDisplayName}</em>
              </Aspect>
            )
          })}
        </Aspects>
        <Fragments>
          {fragments.map((fragment, i) => {
            return (
              // Deal with the fact that some fragments don't have a secondaryIcon
              <Fragment $backgroundImage={`https://bungie.net${fragment.secondaryIcon}`} key={fragment.index + i}> {/* This is because I can't find unique keys */}
                <p>{fragment.displayProperties.name}</p>
              </Fragment>
            )
          })}
        </Fragments>
      </SubclassAspectsFragments>
      <Abilities>
        {abilities.map((ability, i) => {
          return (
            <Ability key={ability.index + i}> {/* This is because I can't find unique keys */}
              <AbilityTransparencyFix $super={ability.itemTypeDisplayName.includes("Super")}></AbilityTransparencyFix>
              <img src={`https://bungie.net${ability.displayProperties.icon}`} alt="" />
              <div>
                <h3>{ability.displayProperties.name}</h3>
                <em>{ability.itemTypeDisplayName}</em>
              </div>
            </Ability>
          )
        })}
      </Abilities>
    </SubclassWrapper>
  )
}

const SubclassWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 125px;
  width: 85%;
`

const SubclassAspectsFragments = styled.div`
  width: 70%;
`

const Aspects = styled.div`
  display: flex;
  gap: 4px;
`

const Aspect = styled.div<{ $backgroundImage: string }>`
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${props => props.$backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 50%;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 0;
  margin: 10px 0;

  h2, em {
    margin: 0;
    color: white;
  }
`

const Fragments = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 20px;
  padding: 20px;
`

const Fragment = styled.div<{ $backgroundImage: string }>`
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${props => props.$backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 60px;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
    font-style: italic;
  }
`

const Abilities = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const Ability = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 75px;
    height: 75px;
    position: absolute;
  }

  h3, em {
    margin: 0;
    margin-left: 10px;
  }
`

const AbilityTransparencyFix = styled.div<{ $super: boolean }>`
  transform: ${props => props.$super ? "rotate(45deg) scale(0.70)" : "rotate(0deg)"};
  background-color: black;
  height: 75px;
  width: 75px;
`

export default SubclassSelector
