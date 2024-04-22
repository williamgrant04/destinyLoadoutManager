import { useContext, useEffect } from 'react'
import LoginModal from './components/bungieAuth/LoginModal'
import EditPanel from './components/editpanel/EditPanel'
import LoadoutPanel from './components/loadout/LoadoutPanel'
import APIContext from './store/bungieAPIContext'

const App = () => {
  const bungieAPI = useContext(APIContext)

  useEffect(() => {
    // if (bungieAPI.authenticated) {
    //   bungieAPI.saveProfile()
    //   bungieAPI.saveManifest()
    // }
  }, [bungieAPI])


  return (
    <>
      <LoginModal/>
      <div style={{display: "flex", fontFamily: "Noto Sans"}}>
        <LoadoutPanel/>
        <EditPanel/>
      </div>
    </>
  )
}

export default App
