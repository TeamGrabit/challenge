const axios = require('axios');
const cheerio = require('cheerio');

const crawlingModule = async (gitId) => {
	await axios.get(`https://github.com/${gitId}`)
	.then(html => {
		$ = cheerio.load(html.data);
    	const crawl = $('svg > g > g > rect');
		console.log(crawl[10].attribs['data-date']);
		for(let i =0; i<Object.keys(crawl).length; i++){
			console.log(crawl[i].attribs['data-date']);
			console.log(crawl[i].attribs['data-count']);
		}
    })
	.catch((e) => {
		console.log("error");
		console.log(e);
	})
};

module.exports = {
	crawlingModule: crawlingModule
}