import { Response, Request } from 'express'
import { default as interfaces } from '@interface/index'

const getItem = async (req: Request, res: Response) => {
  const authorization = String(req.headers.authorization)
  if (authorization) {
    if (typeof req.query.itemId === undefined) {
      return res.send(400).send('itemId undefined.')
    } else {
      const itemId = Number(req.query.itemId)
      let likeValue = false
      const itemInfoWithLiked = await interfaces.getItemInfoWithLiked(itemId)

      if (itemInfoWithLiked !== undefined) {
        if (itemInfoWithLiked.likeds) {
          likeValue = true
        }
        const {
          coffeeCharacterId,
          productCharacterId,
          id,
          itemName,
          itemPrice,
          type,
          imageUrl,
          iso,
        } = itemInfoWithLiked
        const coffeeCharacter = await interfaces.getCoffeeCharacter(coffeeCharacterId)
        const productCharacter = await interfaces.getProductCharacter(productCharacterId)

        if (coffeeCharacter !== undefined) {
          const { sweetness, sourness, balance, body, afterTaste } = coffeeCharacter

          console.log(coffeeCharacter)
          res.status(200).send({
            id: id,
            itemName: itemName,
            itemPrice: itemPrice,
            type: type,
            imageUrl: imageUrl,
            iso: iso,
            character: {
              id: coffeeCharacter.id,
              sweetness: sweetness,
              sourness: sourness,
              balance: balance,
              body: body,
              afterTaste: afterTaste,
            },
            liked: likeValue,
          })
        } else if (productCharacter !== undefined) {
          const { accessibility, effectiveness, convenience } = productCharacter
          console.log(productCharacter)
          res.status(200).send({
            id: id,
            itemName: itemName,
            itemPrice: itemPrice,
            type: type,
            imageUrl: imageUrl,
            character: {
              id: productCharacter.id,
              accessibility: accessibility,
              convenience: convenience,
              effectiveness: effectiveness,
            },
            liked: likeValue,
          })
        }
      } else {
        res.status(400).send('character undefined.')
      }
    }
  } else {
    res.status(401).send('Invalid access token.')
  }
}

export default getItem
