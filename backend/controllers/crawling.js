const axios = require('axios');
const cheerio = require('cheerio');

const getDate = () => {
	const date = new Date();
	let result = [];
	var yeargap = date.getFullYear()-2021;
	for(let i = 0; i<=yeargap; i++){
		result.push(2021+i);
	}
	return result;
}

const crawlingModule = async (gitId) => {
	// 해당 사이트가 만들어진 2021년부터 쭉 크롤링하기!

	let result = [];
	const to = getDate();
	for(let i=0; i<to.length; i++){
		await axios.get(`https://github.com/${gitId}?tab=overview&from=${to[i]}-01-01&to=${to[i]}-12-31`)
		.then(html => {
			$ = cheerio.load(html.data);
			const crawl = $('svg > g > g > rect');

			for(let i =0; i<Object.keys(crawl).length; i++){
				if(crawl[i] === undefined) break;
				result.push({
					date: crawl[i].attribs['data-date'],
					count: crawl[i].attribs['data-count']
				})
			}
		})
		.catch((e) => {
			console.log("error");
			console.log(e);
		})
	}
	return result;
};

module.exports = {
	crawlingModule: crawlingModule
}