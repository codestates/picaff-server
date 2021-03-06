export type userInfo = {
  id: number
  userName: string
  email: string
  type?: string
}
export type allUserInfo = {
  id: number
  userName: string
  email: string
  password: string
  type: string
}
export type tokenUser = {
  id: number
  userName: string
  email: string
  type: string
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
  itemDetail: itemDetail
  type: string
  imageURL: string
  iso: string | null
  productCharacterId: number | null
  coffeeCharacterId: number | null
  coffeeCharacter: object
  tag: Array<tag>
  isLiked: boolean
}
export type productItemInfo = {
  id: number
  itemName: string
  itemPrice: number
  itemDetail: itemDetail
  type: string
  imageURL: string
  iso: string | null
  productCharacterId: number | null
  coffeeCharacterId: number | null
  productCharacter: object
  tag: Array<tag>
  isLiked: boolean
}
export type itemDetail = {
  title: string
  content: Array<string>
}
export type tag = {
  id: number
  tagName: string
}

export type itemCrawling = {
  title: string
  imageURL: string
  price: number
  seller: string
  linkURL: string
}
