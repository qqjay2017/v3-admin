const TokenKey = 'Admin-Token'

const storage = localStorage

export function getToken () {
  return storage.getItem(TokenKey)
}

export function setToken (token:string) {
  return storage.setItem(TokenKey, token)
}

export function removeToken () {
  return storage.removeItem(TokenKey)
}
