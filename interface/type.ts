export type tokenUser = {
  id: number
  userName: String
  email: String
}
export type allUserInfo = {
  id: Number
  userName: String
  email: String
  password: String
}

export type TokenPayload = {
  iss: string
  at_hash?: string
  email_verified?: boolean
  sub: string
  azp?: string
  email: string
  profile?: string
  picture?: string
  name: string
  given_name?: string
  family_name?: string
  aud: string
  iat: number
  exp: number
  nonce?: string
  hd?: string
  locale?: string
}
