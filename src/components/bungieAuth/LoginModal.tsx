import styled from "styled-components"
import ReactModal from "react-modal"
import React, { useState, useEffect, useContext, useCallback } from "react"
import axios from "axios"
import APIContext from "../../store/bungieAPIContext"


const LoginModal = (): React.JSX.Element => {
  ReactModal.setAppElement("#root")
  const bungieAPI = useContext(APIContext)

  const [modalOpen, setModalOpen] = useState(false)
  const [bungieUrl, setBungieUrl] = useState("")

  const handleAuth = useCallback(async () => {
    if (localStorage.getItem("tokens")) {
      // User has auth'd, so tokens exist.
      setModalOpen(false)
    } else {
      // User hasn't authenticated with Bungie so their tokens aren't stored in the browser
      setModalOpen(true)
      const params = checkURLParams() // Returns an object with params
      if (params && await checkState(params.state)) {
        // I fucking hate promises
        getTokens(params.code).then((response) => {
          localStorage.setItem("tokens", JSON.stringify(response.data))
          bungieAPI.setPrimaryID()
          bungieAPI.authenticated = true
          setModalOpen(false)
        })
      } else {
        // URL doesn't have params so gen the url
        axios.get("http://localhost:3001/genurl", {
          headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_DLM_API_KEY}`
          }
        }).then(response => setBungieUrl(response.data))
      }
    }
  }, [bungieAPI])

  useEffect(()=> {
    handleAuth()
  }, [handleAuth])


  const checkURLParams = (): { code: string, state: string } | null => {
    const urlParams = window.location.href.split("?")[1]

    if (urlParams) {
      // Wipe the code and state from the url and return an object with the values of the params
      window.history.replaceState({}, "", "https://localhost:5173/")
      return {
        code: urlParams.split("&")[0].split("=")[1],
        state: urlParams.split("&")[1].split("=")[1]
      }
    }

    // If there are none then there's no need to try to authenticate
    return null
  }

  const getTokens = async (code: string) => {
    return await axios.get(`http://localhost:3001/tokens?code=${code}`, {
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_DLM_API_KEY}`
      }
    })
  }

  const checkState = async (state: string) => {
    const res = await axios.post("http://localhost:3001/checkstate", { state: state }, {
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_DLM_API_KEY}`
      }
    })
    // State was valid and matched, so the check passed
    if (res.status === 200) { return true }
    // State was not valid in some way, check failed
    return false
  }

  return (
    <ReactModal isOpen={modalOpen} contentLabel="Login prompt modal" style={ {content: { borderRadius: "8px", boxShadow: "0 5px 12px black", background: "#eee" }} }>
      <ModalWrapper>
        <h2>You must login with Bungie to continue.</h2>
        <p>We use your Bungie account to activate your loadouts in-game.</p>
        <AuthButton href={bungieUrl}>Authorise with Bungie</AuthButton>
      </ModalWrapper>
    </ReactModal>
  )
}

const ModalWrapper = styled.div`
  font-family: "Noto Sans", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  h2 {
    margin: 0;
  }
`

const AuthButton = styled.a`
  margin-top: 10px;
  background-color: #ccc;
  color: black;
  text-decoration: none;
  padding: 15px 20px;
  border-radius: 8px;
  transition: 0.3s;

  &:hover {
    border-radius: 4px;
    color: #ccc;
    background-color: black;
  }

`

export default LoginModal
