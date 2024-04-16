import { createContext } from "react"
import axios from "axios"

const APIContext = createContext({
  refresh_token: () => {},
  setPrimaryID: () => {}
})


export const APIContextProvider = ({ children }) => {

  const setPrimaryMembershipID = async () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"))
    const res = await axios.get("https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/", {
      headers: {
        "Authorization": `Bearer ${tokens.access_token}`,
        "x-api-key": `${import.meta.env.VITE_BUNGIE_API_KEY}`
      }
    })

    res.data.Response.destinyMemberships.forEach((membership) => {
      if (membership.membershipId == res.data.Response.primaryMembershipId) {
        const primaryID = {
          name: `${membership.bungieGlobalDisplayName}#${membership.bungieGlobalDisplayNameCode}`,
          id: res.data.Response.primaryMembershipId,
          type: membership.membershipType
        }
        localStorage.setItem("primaryID", JSON.stringify(primaryID))
      }
    })
  }

  const refreshAccessToken = async () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"))
    const authHeader = btoa(`46609:${import.meta.env.VITE_CLIENT_SECRET}`)
    const res = await axios.post("https://www.bungie.net/platform/app/oauth/token", { grant_type: "refresh_token", refresh_token: tokens.refresh_token }, {
      headers: {
        "Authorization": `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })

    localStorage.setItem("tokens", res.data)
  }

  axios.interceptors.response.use((response) => {
    // Successful response
    console.log(response)
    return response
  }, async (error) => {
    console.log(error)
    if (error?.response?.status === 401) {
      const originalRequest = error.config
      refreshAccessToken()
      const tokens = JSON.parse(localStorage.getItem("tokens"))

      originalRequest.headers.Authorization = `Bearer ${tokens.access_token}`
      return axios(originalRequest)
    }

    return Promise.reject(error)
  })

  return (
    <APIContext.Provider value={{
      refresh_token: refreshAccessToken,
      setPrimaryID: setPrimaryMembershipID
    }}>
      { children }
    </APIContext.Provider>
  )
}


export default APIContext
