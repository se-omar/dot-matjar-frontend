/* eslint-disable no-unused-vars */
import axios from 'axios'
//import router from '../router'

export default {
    state: {
        siteColor: localStorage.getItem('siteColor') ? JSON.parse(localStorage.getItem('siteColor')) : [],
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
        currencies: JSON.parse(localStorage.getItem('rates')),
        siteLanguage: localStorage.getItem('language'),
        availableCountries: '',
        worldCountries: [],
        choosenCountries: [],
        allUsers: [],
        user: []
    },

    mutations: {
        // eslint-disable-next-line no-unused-vars


        getSiteColor(state, siteColors) {
            localStorage.removeItem('siteColor')
            localStorage.setItem('siteColor', JSON.stringify(siteColors))
            state.siteColor = JSON.parse(localStorage.getItem('siteColor'))
        },

        refreshCurrentUser(state, user) {
            //console.log('new user is ', user)
            state.currentUser = user;
        },

        emptyProductsArray(state) {
            state.filteredProducts = [];
        },

        getRegions(state, regions) {
            //console.log('sate entered')
            state.regions = []
            for (var i = 0; i < regions.length; i++) {
                state.regions.push(regions[i].city)
            }
            //console.log(state.regions)
        },

        getGovernorate(state, res) {
            state.governorates = res
        },

        getProducts(state, products) {
            var currencies = JSON.parse(localStorage.getItem('rates'))
            var currentCurrency = localStorage.getItem('currentCurrency')
            products.forEach(element => {
                if (element.currency !== currentCurrency) {
                    if (currencies.EGP) {
                        var egp = currencies.EGP;
                        if (element.currency == 'egp') {
                            element.unit_price = Math.trunc(element.unit_price / egp)
                        }
                        else if (element.currency == 'usd') {
                            element.unit_price = Math.trunc(element.unit_price * egp)
                        }
                        else {
                            console.log('error in currency conversion')
                        }
                    }
                    else {
                        console.log('currencies from api are empty')
                    }
                }
            });
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
            var currencies = JSON.parse(localStorage.getItem('rates'))
            var currentCurrency = localStorage.getItem('currentCurrency')
            products.forEach(element => {
                if (element.currency !== currentCurrency) {
                    if (currencies.EGP) {
                        var egp = currencies.EGP;
                        if (element.currency == 'egp') {
                            element.unit_price = Math.trunc(element.unit_price / egp)
                        }
                        else if (element.currency == 'usd') {
                            element.unit_price = Math.trunc(element.unit_price * egp)
                        }
                        else {
                            console.log('error in currency conversion')
                        }
                    }
                    else {
                        console.log('currencies from api are empty')
                    }
                }
            });

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
            //console.log('entered change site color')
            localStorage.setItem('siteColor', supplier.page_color)
            state.siteColor = localStorage.getItem('siteColor');
        },

        supplierPageColor(state, color) {
            //console.log('color of supp', color)
            localStorage.removeItem('siteColor')
            localStorage.setItem('siteColor', color)
            state.siteColor = localStorage.getItem('siteColor')
        },

        getCategoryItems(state, items) {
            state.categoriesItems = items
            //console.log('get categories ittems', items)
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
            //console.log('supplier page colors', supplierPageColors)
            var pageDataArray = [supplierPageColors]

            localStorage.setItem('siteColor', JSON.stringify(pageDataArray));
            state.siteColor = JSON.parse(localStorage.getItem('siteColor')) ? JSON.parse(localStorage.getItem('siteColor')) : []
        },
        changeRadioGroup(state, radioValue) {
            state.radioGroup = radioValue;
        },

        getCurrencies(state, rates) {
            localStorage.setItem('rates', JSON.stringify(rates))
            state.currencies = JSON.parse(localStorage.getItem('rates'))
        },
        siteLanguage(state, value) {
            localStorage.setItem('language', value)
            state.siteLanguage = value
        },
        getAvailableCountries(state, countries) {
            state.availableCountries = countries
        },
        getWorldCountries(state, data) {
            state.worldCountries = data
        },
        getChoosenWorldCountries(state, countries) {

            state.choosenCountries = countries.map(e => {
                return e.country_name
            })
        },
        getAllUsers(state, users) {

            state.allUsers.push(...users)
            console.log(state.allUsers)
        },
        getUser(state, user) {

            state.user = user
        }

    },


    actions: {
        removeSupplierPageData(context) {
            context.commit('removeSupplierPageData')
        },

        getSiteColor(context) {
            axios.put(context.rootState.nodeHost + '/api/getSiteColor')
                .then(response => {
                    //console.log(response.data.data)
                    //console.log(response.data.message)
                    context.commit('getSiteColor', response.data.data)
                })
        },

        async refreshCurrentUser(context) {
            await axios.post(context.rootState.nodeHost + '/api/refreshCurrentUser', {
                token: context.rootState.RegisterLogin.loginToken
            }).then(response => {
                context.commit('refreshCurrentUser', response.data.user)
            })
        },

        getGovernorate(context) {
            axios.put(context.rootState.nodeHost + '/api/getGovernorate')
                .then(res => {
                    //console.log(res.data.data)
                    context.commit('getGovernorate', res.data.data)
                })
        },

        getProducts(context, {
            productFilterFlag,
            productName,
            categoryName
        }) {

            if (!productFilterFlag) {

                axios.post(context.rootState.nodeHost + '/api/products', {
                    product_id: context.state.filteredProducts.length > 0 ? context.state.filteredProducts[context.state.filteredProducts.length - 1].product_id : null
                }).then(response => {

                    context.commit('getProducts', response.data.products);
                    //console.log('productss iss', response.data)
                })
            }
            else {
                axios.post(context.rootState.nodeHost + '/api/loadMoreProductsWithFilter', {
                    product_id: context.state.filteredProducts.length > 0 ? context.state.filteredProducts[context.state.filteredProducts.length - 1].product_id : null,
                    product_name: productName,
                    category_name: categoryName
                }).then(response => {
                    context.commit('getProducts', response.data.products);
                    //console.log('productss iss', response.data)
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
                axios.post(context.rootState.nodeHost + '/api/getSuppliers', {
                    user_id: context.state.suppliers.length > 0 ? context.state.suppliers[context.state.suppliers.length - 1].user_id : null
                }).then(response => {
                    console.log('suppliersssssss', response.data.users)
                    context.commit('getSuppliers', response.data.users)
                })
            }
            else {
                axios.post(context.rootState.nodeHost + '/api/loadMoreSuppliersWithFilter', {
                    user_id: context.state.suppliers.length > 0 ? context.state.suppliers[context.state.suppliers.length - 1].user_id : null,
                    name: supplierName,
                    governorate,
                    region
                }).then(response => {
                    //console.log(response.data.users)
                    context.commit('getSuppliers', response.data.users)
                })
            }
        },

        categoriesDB(context) {
            axios.put(context.rootState.nodeHost + '/api/selectCategory')
                .then((res) => {
                    console.log('category from db', res.data.data)
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
            buttonPressed
        }) {
            var product_id = context.state.products[0].product_id
            console.log(product_name,
                category_name,
                governorate,
                region,
                categoryItem,
                priceFrom,
                priceTo,
                buttonPressed, context.state.siteLanguage, product_id)
            axios.put(context.rootState.nodeHost + '/api/filterProducts', {
                product_name,
                category_name,
                governorate,
                region,
                categoryItem, priceFrom, priceTo,
                siteLanguage: context.state.siteLanguage,
                product_id: product_id
            })
                .then(response => {
                    //console.log('message:', response.data.message)

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
            //console.log('governorate', governorate)
            //console.log('region', region)

            axios.put(context.rootState.nodeHost + '/api/filterSuppliers', {
                user_id: context.state.suppliers.length > 0 ? context.state.suppliers[context.state.suppliers.length - 1].user_id : null,
                name: supplierName,
                governorate: governorate,
                region: region
            }).then(response => {
                //console.log(response)
                context.commit('filterSuppliers', response.data.users)
            })
        },

        getRegions(context, governorate) {
            //console.log(governorate)
            axios.put(context.rootState.nodeHost + '/api/getRegions', { governorate: governorate })
                .then(regions => {
                    //console.log('regionss', regions.data.data)
                    context.commit('getRegions', regions.data.data)
                })
        },

        addNewCategory(context, { categoryName, categoryArabicName }) {
            axios.post(context.rootState.nodeHost + '/api/addNewCategory', { categoryName, categoryArabicName })
                .then(message => {
                    //console.log(message.data.message)
                    alert(message.data.message)

                })
        },
        addCategoryItems(context, { categoryName, categoryItem, itemArabicName }) {
            axios.post(context.rootState.nodeHost + '/api/addCategoryItems', { categoryName: categoryName, categoryItem: categoryItem, itemArabicName: itemArabicName })
                .then(message => {
                    //console.log(message.data.message)
                    alert(message.data.message)
                })
        },
        getCategoryItems(context) {
            axios.put(context.rootState.nodeHost + '/api/getCategoryItems')
                .then(response => {
                    //console.log(response.data.message)
                    //console.log('get category items', response.data.data)
                    context.commit('getCategoryItems', response.data.data)
                })


        },
        removeCategoryAndItems(context, { categoryName, categoryItem }) {
            axios.put(context.rootState.nodeHost + '/api/removeCategoryAndItems', { categoryName: categoryName, categoryItem: categoryItem })
                .then(message => {
                    //console.log(message.data.message)
                    alert(message.data.message)
                })
        },
        requestNewCategoryAndItem(context, {
            newCategoryName,
            newCategoryDescription,
            newCategoryItem,
            newCategoryItemDescription,
            categoryName, itemArabicName, categoryArabicName }) {

            axios.post(context.rootState.nodeHost + '/api/requestNewCategoryAndItem', {
                newCategoryName,
                newCategoryDescription,
                newCategoryItem,
                newCategoryItemDescription,
                categoryName,
                itemArabicName,
                categoryArabicName,
                user_id: context.state.currentUser.user_id
            }).then(res => {
                //console.log(res.data.message)
                //console.log(res.data.data)
            })
        },
        getCategoryAndItemRequests(context) {
            axios.get(context.rootState.nodeHost + '/api/getCategoryAndItemRequests')
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
            axios.put(context.rootState.nodeHost + '/api/categoryAndItemRequestStatus', {
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
            //console.log('user idd issssss', context.state.currentUser.user_id)
            axios.put(context.rootState.nodeHost + '/api/getSupplierCategoriesRequests', { user_id: context.state.currentUser.user_id })
                .then(requests => {
                    //console.log(requests.data.message);
                    //console.log('Requueests get', requests.data.data)
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
            axios.post(context.rootState.nodeHost + '/api/updateSiteColors', {
                toolBarColor,
                footerColor,
                buttonsColor,
                buttonsTextColor,
                footerTextColor,
                toolBarTextColor
            })
                .then(message => {
                    //console.log(message.data.message);
                })
        },

        async updateHomePage(context, { show_carousel,
            show_right_banner,
            carousel_width,
            carousel_height, }) {
            //console.log('show right banner from action', show_right_banner);

            await axios.post(context.rootState.nodeHost + '/api/updateHomePage', {
                show_carousel,
                show_right_banner,
                carousel_width,
                carousel_height,
            })
                .then(response => {

                    //console.log(response.data.message, response.data.data)
                    context.commit('updateHomePage', response.data.data)

                })
        },

        async uploadHomeCarouselImages(context, form) {
            await axios.post(context.rootState.nodeHost + '/api/uploadHomeCarouselImages', form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(response => {
                    console.log(response)
                })
        },

        async uploadHomeBannerImages(context, form) {
            await axios.post(context.rootState.nodeHost + '/api/uploadHomeBannerImages', form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(response => {

                    //console.log('row resposne', response)
                })
        },

        async removeHomeCarouselImage(context, { imgName }) {
            await axios.post(context.rootState.nodeHost + '/api/removeHomeCarouselImage', {
                imgName
            }).then(response => {
                //console.log('remove img response', response)
            })
        },

        async removeHomeBannerImage(context, { imgName }) {
            await axios.post(context.rootState.nodeHost + '/api/removeHomeBannerImage', {
                imgName
            }).then(response => {
                //console.log('remove img response', response)
            })
        },

        async getHomePageData(context) {
            await axios.put(context.rootState.nodeHost + '/api/getHomePageData')
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
            axios.post(context.rootState.nodeHost + '/api/updateSupplierSiteColors', {
                toolBarColor,
                footerColor,
                buttonsColor,
                buttonsTextColor,
                footerTextColor,
                toolBarTextColor,
                user_id: context.state.currentUser.user_id
            })
                .then(message => {
                    //console.log(message.data.message);
                })
        },

        async getCurrencies(context) {
            await axios
                .get('https://api.exchangerate.host/latest?base=USD').then(response => {
                    console.log('currencies from action ', response.data.rates)
                    context.commit('getCurrencies', response.data.rates)
                })
        },

        async getAvailableCountries(context) {
            await axios.put(context.rootState.nodeHost + '/api/getAvailableCountries')
                .then(countries => {
                    console.log('available countries', countries.data.data)
                    context.commit('getAvailableCountries', countries.data.data)
                })
        },
        async getWorldCountries(context) {
            axios.put(context.rootState.nodeHost + '/api/getWorldCountries')
                .then(data => {
                    console.log('world countries', data.data.data)
                    context.commit('getWorldCountries', data.data.data)
                })
        },
        addCountry(context, country) {
            axios.post(context.rootState.nodeHost + '/api/addCountry', { country })
                .then(message => {
                    alert(message.data.message)
                })
        },
        getChoosenWorldCountries(context) {
            axios.put(context.rootState.nodeHost + '/api/getChoosenWorldCountries')
                .then(countries => {
                    console.log('choosen world counties', countries.data.data)
                    context.commit('getChoosenWorldCountries', countries.data.data)
                })
        },
        removeCountry(context, country) {
            axios.put(context.rootState.nodeHost + '/api/removeCountry', { country: country })
                .then(res => { alert(res.data.message) })
        },
        getAllUsers(context) {
            var id = context.state.allUsers.length > 0 ? context.state.allUsers[context.state.allUsers.length - 1].user_id : null
            console.log('loadmore', id)
            axios.put("http://localhost:3000/api/getAllUsers", { user_id: context.state.allUsers.length > 0 ? context.state.allUsers[context.state.allUsers.length - 1].user_id : null })
                .then(users => {
                    console.log(users.data.data)
                    context.commit('getAllUsers', users.data.data)
                })
        },
        getUser(context, user_id) {
            axios.put("http://localhost:3000/api/getUser", { user_id })
                .then(user => {

                    console.log('user iss', user.data.data)
                    context.commit('getUser', user.data.data)
                })

        },
        updateUserInfo(context, {
            national_number,
            gender,
            full_arabic_name,
            full_english_name,
            birthdate,
            qualifications,
            job,
            governorate,

            region,
            center,
            phone_number,
            mobile_number,
            fax,
            facebook_account,
            linkedin,
            website,
            address,
            email,
            user_id,
            user_type
        }) {
            axios.put('http://localhost:3000/api/updateUserInfoFromAdmin', {
                national_number,
                gender,
                full_arabic_name,
                full_english_name,
                birthdate,
                qualifications,
                job,
                governorate,

                region,
                center,
                phone_number,
                mobile_number,
                fax,
                facebook_account,
                linkedin,
                website,
                address,
                email,
                user_id,
                user_type
            })
                .then(message => {
                    alert(message.data.message)
                })
        },
        deleteUser(context, user_id) {
            console.log(user_id)
            axios.put('http://localhost:3000/api/deleteUser', { user_id: user_id })
                .then(message => {
                    alert(message.data.message)
                })
        }



    },


}