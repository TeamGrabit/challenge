/* 크롤링 데이터 처리 관련 함수들 파일 */

const axios = require('axios');
const cheerio = require('cheerio');

/*
	getDate()
	result에 2021년부터 현재년도까지 담음.
	이후 crawlingModule 에서 result 배열에 있는 년도 git 데이터를 다 크롤링함!
*/
const getDate = () => {
	const date = new Date();
	let result = [];
	var yeargap = date.getFullYear()-2021;
	for(let i = 0; i<=yeargap; i++){
		result.push(2021+i);
	}
	return result;
}

/*
	crawlingModule(gitId)
	axios와 cheerio를 이용하여 깃허브 사이트 크롤링!
	props로 받은 gitId를 이용함.
	result = [
	{ date: '2021-01-01', count: '0' },
    { date: '2021-01-02', count: '0' },
    { date: '2021-01-03', count: '0' },
	...
	]
*/
const crawlingModule = async (gitId) => {
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

/*
	getCommitDate(gitdata, year, month)
	매개변수는 이름은 안 맞춰도 되고, 순서와 형식만 맞춰서 보내주면 됨.
	input
	gitdata 형식
	[
	{ date: '2021-01-01', count: '0' },
    { date: '2021-01-02', count: '0' },
	...
	]
	year 형식 (숫자)
	2021
	month 형식 (숫자)
	7

	output
	result=[ '2021-05-04', '2021-05-06', '2021-05-29', '2021-06-01', '2021-06-20', '2021-06-21', '2021-07-02' ]
	or
	(gitdate, 2021, 1) 인 경우
	result=[ '2021-01-01', '2021-01-03', '2021-01-08', '2021-01-15', '2021-01-18', '2021-01-30' ]
*/
const getCommitDate = async (gitdata, year, month) => {
	let result = [];
	let date_idx = 0;
	const compare_date = make3MonthsDate(year, month);
	for(let i =0; i<Object.keys(gitdata).length; i++){
		if(date_idx > 2) break;
		if(gitdata[i] === undefined) break;
		if(gitdata[i].date.substring(0,7) === compare_date[date_idx]){
			if(isLastDay(gitdata[i].date))
				date_idx = date_idx + 1;
			if(gitdata[i].count > 0)
				result.push(gitdata[i].date);
		}
	}
	return result;
};

/*
	make3MonthsDate(year, month)
	매개변수는 이름은 안 맞춰도 되고, 순서와 형식만 맞춰서 보내주면 됨.
	input
	year 형식 (숫자)
	2021
	month 형식 (숫자)
	7

	output
	result=['2021-05', '2021-06', '2021-07']
*/
const make3MonthsDate = (year, month) => {
	let result = [];
	for(let i = 0; i < 3; i++){ // 3 months 이상을 원할 경우 가운데 숫자 수정
		if(month<10)
			result.unshift(year+"-0"+month);
		else
			result.unshift(year+"-"+month);

		month = month-1;

		if(month === 0){
			year = year-1;
			month = 12;
			if(year < 2021) break; // 2021 이전 데이터는 없으므로 그만!
		}
	}
	return result;
}

/*
	isLastDay(date)
	매개변수는 이름은 안 맞춰도 되고, 순서와 형식만 맞춰서 보내주면 됨.
	input
	date 형식
	2021-05-15

	output
	false
*/
const isLastDay = (date) => {
	var lastDate = new Date(date.substring(0,4), date.substring(5,7), 0).getDate();
	if(date.substring(8,10) == lastDate) return true;
	else return false;
}

module.exports = {
	crawlingModule: crawlingModule,
	getCommitDate: getCommitDate
}