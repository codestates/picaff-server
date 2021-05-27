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
export type coffeeItemInfo = {
  id: number
  itemName: string
  itemPrice: number
  itemDetail: string
  type: string
  categoryId: number
  productCharacterId: number | null
  coffeeCharacterId: number | null
  coffeeCharacter: object
  tag: object
  isLiked: boolean;
}
export type productItemInfo = {
  id: number
  itemName: string
  itemPrice: number
  itemDetail: string
  type: string
  categoryId: number
  productCharacterId: number | null
  coffeeCharacterId: number | null
  productCharacter: object
  tag: object
  isLiked: boolean;
}
