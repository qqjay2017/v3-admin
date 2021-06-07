const TokenKey = 'Admin-Token'
const TokenKeyType = 'Admin-Token-Type'
const storage = localStorage

export function getToken () {
  return storage.getItem(TokenKey)
}

export function setToken (token: string) {
  return storage.setItem(TokenKey, token)
}

export function removeToken () {
  return storage.removeItem(TokenKey)
}

// 用户的登录类型

export function getAuthType () {
  return storage.getItem(TokenKeyType)
}

export function setAuthType (type: string) {
  return storage.setItem(TokenKeyType, type)
}

export function removeAuthType () {
  return storage.removeItem(TokenKeyType)
}
