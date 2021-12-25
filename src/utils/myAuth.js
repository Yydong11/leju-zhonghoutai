
const TokenKey = 'leju_token'; const UserInfo = 'leju_userinfo'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem(UserInfo))
}

export function setUserInfo(obj) {
  return localStorage.setItem(UserInfo, JSON.stringify(obj))
}

export function removeUserInfo() {
  return localStorage.removeItem(UserInfo)
}

export function clear() {
  return localStorage.clear()
}
