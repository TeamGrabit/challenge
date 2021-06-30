const axios = require('axios');
const cheerio = require('cheerio');

const crawlingModule = async (gitId) => {
	let result = [];
	await axios.get(`https://github.com/${gitId}`)
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
		return result;
    })
	.catch((e) => {
		console.log("error");
		console.log(e);
	})
};

module.exports = {
	crawlingModule: crawlingModule
}