// const puppeteer = require('puppeteer')
const axios = require('axios')
const request = require('request')
const cheerio = require('cheerio')

exports.getAllProductsDocato = async function () {
    const siteUrl = 'https://docato.com.br/'
    let products = await getProductsDocato(siteUrl)
    for(product of products){
        product.details = await getDescriptionProduct(siteUrl + product.href.replace('../',''))
    }

    return {
        status_code: 200,
        products: products
    }

}


async function getProductsDocato(siteUrl) {
    const { data } = await axios({
        method: 'GET',
        url: siteUrl
    })

    var $ = cheerio.load(data)
    var productsList = []
    var productsListSelector = 'body > header > div.d-lg-block.d-none.fixed-top.navbar-expand-lg.navbar-docato > div > div > div.col-lg-8.d-flex.justify-content-end > nav > div:nth-child(1) > div > div > div'
    
    $(productsListSelector).each(function () {
        $(this).children().each(function () {
            $(this).find('div > a').each(function () {
                if ($(this).attr('href') != undefined) {
                    productsList.push({
                        name: $(this).text().trim(),
                        href: $(this).attr('href'),
                        details: ''
                    })
                }
            })
        })
    })
    
    return productsList
}

async function getDescriptionProduct(urlProduct){
    const siteUrl = 'https://docato.com.br'
    const { data } = await axios({
        method: 'GET',
        url: urlProduct
    })
    let functionalities = []

    var $ = cheerio.load(data)

    if(urlProduct.indexOf('departamentos-juridicos') != -1){
        let title = $('#header-departamento-juridico > div > div > div > h2 > strong').text().trim()
        let subTitle = $('#header-departamento-juridico > div > div > div > h3 > small').text().trim()
        let contactLink = $('body > main > section:nth-child(4) > div > div > div.col-12.d-lg-none.d-flex.justify-content-center.pt-3 > a').attr('href').replace('..', '')
        let moreDetails = $('#secao-solucoes-conectadas > div > div.row.pb-5 > div.col-lg-6.offset-lg-3 > a').attr('href')
        
        $('#accordion .card').each(function(){
            // Get title functionality
            let titleFunctionality = $(this).find('div > h5 > button > span').text().trim()
            // Get description functionalities
            let descriptionFunctionality = $(this).find('div > h3 > small').text().trim()
            // Add functionality to the list
            functionalities.push({
                title_functionality: titleFunctionality,
                description_functionality: descriptionFunctionality,
            })
            
        })
        
        return {
            title: title,
            sub_title: subTitle,
            functionalities: functionalities,
            contact_link: siteUrl + contactLink,
            more_details: siteUrl + moreDetails.replace('..', ''),
        }
        
    }else if(urlProduct.indexOf('escritorios-advocacia') != -1){
        let title = $('#header-escritorio > div > div > div > div > h2 > strong').text().trim()
        let subTitle = $('#header-escritorio > div > div > div > div > h3 > small').text().trim()
        let contactLink = $('#secao-melhorar-rotina > div > div > div.col-12.d-flex.pt-5.d-lg-none.justify-content-center.align-items-center > a').attr('href').replace('../..', '')
        
        $('#secao-menor-tempo > div > div').each(function(){
            // Get title functionality
            let titleFunctionality = $(this).find('div.col-lg-6.d-flex.align-items-center > div > h4').text().trim()
            // Get description functionalities
            let descriptionFunctionality = $(this).find('div.col-lg-6.d-flex.align-items-center > div > h3 > small').text().trim()
            
            // Add functionality to the list
            if(titleFunctionality.trim()){
                functionalities.push({
                    title_functionality: titleFunctionality,
                    description_functionality: descriptionFunctionality
                })
                
            }
            
        })
        
        
        return {
            title: title,
            sub_title: subTitle,
            functionalities: functionalities,
            contact_link: siteUrl + contactLink,
            more_details: null,
        }
    }else if(urlProduct.indexOf('operacoes-financeiras') != -1){
        let title = $('#header-operacoes-financeiras > div > div > div > div > h2 > strong').text().trim()
        let subTitle = $('#header-operacoes-financeiras > div > div > div > div > h3 > small').text().trim()
        let contactLink = $('#secao-user-friendly > div > div > div.col-12.pt-4.d-flex.d-lg-none.justify-content-center.align-items-center > a').attr('href').replace('../..', '')
        
        $('#secao-operacoes-seguras > div > div > div').each(function(){
            // Get title functionality
            let titleFunctionality = $(this).find('div.card-conteudo-operacoes > div > h4 > strong').text().trim()
            // Get description functionalities
            let descriptionFunctionality = $(this).find('div.card-conteudo-operacoes > div > h5').text().trim()
            
            // Add functionality to the list
            if(titleFunctionality.trim()){
                functionalities.push({
                    title_functionality: titleFunctionality,
                    description_functionality: descriptionFunctionality
                })
                
            }
            
        })
        
        return {
            title: title,
            sub_title: subTitle,
            functionalities: functionalities,
            contact_link: siteUrl + contactLink,
            more_details: null,
        }
    }
}