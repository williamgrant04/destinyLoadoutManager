export const initDB = () => {
  return new Promise((resolve) => {
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

export const putData = (data) => {
  return new Promise((resolve) => {
    const dbRequest = indexedDB.open("store", 1)

    dbRequest.onsuccess = () => {
      const db = dbRequest.result
      const transaction = db.transaction("store", "readwrite")
      const store = transaction.objectStore("store")
      store.put(data, "destiny2-manifest")
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

export const readManifest = (path) => {
  return new Promise((resolve) => {
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
        resolve(error)
      } else {
        resolve("Unknown error")
      }
    }
  })
}
