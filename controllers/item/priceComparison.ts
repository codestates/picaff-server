import axios from 'axios'
import cheerio from 'cheerio'
import { Response, Request } from 'express'
import { libraryagent } from 'googleapis/build/src/apis/libraryagent'

const priceComparison = async (req: Request, res: Response) => {
  const log = console.log

  if (req.query.type === 'coffee') {
    const getHtml = async () => {
      try {
        return await axios.get('http://search.danawa.com/dsearch.php?query=kenya%20aa')
      } catch (error) {
        console.error(error)
      }
    }
    // 커피로 쿼리를 받으면, 배열 [ ] 안에 6개의 커피종류 데이터를 넣는다.
    // 그리고 그것을 전송하여 react단에서 뿌려주면 될 것.

    // div.main_prodlist.main_prodlist_list
    //     ul.product_list
    //         li.prod_item
    //('#productListArea > div.main_prodlist.main_prodlist_list')
    // #productListArea > div.main_prodlist.main_prodlist_list > ul
    //#productItem3849387
    //    #productListArea > div.main_prodlist.main_prodlist_list

    //"#productListArea > div.main_prodlist.main_prodlist_list > ul"
    getHtml()
      .then((html) => {
        // let ulList: Array<string> = []
        let ulList: Object = []
        const $ = cheerio.load(html!.data)
        // const bodyList = $('div#prodArea div#productListArea').children('')
        const bodyList = $('#prodArea > div > div.main_prodlist.main_prodlist_list')

        // const bodyList = $('div.main_prodlist main_prodlist_list').children('ul.product_list')
        // .children('li.prod_item')
        console.log(bodyList.length)
        console.log(bodyList.html())
        bodyList.each(function (i, elem) {
          ulList[i] = {
            // here: $(this).find('div.main_prodlist.main_prodlist_list'),
            // title: $(this).find('a').attr('href'),
            url: $(this).find('p.prod_name a').attr('href'),
            price: $(this).find('p.price_sect a href').attr('strong'),
            // date: $(this).find('span.p-time').text(),
          }
        })
        console.log(bodyList)
        // console.log(sorting)
        // let sortedData = [sorting]
        // console.log(sortedData)
        // return sortedData
        console.log(ulList)
        return ulList
        // const data = ulList.filter((n) => n.title)
        // return data
      })
      //    .then((res) => log(res))
      .then((data) => {
        res.send(data)
      })
  } else if (req.query.type === 'product') {
  }
}

export default priceComparison
