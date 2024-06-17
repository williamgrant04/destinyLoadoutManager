import { ManifestObject, StoredUser } from "../destinyTypes/bungieInterfaces"

export const initDB = () => {
  return new Promise<boolean>((resolve) => {
    const dbRequest = indexedDB.open("store")

    dbRequest.onerror = (e) => {
      console.error(e)
      resolve(false)
    }

    dbRequest.onupgradeneeded = () => {
      const db = dbRequest.result
      if (!db.objectStoreNames.contains("store")) {
        db.createObjectStore("store");
      }
    }

    dbRequest.onsuccess = () => {
      resolve(true)
    }
  })
}

export const putData = (data: object, key: string) => {
  return new Promise<object | string>((resolve) => {
    const dbRequest = indexedDB.open("store", 1)

    dbRequest.onsuccess = () => {
      const db = dbRequest.result
      const transaction = db.transaction("store", "readwrite")
      const store = transaction.objectStore("store")
      store.put(data, key)
      resolve(data)
    }

    dbRequest.onerror = () => {
      const error = dbRequest.error?.message
      if (error) {
        resolve(error)
      } else {
        resolve("Unknown error")
      }
    }
  })
}

export const readManifest = (path: string) => {
  return new Promise<ManifestObject>((resolve) => {
    const dbRequest = indexedDB.open("store", 1)

    dbRequest.onsuccess = () => {
      const db = dbRequest.result
      const transaction = db.transaction("store", "readonly")
      const store = transaction.objectStore("store")
      const response = store.get("destiny2-manifest")
      response.onsuccess = () => {
        resolve(response.result[path])
      }
    }

    dbRequest.onerror = () => {
      const error = dbRequest.error?.message
      if (error) {
        console.error(error)
      }
    }
  })
}

export const readProfile = (key: string) => {
  return new Promise<StoredUser>((resolve, reject) => {
    const dbRequest = indexedDB.open("store", 1)

    dbRequest.onsuccess = () => {
      const db = dbRequest.result
      const transaction = db.transaction("store", "readonly")
      const store = transaction.objectStore("store")
      const response = store.get(key)
      response.onsuccess = () => {
        resolve(response.result)
      }
    }

    dbRequest.onerror = () => {
      const error = dbRequest.error?.message
      if (error) {
        reject(error)
      } else {
        reject("Unknown error")
      }
    }
  })
}
