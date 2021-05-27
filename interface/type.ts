export type userInfo = {
  id: number
  userName: string
  email: string
}
export type allUserInfo = {
  id: number
  userName: string
  email: string
  password: string
}
export type tokenUser = {
  id: number
  userName: string
  email: string
  iat: number
  exp: number
}

export type googleClientId = {
  GOOGLE_CLIENT_ID: string
}

export type kakaoProperties = {
  nickname: string
}

export type queryItemId = {
  id: number
}
