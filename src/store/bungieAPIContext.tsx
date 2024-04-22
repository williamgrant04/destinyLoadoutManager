import { createContext } from "react"
import axios from "axios"
import { initDB, putData } from "./indexedDBHandler"
import { Components, DestinyMembership, ManifestObject, Tokens, User } from "../destinyTypes/bungieInterfaces"
import { QueryComponents } from "../destinyTypes/destinyEnums"

const APIContext = createContext({
  setPrimaryID: () => {},
  saveManifest: () => {},
  saveProfile: () => {},
  authenticated: false
})

export const APIContextProvider = ({ children }: { children: React.JSX.Element }) => {

  const getDestinyAPIManifest = async (components: Components, whitelist: string[]) => {
    const manifest = {} as ManifestObject

    const manifests = whitelist.map((p: string) => `Destiny${p}Definition`).map(async (path: string) => {
      const manifestContent = await axios.get(`https://www.bungie.net${components[path]}`)
      manifest[path] = manifestContent.data
    })
    await Promise.all(manifests) // Wait for all calls to finish before trying to return anything
    return manifest
  }

  const saveProfile = async (): Promise<undefined> => {
    const queryComponents = [
      QueryComponents.Profiles,
      QueryComponents.ProfileInventories,
      QueryComponents.Characters,
      QueryComponents.CharacterInventories,
      QueryComponents.CharacterEquipment,
      QueryComponents.CharacterLoadouts
    ]

    const user = JSON.parse(localStorage.getItem("primaryID")!) as User
    const tokens = JSON.parse(localStorage.getItem("tokens")!) as Tokens
    const response = await axios.get(`https://www.bungie.net/Platform/Destiny2/${user.type}/Profile/${user.id}`, {
      headers: {
        "x-api-key": `${import.meta.env.VITE_BUNGIE_API_KEY}`,
        Authorization: `Bearer ${tokens.access_token}`
      },
      params: {
        components: `${queryComponents.join(",")}`
      }
    })

    if (await initDB()) {
      putData(response.data.Response, "user-profile")
    }
  }

  const getDestinyManifest = async () => {
    const whitelist = [
      "InventoryItem",
      "InventoryBucket",
      "Class",
      "DamageType"
    ]

    const res = await axios.get("https://www.bungie.net/Platform/Destiny2/Manifest")

    // Save this as a version because bungie apparently doesn't update the actual version manifest value sometimes
    // (Thank you dim for being open source)
    const version = res.data.Response.jsonWorldContentPaths.en

    // If a version is already cached don't try to load everything
    if (checkManifestCache(version)) { return null }
    let manifest = {}
    try {
      const components = res.data.Response.jsonWorldComponentContentPaths.en as Components // Hardcoding en because I speak english idk
      manifest = await getDestinyAPIManifest(components, whitelist)
    } catch (error) {
      localStorage.removeItem("manifest-version")
      console.error("Error fetching manifest: ", error)
    }

    return manifest
  }

  const checkManifestCache = (version: string) => {
    const storedVersion = localStorage.getItem("manifest-version")
    if (!storedVersion || storedVersion !== version) {
      localStorage.setItem("manifest-version", version)
      return false
    }

    return true
  }

  const saveManifestToIndexedDB = async () => {
    const manifest = await getDestinyManifest()

    // No need to save something already saved
    if (!manifest) {
      console.log("Manifest already cached.")
      return
    }

    if (await initDB()) {
      putData(manifest, "destiny2-manifest")
    }
  }

  const setPrimaryMembershipID = async () => {
    const tokens = JSON.parse(localStorage.getItem("tokens")!) as Tokens
    const res = await axios.get("https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/", {
      headers: {
        "Authorization": `Bearer ${tokens.access_token}`,
        "x-api-key": `${import.meta.env.VITE_BUNGIE_API_KEY}`
      }
    })

    res.data.Response.destinyMemberships.forEach((membership: DestinyMembership) => {
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
    const tokens = JSON.parse(localStorage.getItem("tokens")!) as Tokens
    const authHeader = btoa(`46609:${import.meta.env.VITE_CLIENT_SECRET}`)
    const res = await axios.post("https://www.bungie.net/platform/app/oauth/token", { grant_type: "refresh_token", refresh_token: tokens.refresh_token }, {
      headers: {
        "Authorization": `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })

    localStorage.setItem("tokens", JSON.stringify(res.data))
  }

  // Interceptor to refresh access token when it expires, it should feel seemless to the user (i can only hope)
  axios.interceptors.response.use((response) => {
    // Successful response
    console.log(response)
    return response
  }, async (error) => {
    console.log(error)
    if (error?.response?.status === 401) {
      const originalRequest = error.config
      await refreshAccessToken()
      const tokens = JSON.parse(localStorage.getItem("tokens")!) as Tokens

      originalRequest.headers.Authorization = `Bearer ${tokens.access_token}`
      return axios(originalRequest)
    }

    return Promise.reject(error)
  })

  return (
    <APIContext.Provider value={{
      setPrimaryID: setPrimaryMembershipID,
      saveManifest: saveManifestToIndexedDB,
      saveProfile: saveProfile,
      authenticated: false
    }}>
      { children }
    </APIContext.Provider>
  )
}

export default APIContext
