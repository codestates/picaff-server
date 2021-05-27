export type User = {
  name: string | undefined
  email: string | undefined
  password: string | undefined
  ConfirmPassword?: string | undefined
}
export type CheckEmail = {
  isSend: boolean
  isPassEmail: boolean
  serialNum: string | undefined
  inputNum: string | undefined
  disabled: boolean
}
type Authorization = {
  accessToken: string
}
export type UserInfo = {
  email: string
  name: string
  id: number
  author: Authorization
}
export interface KakaoLoginResponse {
  token_type: string
  access_token: string
  expires_in: string
  refresh_token: string
  refresh_token_expires_in: number
  scope: string
}
export type Test = {
  title: string
  score: number | null
}
export type Score = {
  score: number | null
}
export interface TestResult {
  id: number
  itemName: string
  itemPrice: number
  itemDetail: string
  type: 'machine' | 'coffee'
  imageUrl: string
  categoryId: number
  iso?: string
  itemCharacter?: ProductCharacter
  coffeCharactre?: CoffeeCharacter
  isLiked: boolean
  tag: Tag[]
}
type ProductCharacter = {
  id: number
  accessibility: number
  convenience: number
  effectiveness: number
}
type CoffeeCharacter = {
  id: number
  sweetness: number
  sourness: number
  balance: number
  body: number
  aroma: number
  afterTaste: number
}
type Tag = {
  id: number
  tagname: string
}
export type CoffeeResult = {
  coffeeName: string
  coffeeCharacter: {
    sweetness: number
    sourness: number
    balance: number
    body: number
    aroma: number
    afterTaste: number
  }
}
export type ProductResult = {
  productName: string
  productCharacter: {
    accessibility: number
    convenience: number
    effectiveness: number
  }
}

export type MapOption = {
  zoom: number
  center: { lat: number; lng: number }
}

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
