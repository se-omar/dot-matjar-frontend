import axios from 'axios'
//import router from '../router'

export default {
    state: {
        siteColor: JSON.parse(localStorage.getItem('siteColor')) ? JSON.parse(localStorage.getItem('siteColor')) : 'blue',
        currentUser: '',
        filteredProducts: [],
        regions: [],
        governorates: [],
        products: [],
        suppliers: [],
        allSuppliers: [],
        category: [],
        categoriesItems: [],
        categoryAndItemRequests: [],
        categoryRequestMessage: '',
        supplierCategoriesRequests: [],
        homePageInfo: {},
        radioGroup: '1',
        siteLanguage: 'en',
        availableCountries: '',
        worldCountries: []
    },

    mutations: {
        // eslint-disable-next-line no-unused-vars


        getSiteColor(state, siteColors) {
            localStorage.removeItem('siteColor')
            localStorage.setItem('siteColor', JSON.stringify(siteColors))
            state.siteColor = JSON.parse(localStorage.getItem('siteColor'))
        },

        refreshCurrentUser(state, user) {
            console.log('new user is ', user)
            state.currentUser = user;
        },

        emptyProductsArray(state) {
            state.filteredProducts = [];
        },

        getRegions(state, regions) {
            console.log('sate entered')
            state.regions = []
            for (var i = 0; i < regions.length; i++) {
                state.regions.push(regions[i].city)
            }
            console.log(state.regions)
        },

        getGovernorate(state, res) {
            state.governorates = res
        },

        getProducts(state, products) {
            state.products.push(...products);
            state.filteredProducts.push(...products);
        },

        getSuppliers(state, suppliers) {
            state.suppliers.push(...suppliers);
            state.allSuppliers.push(...suppliers);
        },

        categoriesDB(state, data) {

            if (state.siteLanguage == 'en') {
                state.category = data.map(e => {
                    return e.category_name
                })
            }
            else {
                state.category = data.map(e => {
                    return e.category_arabic_name
                })
            }


        },

        filterProducts(state, { products, pressed }) {
            //  debugger
            if (pressed == 'search')
                state.filteredProducts = products;
            else
                state.filteredProducts.push(...products)
        },

        filterSuppliers(state, users) {
            state.suppliers = users;
        },

        emptySearch(state) {
            state.filteredProducts = state.products
        },

        emptySupplierName(state) {
            state.suppliers = state.allSuppliers
        },

        changeSiteColor(state, supplier) {
            console.log('entered change site color')
            localStorage.setItem('siteColor', supplier.page_color)
            state.siteColor = localStorage.getItem('siteColor');
        },

        supplierPageColor(state, color) {
            console.log('color of supp', color)
            localStorage.removeItem('siteColor')
            localStorage.setItem('siteColor', color)
            state.siteColor = localStorage.getItem('siteColor')
        },

        getCategoryItems(state, items) {
            state.categoriesItems = items
            console.log('get categories ittems', items)
        },
        getCategoryAndItemRequests(state, requests) {
            state.categoryAndItemRequests = requests
        },
        categoryAndItemRequestStatus(state, message) {
            state.categoryRequestMessage = message
        },
        getSupplierCategoriesRequests(state, supplierCategoriesRequests) {
            state.supplierCategoriesRequests = supplierCategoriesRequests
        },

        updateHomePage(state, pageData) {
            state.homePageInfo = pageData
        },

        getHomePageData(state, info) {
            state.homePageInfo = info
        },
        updateSupplierPageColors(state, supplierPageColors) {
            console.log('supplier page colors', supplierPageColors)
            var pageDataArray = [supplierPageColors]

            localStorage.setItem('siteColor', JSON.stringify(pageDataArray));
            state.siteColor = JSON.parse(localStorage.getItem('siteColor')) ? JSON.parse(localStorage.getItem('siteColor')) : []
        },
        changeRadioGroup(state, radioValue) {
            state.radioGroup = radioValue;
            console.log('radio value', radioValue)
            console.log('radio group', state.radioGroup)
        },
        siteLanguage(state, value) {
            state.siteLanguage = value
        },
        getAvailableCountries(state, countries) {
            state.availableCountries = countries
        },
        getWorldCountries(state, data) {
            state.worldCountries = data
        }

    },


    actions: {
        removeSupplierPageData(context) {
            context.commit('removeSupplierPageData')
        },

        getSiteColor(context) {
            axios.put('http://localhost:3000/api/getSiteColor')
                .then(response => {
                    console.log(response.data.data)
                    console.log(response.data.message)
                    context.commit('getSiteColor', response.data.data)
                })
        },

        async refreshCurrentUser(context) {
            await axios.post('http://localhost:3000/api/refreshCurrentUser', {
                token: context.rootState.RegisterLogin.loginToken
            }).then(response => {
                context.commit('refreshCurrentUser', response.data.user)
            })
        },

        getGovernorate(context) {
            axios.put('http://localhost:3000/api/getGovernorate')
                .then(res => {
                    console.log(res.data.data)
                    context.commit('getGovernorate', res.data.data)
                })
        },

        getProducts(context, {
            productFilterFlag,
            productName,
            categoryName
        }) {
            if (!productFilterFlag) {
                axios.post('http://localhost:3000/api/products', {
                    product_id: context.state.filteredProducts.length > 0 ? context.state.filteredProducts[context.state.filteredProducts.length - 1].product_id : null
                }).then(response => {
                    context.commit('getProducts', response.data.products);
                    console.log('productss iss', response.data)
                })
            }
            else {
                axios.post('http://localhost:3000/api/loadMoreProductsWithFilter', {
                    product_id: context.state.filteredProducts.length > 0 ? context.state.filteredProducts[context.state.filteredProducts.length - 1].product_id : null,
                    product_name: productName,
                    category_name: categoryName
                }).then(response => {
                    context.commit('getProducts', response.data.products);
                    console.log('productss iss', response.data)
                })
            }
        },

        getSuppliers(context, {
            supplierFilterFlag,
            supplierName,
            governorate,
            region
        }) {
            if (!supplierFilterFlag) {
                axios.post('http://localhost:3000/api/getSuppliers', {
                    user_id: context.state.suppliers.length > 0 ? context.state.suppliers[context.state.suppliers.length - 1].user_id : null
                }).then(response => {
                    console.log(response.data.users)
                    context.commit('getSuppliers', response.data.users)
                })
            }
            else {
                axios.post('http://localhost:3000/api/loadMoreSuppliersWithFilter', {
                    user_id: context.state.suppliers.length > 0 ? context.state.suppliers[context.state.suppliers.length - 1].user_id : null,
                    name: supplierName,
                    governorate,
                    region
                }).then(response => {
                    console.log(response.data.users)
                    context.commit('getSuppliers', response.data.users)
                })
            }
        },

        categoriesDB(context) {
            axios.put('http://localhost:3000/api/selectCategory')
                .then((res) => {
                    console.log(res.data.data)
                    context.commit('categoriesDB', res.data.data)
                })
        },

        filterProducts(context, {
            product_name,
            category_name,
            governorate,
            region,
            categoryItem,
            priceFrom,
            priceTo,
            product_id, buttonPressed
        }) {
            console.log(product_name,
                category_name,
                governorate,
                region,
                categoryItem,
                priceFrom,
                priceTo,
                product_id, buttonPressed)
            axios.put('http://localhost:3000/api/filterProducts', {
                product_name,
                category_name,
                governorate,
                region,
                categoryItem, priceFrom, priceTo, product_id,
                siteLanguage: context.state.siteLanguage
            })
                .then(response => {
                    console.log('message:', response.data.message)

                    //debugger
                    console.log('filtered products', response.data.data)
                    context.commit('filterProducts', { products: response.data.data, pressed: buttonPressed });
                })
        },

        filterSuppliers(context, {
            supplierName,
            governorate,
            region
        }) {
            console.log('governorate', governorate)
            console.log('region', region)

            axios.put('http://localhost:3000/api/filterSuppliers', {
                user_id: context.state.suppliers.length > 0 ? context.state.suppliers[context.state.suppliers.length - 1].user_id : null,
                name: supplierName,
                governorate: governorate,
                region: region
            }).then(response => {
                console.log(response)
                context.commit('filterSuppliers', response.data.users)
            })
        },

        getRegions(context, governorate) {
            console.log(governorate)
            axios.put('http://localhost:3000/api/getRegions', { governorate: governorate })
                .then(regions => {
                    console.log('regionss', regions.data.data)
                    context.commit('getRegions', regions.data.data)
                })
        },

        addNewCategory(context, { categoryName, categoryArabicName }) {
            axios.post('http://localhost:3000/api/addNewCategory', { categoryName, categoryArabicName })
                .then(message => {
                    console.log(message.data.message)
                    alert(message.data.message)

                })
        },
        addCategoryItems(context, { categoryName, categoryItem, itemArabicName }) {
            axios.post('http://localhost:3000/api/addCategoryItems', { categoryName: categoryName, categoryItem: categoryItem, itemArabicName: itemArabicName })
                .then(message => {
                    console.log(message.data.message)
                    alert(message.data.message)
                })
        },
        getCategoryItems(context) {
            axios.put('http://localhost:3000/api/getCategoryItems')
                .then(response => {
                    console.log(response.data.message)
                    console.log('get category items', response.data.data)
                    context.commit('getCategoryItems', response.data.data)
                })


        },
        removeCategoryAndItems(context, { categoryName, categoryItem }) {
            axios.put('http://localhost:3000/api/removeCategoryAndItems', { categoryName: categoryName, categoryItem: categoryItem })
                .then(message => {
                    console.log(message.data.message)
                    alert(message.data.message)
                })
        },
        requestNewCategoryAndItem(context, {
            newCategoryName,
            newCategoryDescription,
            newCategoryItem,
            newCategoryItemDescription,
            categoryName, itemArabicName, categoryArabicName }) {

            axios.post('http://localhost:3000/api/requestNewCategoryAndItem', {
                newCategoryName,
                newCategoryDescription,
                newCategoryItem,
                newCategoryItemDescription,
                categoryName,
                itemArabicName,
                categoryArabicName,
                user_id: context.state.currentUser.user_id
            }).then(res => {
                console.log(res.data.message)
                console.log(res.data.data)
            })
        },
        getCategoryAndItemRequests(context) {
            axios.get('http://localhost:3000/api/getCategoryAndItemRequests')
                .then(requests => {

                    context.commit('getCategoryAndItemRequests', requests.data.data)
                })
        },
        categoryAndItemRequestStatus(context, { id, status,
            newCategoryName,
            newCategoryDescription,
            newCategoryItem,
            newItemCategoryName,
            requestType,
            categoryArabicName,
            itemArabicName
        }) {
            axios.put('http://localhost:3000/api/categoryAndItemRequestStatus', {
                id, status,
                newCategoryName,
                newCategoryDescription,
                newCategoryItem,
                newItemCategoryName,
                requestType,
                categoryArabicName,
                itemArabicName
            })
                .then(message => {
                    context.commit('categoryAndItemRequestStatus', message.data.message)
                })
        },
        getSupplierCategoriesRequests(context) {
            console.log('user idd issssss', context.state.currentUser.user_id)
            axios.put('http://localhost:3000/api/getSupplierCategoriesRequests', { user_id: context.state.currentUser.user_id })
                .then(requests => {
                    console.log(requests.data.message);
                    console.log('Requueests get', requests.data.data)
                    context.commit('getSupplierCategoriesRequests', requests.data.data)
                }

                )
        },
        updateSiteColors(context, {
            toolBarColor,
            footerColor,
            buttonsColor,
            buttonsTextColor,
            footerTextColor,
            toolBarTextColor
        }) {
            axios.post('http://localhost:3000/api/updateSiteColors', {
                toolBarColor,
                footerColor,
                buttonsColor,
                buttonsTextColor,
                footerTextColor,
                toolBarTextColor
            })
                .then(message => {
                    console.log(message.data.message);
                })
        },

        async updateHomePage(context, { show_carousel,
            show_right_banner,
            carousel_width,
            carousel_height, }) {
            console.log('show right banner from action', show_right_banner);

            await axios.post('http://localhost:3000/api/updateHomePage', {
                show_carousel,
                show_right_banner,
                carousel_width,
                carousel_height,
            })
                .then(response => {

                    console.log(response.data.message, response.data.data)
                    context.commit('updateHomePage', response.data.data)

                })
        },

        async uploadHomeCarouselImages(context, form) {
            await axios.post('http://localhost:3000/api/uploadHomeCarouselImages', form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(response => {

                    console.log('row resposne', response)
                })
        },

        async uploadHomeBannerImages(context, form) {
            await axios.post('http://localhost:3000/api/uploadHomeBannerImages', form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(response => {

                    console.log('row resposne', response)
                })
        },

        async removeHomeCarouselImage(context, { imgName }) {
            await axios.post('http://localhost:3000/api/removeHomeCarouselImage', {
                imgName
            }).then(response => {
                console.log('remove img response', response)
            })
        },

        async removeHomeBannerImage(context, { imgName }) {
            await axios.post('http://localhost:3000/api/removeHomeBannerImage', {
                imgName
            }).then(response => {
                console.log('remove img response', response)
            })
        },

        async getHomePageData(context) {
            await axios.put('http://localhost:3000/api/getHomePageData')
                .then(info => {
                    context.commit('getHomePageData', info.data.data)
                })
        },
        updateSupplierSiteColors(context, {
            toolBarColor,
            footerColor,
            buttonsColor,
            buttonsTextColor,
            footerTextColor,
            toolBarTextColor
        }) {
            axios.post('http://localhost:3000/api/updateSupplierSiteColors', {
                toolBarColor,
                footerColor,
                buttonsColor,
                buttonsTextColor,
                footerTextColor,
                toolBarTextColor,
                user_id: context.state.currentUser.user_id
            })
                .then(message => {
                    console.log(message.data.message);
                })
        },

        async getAvailableCountries(context) {
            await axios.put('http://localhost:3000/api/getAvailableCountries')
                .then(countries => {
                    console.log('available countries', countries.data.data)
                    context.commit('getAvailableCountries', countries.data.data)
                })
        },
        async getWorldCountries(context) {
            axios.put('http://localhost:3000/api/getWorldCountries')
                .then(data => {
                    console.log('world countries', data.data.data)
                    context.commit('getWorldCountries', data.data.data)
                })
        },
        addCountry(context, country) {
            axios.post('http://localhost:3000/api/addCountry', { country })
                .then(message => {
                    alert(message.data.message)
                })
        }


    },


}