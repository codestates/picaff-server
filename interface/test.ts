export default {
  resultCoffee: (coffeeScore:Array<number>) => {
    // let kenya:number = 0;
    // let columbia:number = 0;
    // let brazil:number = 0;
    // let guatemala:number = 0;
    // let yirgacheffe:number = 0;
    const coffeeResultScore: Array<number> = [0, 0, 0, 0, 0]
    // ? kenya, columbia, brazil, guatemala, yirgacheffe 순서입니다.
    coffeeScore.forEach((data, idx) => {
      if (idx === 0 && data > 3) {
        coffeeResultScore[0] -= data * 2
        coffeeResultScore[1] += data
        coffeeResultScore[3] -= data
        coffeeResultScore[4] += data * 2
      } else if (idx === 0 && data < 4) {
        coffeeResultScore[4] += data
        coffeeResultScore[1] += data
        coffeeResultScore[3] -= data
      } else if (idx === 1 && data === 5) {
        coffeeResultScore[0] += data * 5
        coffeeResultScore[1] += data * 2
      } else if (idx === 1 && data < 5) {
        coffeeResultScore[0] += data * 2
        coffeeResultScore[1] += data
      } else if (idx === 2 && data > 3) {
        coffeeResultScore[2] += data * 3
        coffeeResultScore[3] += data * 2
      } else if (idx === 2 && data < 4) {
        coffeeResultScore[2] += data
        coffeeResultScore[3] += data
        coffeeResultScore[5] += data
      } else if (idx === 3 && data > 3) {
        coffeeResultScore[1] += data * 2
        coffeeResultScore[4] += data * 2
        coffeeResultScore[5] += data
      } else if (idx === 3 && data < 4) {
        coffeeResultScore[5] += data * 2
        coffeeResultScore[0] -= data
        coffeeResultScore[1] -= data
      } else if (idx === 4 && data > 2) {
        coffeeResultScore[0] += data
        coffeeResultScore[3] += data * 2
        coffeeResultScore[4] += data * 2
      } else if (idx === 4 && data < 3) {
        coffeeResultScore[1] += data * 3
        coffeeResultScore[2] += data * 2
      } else if (idx === 5 && data > 2) {
        coffeeResultScore[0] += data
        coffeeResultScore[3] += data
      } else if (idx === 5 && data < 3) {
        coffeeResultScore[1] += data
        coffeeResultScore[2] += data
        coffeeResultScore[4] += data * 2
      }
    })

    let index:number = 0
    for (let i = 0; i < coffeeResultScore.length; i++) {
      if (coffeeResultScore[index] < coffeeResultScore[i]) index = i
    }
    return index;
  },
  resultProduct: (productScore:Array<number>) => {
    // let mokapot:number = 0;
    // let handdrip:number = 0;
    // let capsule:number = 0;
    // let waterdrip:number = 0;
    const productResultScore: Array<number> = [0, 0, 0, 0]
    // ? mokapot, handdrip, capsule, waterdrip 순서입니다.
    productScore.forEach((data, idx) => {
      if (idx === 0 && data > 3) {
        productResultScore[0] -= data
        productResultScore[1] += data
        productResultScore[2] -= data * 2
        productResultScore[3] += data * 2
      } else if (idx === 0 && data < 4) {
        productResultScore[0] += data /2
        productResultScore[1] -= data
        productResultScore[2] += data * 1.5
        productResultScore[3] -= data * 2
      } else if (idx === 1 && data > 2 ) {
        productResultScore[0] += data /2
        productResultScore[1] -= data
        productResultScore[2] += data * 2
        productResultScore[3] -= data * 2
      } else if (idx === 1 && data < 3) {
        productResultScore[0] += data
        productResultScore[1] += data * 1.5
        productResultScore[2] -= data * 1.5
        productResultScore[3] += data
      } else if (idx === 2 && data > 3) {
        productResultScore[0] += data * 1.5
        productResultScore[1] += data * 1.5
        productResultScore[2] -= data
        productResultScore[3] -= data * 1.5
      } else if (idx === 2 && data < 4) {
        productResultScore[0] -= data * 1
        productResultScore[1] -= data * 2
        productResultScore[2] += data * 1.5
        productResultScore[3] += data
      } else if (idx === 3 && data > 3) {
        productResultScore[0] -= data
        productResultScore[1] -= data * 2
        productResultScore[2] += data * 1.5
        productResultScore[3] += data
      } else if (idx === 3 && data < 4) {
        productResultScore[0] -= data
        productResultScore[1] -= data * 2
        productResultScore[2] += data * 1.5
        productResultScore[3] += data
      } else if (idx === 4 && data > 3) {
        productResultScore[0] += data
        productResultScore[1] += data * 1.5
        productResultScore[2] += data
        productResultScore[3] += data * 2
      } else if (idx === 4 && data < 4) {
        productResultScore[0] += data
        productResultScore[1] -= data * 1.5
        productResultScore[2] += data
        productResultScore[3] -= data * 2
      }
    })

    let index:number = 0
    for (let i = 0; i < productResultScore.length; i++) {
      if (productResultScore[index] < productResultScore[i]) index = i
    }
    return index;
  }
}