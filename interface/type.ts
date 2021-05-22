export type userInfo = {
  id: number
  userName: string
  email: string
};
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
};
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