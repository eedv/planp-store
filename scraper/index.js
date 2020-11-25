const cherio = require('cherio');
const fetch = require('node-fetch');
const fs = require('fs')
const aguaCalmaShopUrl = "https://aguacalmabio.com/shop/";
const categorieUrl = "https://aguacalmabio.com/shop/page/{{pageNumber}}/?filters=product_cat[{{catNumber}}]"

const getHtml = async (url) => {
	try {
		const response = await fetch(url);
		const html = await response.text();
		return html
	}
	catch(e) {
		console.log(e)
	}

}

const getPagesUrl = ($pageContent) => {
	const pageItems = $pageContent('a.page-numbers:not(:last-child)');
	const lastPageNumber = $pageContent(pageItems).text()
	const pagesArr = []
	if(!lastPageNumber) {
		return [categorieUrl.replace("{{pageNumber}}", 1)]
	}
	for(let i = 0; i < Number(lastPageNumber); i++) {
		pageArr.push()
	}
	console.log(lastPageNumber)
}

const getCategories = async () => {
	const content = await getHtml(aguaCalmaShopUrl)
	const $ = cherio.load(content);
	return categories = $('.bapf_body > ul > li > input')
		.get()
		.map((elem) => ({name: $(elem).attr('data-name'), number: $(elem).attr('value')}));
}

const getProductList = ($page) => {

}
const getProductsByCategory = async (catNumber) => {
	const url = categorieUrl.replace('{{pageNumber}}', 1).replace('{{catNumber}}', catNumber);
	const page = await getHtml(url);
	const $page = cherio.load(page);
	const pagesUrls = getPagesUrl($page)
	return []
}
const getProductDetails = (url) => {
	return {}
}

const startScrapping = async () => {
	const categories = await getCategories();
	getProductsByCategory(categories[1].number)


}
startScrapping()