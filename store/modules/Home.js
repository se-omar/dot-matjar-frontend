/* eslint-disable no-unused-vars */
import axios from 'axios'
//import router from '../router'

export default {
    state: {
        siteColor: {},
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
        siteLanguage: localStorage.getItem('language') ? localStorage.getItem('language') : 'en',
        availableCountries: '',
        worldCountries: [],
        choosenCountries: [],
        allUsers: [],
        user: [],
        loadmore: { name: 'all', type: 'all' },
        productAdvancedSearches: ''
    },

    mutations: {
        // eslint-disable-next-line no-unused-vars


        getSiteColor(state, siteColors) {
            //

            localStorage.removeItem('siteColor')
            var obj = siteColors;
            localStorage.setItem('siteColor', JSON.stringify(obj))
            state.siteColor = JSON.parse(localStorage.getItem('siteColor'))

        },

        refreshCurrentUser(state, user) {
            //
            state.currentUser = user;
        },

        emptyProductsArray(state) {
            state.filteredProducts = [];
        },

        getRegions(state, regions) {
            //
            state.regions = []
            for (var i = 0; i < regions.length; i++) {
                state.regions.push(regions[i].city)
            }
            //
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
                            //
                        }
                    }
                    else {
                        //
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
            // 
            if (state.siteLanguage == 'en') {
                state.category = data.map(e => {
                    return { name: e.category_name, icon: e.category_name }
                })
            }
            else {
                state.category = data.map(e => {
                    return { name: e.category_arabic_name, icon: e.category_name }
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
                            //
                        }
                    }
                    else {
                        // 
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
            //
            localStorage.setItem('siteColor', supplier.page_color)
            state.siteColor = localStorage.getItem('siteColor');
        },

        supplierPageColor(state, color) {
            //
            localStorage.removeItem('siteColor')
            localStorage.setItem('siteColor', color)
            state.siteColor = localStorage.getItem('siteColor')
        },

        getCategoryItems(state, items) {
            state.categoriesItems = items
            //
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
            //
            var pageDataArray = supplierPageColors

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
            //
        },
        getUser(state, user) {

            state.user = user
        },
        loadMoreType(state, { name, type }) {

            state.loadmore = { name: name, type: type }

        },

        setProductAdvancedSearches(state, obj) {
            state.productAdvancedSearches = obj
        }

    },


    actions: {
        removeSupplierPageData(context) {
            context.commit('removeSupplierPageData')
        },

        getSiteColor(context) {
            axios.put(context.rootState.nodeHost + '/api/getSiteColor')
                .then(response => {
                    //
                    //
                    context.commit('getSiteColor', response.data.data)

                })
        },

        async refreshCurrentUser(context) {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem('loginToken')}` }
            };

            const bodyParameters = {
                key: "value"
            };

            await axios.post(context.rootState.nodeHost + '/api/refreshCurrentUser',
                bodyParameters, config).then(response => {
                    // 
                    if (response.data.user)
                        context.commit('refreshCurrentUser', response.data.user)
                })
        },

        getGovernorate(context) {
            axios.put(context.rootState.nodeHost + '/api/getGovernorate')
                .then(res => {
                    //
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
                    //
                })
            }
            else {
                axios.post(context.rootState.nodeHost + '/api/loadMoreProductsWithFilter', {
                    product_id: context.state.filteredProducts.length > 0 ? context.state.filteredProducts[context.state.filteredProducts.length - 1].product_id : null,
                    product_name: productName,
                    category_name: categoryName
                }).then(response => {
                    context.commit('getProducts', response.data.products);
                    //
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
                    // 
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
                    //
                    context.commit('getSuppliers', response.data.users)
                })
            }
        },

        categoriesDB(context) {
            axios.put(context.rootState.nodeHost + '/api/selectCategory')
                .then((res) => {
                    // 
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
            buttonPressed,
            product_id
        }) {

            axios.put(context.rootState.nodeHost + '/api/filterProducts', {
                product_name,
                category_name,
                governorate,
                region,
                categoryItem, priceFrom, priceTo,
                siteLanguage: context.state.siteLanguage,
                product_id: product_id,
                loadmoreType: context.state.loadmore.type,
                loadmoreName: context.state.loadmore.name
            })
                .then(response => {

                    context.commit('filterProducts', { products: response.data.data, pressed: buttonPressed });
                })
        },

        filterSuppliers(context, {
            supplierName,
            governorate,
            region
        }) {
            //
            //

            axios.put(context.rootState.nodeHost + '/api/filterSuppliers', {
                user_id: context.state.suppliers.length > 0 ? context.state.suppliers[context.state.suppliers.length - 1].user_id : null,
                name: supplierName,
                governorate: governorate,
                region: region
            }).then(response => {
                //
                context.commit('filterSuppliers', response.data.users)
            })
        },

        getRegions(context, governorate) {
            //
            axios.put(context.rootState.nodeHost + '/api/getRegions', { governorate: governorate })
                .then(regions => {
                    //
                    context.commit('getRegions', regions.data.data)
                })
        },

        addNewCategory(context, { categoryName, categoryArabicName }) {
            axios.post(context.rootState.nodeHost + '/api/addNewCategory', { categoryName, categoryArabicName })
                .then(message => {
                    //
                    alert(message.data.message)

                })
        },
        addCategoryItems(context, { categoryName, categoryItem, itemArabicName }) {
            axios.post(context.rootState.nodeHost + '/api/addCategoryItems', { categoryName: categoryName, categoryItem: categoryItem, itemArabicName: itemArabicName })
                .then(message => {
                    //
                    alert(message.data.message)
                })
        },
        getCategoryItems(context) {
            axios.put(context.rootState.nodeHost + '/api/getCategoryItems')
                .then(response => {
                    //
                    //
                    context.commit('getCategoryItems', response.data.data)
                })


        },
        removeCategoryAndItems(context, { categoryName, categoryItem }) {
            axios.put(context.rootState.nodeHost + '/api/removeCategoryAndItems', { categoryName: categoryName, categoryItem: categoryItem })
                .then(message => {
                    //
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
                //
                //
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
            //
            axios.put(context.rootState.nodeHost + '/api/getSupplierCategoriesRequests', { user_id: context.state.currentUser.user_id })
                .then(requests => {
                    //
                    //
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
                    //
                })
        },

        async updateHomePage(context, { show_carousel,
            show_right_banner,
            carousel_width,
            carousel_height, }) {
            //

            await axios.post(context.rootState.nodeHost + '/api/updateHomePage', {
                show_carousel,
                show_right_banner,
                carousel_width,
                carousel_height,
            })
                .then(response => {

                    //
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
                    //
                })
        },

        async uploadHomeBannerImages(context, form) {
            await axios.post(context.rootState.nodeHost + '/api/uploadHomeBannerImages', form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(response => {

                    //
                })
        },

        async removeHomeCarouselImage(context, { imgName }) {
            await axios.post(context.rootState.nodeHost + '/api/removeHomeCarouselImage', {
                imgName
            }).then(response => {
                //
            })
        },

        async removeHomeBannerImage(context, { imgName }) {
            await axios.post(context.rootState.nodeHost + '/api/removeHomeBannerImage', {
                imgName
            }).then(response => {
                //
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
                    //
                })
        },

        async getCurrencies(context) {
            await axios
                .get('https://api.exchangerate.host/latest?base=USD').then(response => {

                    context.commit('getCurrencies', response.data.rates)
                })
        },

        async getAvailableCountries(context) {
            await axios.put(context.rootState.nodeHost + '/api/getAvailableCountries')
                .then(countries => {
                    // 
                    context.commit('getAvailableCountries', countries.data.data)
                })
        },
        async getWorldCountries(context) {
            axios.put(context.rootState.nodeHost + '/api/getWorldCountries')
                .then(data => {
                    // 
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
                    //
                    context.commit('getChoosenWorldCountries', countries.data.data)
                })
        },
        removeCountry(context, country) {
            axios.put(context.rootState.nodeHost + '/api/removeCountry', { country: country })
                .then(res => { alert(res.data.message) })
        },
        getAllUsers(context) {
            var id = context.state.allUsers.length > 0 ? context.state.allUsers[context.state.allUsers.length - 1].user_id : null

            axios.put(context.rootState.nodeHost + "/api/getAllUsers", { user_id: context.state.allUsers.length > 0 ? context.state.allUsers[context.state.allUsers.length - 1].user_id : null })
                .then(users => {
                    // 
                    context.commit('getAllUsers', users.data.data)
                })
        },
        getUser(context, user_id) {
            axios.put(context.rootState.nodeHost + "/api/getUser", { user_id })
                .then(user => {

                    // 
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
            axios.put(context.rootState.nodeHost + '/api/updateUserInfoFromAdmin', {
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

            axios.put(context.rootState.nodeHost + '/api/deleteUser', { user_id: user_id })
                .then(message => {
                    alert(message.data.message)
                })
        },
        loadmoreProducts(context, obj) {

            axios.put(context.rootState.nodeHost + '/api/loadmoreProducts', {
                loadmoreType: context.state.loadmore.type,
                loadmoreName: context.state.loadmore.name,
                product_id: obj.id,
                siteLanguage: context.state.siteLanguage,
                productName: obj.toolbarSearch,
                priceFrom: obj.priceFrom,
                priceTo: obj.priceTo,
                governorate: obj.governorate,
                region: obj.region,

            }).then(products => {

                context.commit('filterProducts', { products: products.data.data, pressed: '' })
            })
        }



    },


}