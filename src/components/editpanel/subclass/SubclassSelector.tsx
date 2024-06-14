import { useEffect } from "react"
import SubclassDetails from "./SubclassDetails"
import { initDB, readProfile } from "../../../store/indexedDBHandler"

const SubclassSelector = (): React.JSX.Element => {

  useEffect(() => {
    initDB().then(success => {
      if (success) {
        readProfile("user-profile").then((profile) => {
          if (localStorage.getItem("activeCharacter") !== null) {

          }
        })
      }
    })
  }, [localStorage])

  return (
    <div>
      <SubclassDetails/>
    </div>
  )
}

export default SubclassSelector
