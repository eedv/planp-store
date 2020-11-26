const cherio = require('cherio');
const fetch = require('node-fetch');
const fs = require('fs')
const aguaCalmaShopUrl = "https://aguacalmabio.com/shop/";
const categorieUrl = "https://aguacalmabio.com/shop/page/{{pageNumber}}/?filters=product_cat[{{catNumber}}]"

const getHtml = async (url) => {
	try {
		const response = await fetch(url);
		const html = await response.text();
		return cherio.load(html);
	}
	catch(e) {
		console.log(e)
	}

}

const getPages = ($pageContent) => {
	const pageItems = $pageContent('a.page-numbers:not(:last-child)');
	const lastPageNumber = $pageContent(pageItems).text()

	if(!lastPageNumber) {
		return [1]
	}

	return Array(Number(lastPageNumber)).fill().map((item, index) => ++index);
}

const getCategories = async () => {
	const $ = await getHtml(aguaCalmaShopUrl)
	return categories = $('.bapf_body > ul > li > input')
		.get()
		.map((elem) => ({name: $(elem).attr('data-name'), number: $(elem).attr('value')}));
}

const getProductList = async (url) => {
	const $ = await getHtml(url);
	return list = $('.products li.product img.wp-post-image').get().map(i => {
		const img = $(i)
		return {
			url: img.parent().attr('href'),
			listingImage: img.attr('src')
		}
	});

}

const getProductsByCategory = async (catNumber) => {
	const url = categorieUrl.replace('{{pageNumber}}', 1).replace('{{catNumber}}', catNumber);
	const $page = await getHtml(url);
	const pages = getPages($page)
	const products = await Promise.all(pages.map(async (pageNumber) => {
		return getProductList(categorieUrl.replace('{{pageNumber}}', pageNumber).replace('{{catNumber}}', catNumber))
	}))
	return products.flat()
}

const getProductDetails = async (url) => {
	const $ = await getHtml(url);
	const title = $('.product_title').text()
	const price = $('.woocommerce-Price-amount').text();
	const mainImage = $('.wp-post-image').attr('src');
	const description = $('#aguacalma-meta__contenido--descripcion').text();
	const ingredients = $('#aguacalma-meta__contenido--ingredientes').text();
	const usage = $('#aguacalma-meta__contenido--mododeuso').text();

	return {
		title,
		price,
		mainImage,
		description,
		ingredients,
		usage
	}
}

const startScrapping = async () => {
	const categories = await getCategories();
	let productList = (await Promise.all(categories.map(async (category) => {
		const categoryProducts = await getProductsByCategory(category.number)
		return categoryProducts.map((p) => Object.assign(p, category))
	}))).flat()
	for (let i = 0; i < productList.length; i++) {
		let productDetails = await getProductDetails(productList[i].url)
		Object.assign(productList[i], productDetails)
	}

	fs.writeFileSync('productList.json', JSON.stringify(productList))

}
startScrapping()