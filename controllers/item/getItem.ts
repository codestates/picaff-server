import { Response, Request } from 'express'
import { default as interfaces } from '@interface/index'
import { default as token } from '@middleware/jwt'

const getItem = async (req: Request, res: Response) => {
  if (typeof req.query.itemId === undefined) {
    return res.status(400).send('itemId undefined.')
  } else {
    if (req.headers.authorization) {
      const authorization = String(req.headers.authorization)
      const itemId = Number(req.query.itemId)
      const myToken = authorization!.split(' ')[1]
      const data = token.verifyToken(myToken)
      const userId = data.id
      const itemInfo = await interfaces.getItemInfo(itemId, userId)
      res.status(200).send(itemInfo)
    } else {
      const itemId = Number(req.query.itemId)
      const itemInfo = await interfaces.getItemInfo(itemId, null)
      res.status(200).send(itemInfo)
    }
  }

  //   if (typeof req.query.itemId === undefined) {
  //     return res.send(400).send('itemId undefined.')
  //   } else {
  //     const itemId = Number(req.query.itemId)
  //     let likeValue = false
  //     const itemInfoWithLiked = await interfaces.getItemInfoWithLiked(itemId)

  //     if (itemInfoWithLiked !== undefined) {
  //       if (itemInfoWithLiked.likeds) {
  //         likeValue = true
  //       }
  //       const {
  //         coffeeCharacterId,
  //         productCharacterId,
  //         id,
  //         itemName,
  //         itemPrice,
  //         type,
  //         imageUrl,
  //         iso,
  //       } = itemInfoWithLiked
  //       const coffeeCharacter = await interfaces.getCoffeeCharacter(coffeeCharacterId)
  //       const productCharacter = await interfaces.getProductCharacter(productCharacterId)

  //       if (coffeeCharacter !== undefined) {
  //         const { sweetness, sourness, balance, body, afterTaste } = coffeeCharacter

  //         console.log(coffeeCharacter)
  //         res.status(200).send({
  //           id: id,
  //           itemName: itemName,
  //           itemPrice: itemPrice,
  //           type: type,
  //           imageUrl: imageUrl,
  //           iso: iso,
  //           character: {
  //             id: coffeeCharacter.id,
  //             sweetness: sweetness,
  //             sourness: sourness,
  //             balance: balance,
  //             body: body,
  //             afterTaste: afterTaste,
  //           },
  //           liked: likeValue,
  //         })
  //       } else if (productCharacter !== undefined) {
  //         const { accessibility, effectiveness, convenience } = productCharacter
  //         console.log(productCharacter)
  //         res.status(200).send({
  //           id: id,
  //           itemName: itemName,
  //           itemPrice: itemPrice,
  //           type: type,
  //           imageUrl: imageUrl,
  //           character: {
  //             id: productCharacter.id,
  //             accessibility: accessibility,
  //             convenience: convenience,
  //             effectiveness: effectiveness,
  //           },
  //           liked: likeValue,
  //         })
  //       }
  //     } else {
  //       res.status(400).send('character undefined.')
  //     }
  //   }
  // } else {
  //   res.status(401).send('Invalid access token.')
  // }
}

export default getItem
