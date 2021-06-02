const cheerio = require('cheerio')
import { itemCrawling } from '@interface/type'
import puppeteer from 'puppeteer'

const Crawling = {
  getData: async (data) => {
    try {
      const originURL = 'http://search.danawa.com/dsearch.php?k1=' + data
      const URL = encodeURI(originURL)
      const creawlingDatas: Array<itemCrawling> = []
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto(URL)
      const content = await page.content()
      const $ = cheerio.load(content)
      const lists = $('#powerShoppingArea > div > div.search_goods_list > ul > li')
      await lists.each((index, list) => {
        const title = $(list).find('p.goods_title').text().replace('\n', '').replace(/^\s+/, '')
        const price = $(list).find('p.goods_price > em').text()
        const imageURL = $(list).find('a > img').attr('src')
        const seller = $(list).find('p.goods_npay > span.txt_npay').text()
        const linkURL = $(list).find('a').attr('href')
        creawlingDatas[index] = {
          imageURL: imageURL,
          title: title,
          price: price,
          seller: seller,
          linkURL: linkURL,
        }
      })
      await browser.close()
      return creawlingDatas
    } catch (err) {
      throw new Error('error')
    }
  },
}

export default Crawling
