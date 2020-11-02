/* eslint-disable no-unused-vars */
import axios from 'axios'
// import router from '../router'

export default {
    state: {
        supplierPageInfo: {},
        supplierProducts: [],
        supplierRating: 0,
        supplierReview: '',
        currentSupplierRatings: [],
        supplier: {},
        pendingSuppliers: [],
        supplierProductsSave: [],
        testVar: 0,
        supplierItems: [],
        supplierCategories: [],
        supplierCategoriesAndItems: []
    },

    mutations: {
        updateSupplierPage(state, pageData) {
            state.supplierPageInfo = pageData
        },



        getSupplierPageData(state, info) {
            state.supplierPageInfo = info
            state.testVar = 5;


        },



        getSupplier(state, supplier) {
            state.supplier = supplier
        },

        emptySupplierProducts(state) {
            state.supplierProducts = [];
        },

        getSupplierProducts(state, supplierProducts) {
            state.supplierProducts = []
            var currencies = JSON.parse(localStorage.getItem('rates'))
            var currentCurrency = localStorage.getItem('currentCurrency')

            supplierProducts.forEach(element => {
                if (element.currency !== currentCurrency) {
                    if (currencies.EGP) {
                        var egp = currencies.EGP;
                        if (element.currency == 'egp') {
                            element.unit_price = Math.trunc(element.unit_price / egp)
                        }
                        else if (element.currency == 'usd') {
                            element.unit_price = Math.trunc(element.unit_price * egp)
                        }

                    }

                }
            });

            state.supplierProducts.push(...supplierProducts)
            state.supplierProductsSave.push(...supplierProducts)
        },

        getSupplierReview(state, row) {
            state.supplierRating = row.rating;
            state.supplierReview = row.review;
        },

        getSupplierRatingsArray(state, rows) {
            state.currentSupplierRatings = [];
            rows.forEach(element => {
                state.currentSupplierRatings.push(element);
            });
        },

        supplierPage(state, supplier) {
            localStorage.setItem('supplier', JSON.stringify(supplier))
            state.supplier = JSON.parse(localStorage.getItem('supplier'))
        },

        emptySupplierLocation(state) {
            state.suppliers = state.allSuppliers;
        },

        removeSupplierPageData(state) {
            state.supplierPageInfo = []
        },
        getPendingSuppliers(state, suppliers) {
            state.pendingSuppliers = suppliers
        },
        filterSupplierProducts(state, products) {
            state.supplierProducts = products
        },
        returnAllProducts(state) {
            state.supplierProducts = state.supplierProductsSave
        },
        filterProductsWithCategory(state, products) {
            state.supplierProducts = products
        },
        filterProductsWithItem(state, products) {
            state.supplierProducts = products

        },
        // getSupplierItems(state, items) {
        //     state.supplierItems = items.map(e => {
        //         return e.item_name
        //     })
        //     

        // },
        getSupplierCategoriesAndItems(state, { data }) {
            state.supplierCategories = []
            var siteLanguage = localStorage.getItem('language')

            if (siteLanguage == 'en') {
                state.supplierItems = data.map(e => {
                    return e.category_item.category_items
                })
            }
            else {
                state.supplierItems = data.map(e => {
                    return e.category_item.category_items_arabic_name
                })
            }

            state.supplierCategoriesAndItems = data;
            for (var i = 0; i < data.length; i++) {
                var check = false;
                if (siteLanguage == 'en') {

                    if (state.supplierCategories.length > 0) {
                        for (var j = 0; j < state.supplierCategories.length; j++) {

                            if (state.supplierCategories[j] == data[i].product_category.category_name) {
                                check = true
                            }
                        }
                    }
                    else if (state.supplierCategories.length == 0) {
                        state.supplierCategories.push(data[i].product_category.category_name)
                        check = true;

                    }
                    if (check == false) {
                        state.supplierCategories.push(data[i].product_category.category_name)
                    }

                }
                else {

                    if (state.supplierCategories.length > 0) {
                        for (var x = 0; x < state.supplierCategories.length; x++) {

                            if (state.supplierCategories[x] == data[i].product_category.category_arabic_name) {
                                check = true
                            }
                        }
                    }
                    else if (state.supplierCategories.length == 0) {
                        state.supplierCategories.push(data[i].product_category.category_arabic_name)
                        check = true;

                    }
                    if (check == false) {
                        state.supplierCategories.push(data[i].product_category.category_arabic_name)
                    }
                }


            }

        }
    },

    actions: {
        async addSupplierReview(context, {
            supplier_id,
            user_id,
            rating,
            review,
        }) {
            await axios.post(context.rootState.nodeHost + '/api/addSupplierReview', {
                supplier_id,
                user_id,
                rating,
                review,
            }).then(response => {

                alert(response.data.message)
            })
        },

        async getSupplier(context, id) {
            await axios.put(context.rootState.nodeHost + '/api/getSupplier', { user_id: id })
                .then(supplier => {
                    context.commit('getSupplier', supplier.data.data)
                    context.commit('changeSiteColor', supplier.data.data)
                })
        },

        async getSupplierPageData(context, id) {
            await axios.put(context.rootState.nodeHost + '/api/getSupplierPageData', { supplier_id: id })
                .then(info => {

                    context.commit('getSupplierPageData', info.data.data)
                    context.commit('updateSupplierPageColors', info.data.data)
                })
        },



        async getSupplierProducts(context, id) {

            await axios.put(context.rootState.nodeHost + "/api/supplierProducts", {
                user_id: id
            }).then(response => {

                context.commit('getSupplierProducts', response.data.data)
            })
        },

        async getSupplierReview(context, {
            supplier_id, user_id
        }) {
            await axios
                .post(context.rootState.nodeHost + "/api/getSupplierReview", {
                    supplier_id: supplier_id,
                    user_id: user_id,
                }).then(response => {
                    context.commit('getSupplierReview', response.data.review)
                })
        },

        async getSupplierRatingsArray(context, supplier_id) {
            await axios.post(context.rootState.nodeHost + '/api/getSupplierRatingsArray', {
                supplier_id
            }).then(response => {
                context.commit('getSupplierRatingsArray', response.data.rows)
            })
        },

        updateSupplierPage(context, formdata) {
            axios.post(context.rootState.nodeHost + '/api/updateSupplierPage', formdata)
                .then(response => {

                    context.commit('updateSupplierPage', response.data.data)

                })
        },



        supplierPageColor(context, color) {
            axios.put(context.rootState.nodeHost + '/api/supplierPageColor', {
                page_color: color,
                user_id: context.state.supplier.user_id
            })

                .then(response => {


                    context.commit('supplierPageColor', response.data.data)
                })
        },

        calculateSupplierRating(context, supplier_id) {
            axios.post(context.rootState.nodeHost + '/api/calculateSupplierRating', {
                supplier_id
            }).then(response => {

            })
        },
        getPendingSuppliers(context) {
            axios.put(context.rootState.nodeHost + '/api/getPendingSuppliers')
                .then(suppliers => {


                    context.commit('getPendingSuppliers', suppliers.data.data)
                })
        },
        acceptSupplierRequest(context, user_id) {
            axios.put(context.rootState.nodeHost + '/api/acceptSupplierRequest', { user_id: user_id })
                .then(message => {
                    alert(message.data.message)
                })
        },
        filterSupplierProducts(context, { productsSearch, user_id }) {

            axios.put(context.rootState.nodeHost + '/api/filterSupplierProducts', { productsSearch, user_id })
                .then(products => {


                    context.commit('filterSupplierProducts', products.data.data)
                })
        },
        filterProductsWithCategory(context, { categoryName, user_id, siteLanguage }) {

            axios.put(context.rootState.nodeHost + '/api/filterSupplierProducts', { categoryName, user_id, siteLanguage })
                .then(products => {
                    context.commit('filterProductsWithCategory', products.data.data)
                })
        },
        filterProductsWithItem(context, { user_id, itemName, siteLanguage }) {
            axios.put(context.rootState.nodeHost + '/api/filterSupplierProducts', { user_id, itemName, siteLanguage })
                .then(products => {

                    context.commit('filterProductsWithItem', products.data.data)
                })
        },

        async uploadCarouselImages(context, form) {

            await axios.post(context.rootState.nodeHost + '/api/uploadCarouselImages', form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(response => {

                })
        },



        async uploadBannerImages(context, form) {
            await axios.post(context.rootState.nodeHost + '/api/uploadBannerImages', form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(response => {

                })
        },


        async removeCarouselImage(context, { id, imgName }) {
            await axios.post(context.rootState.nodeHost + '/api/removeCarouselImage', {
                id, imgName
            }).then(response => {

            })
        },




        async removeBannerImage(context, { id, imgName }) {
            await axios.post(context.rootState.nodeHost + '/api/removeBannerImage', {
                id, imgName
            }).then(response => {

            })
        },

        addCategoryAndItemsToSupplier(context, { supplierItems, user_id, siteLanguage }) {
            axios.post(context.rootState.nodeHost + '/api/addCategoryAndItemsToSupplier', { supplierItems: supplierItems, user_id: user_id, siteLanguage: siteLanguage })
                .then(message => {

                })
        },
        // async getSupplierItems(context, user_id) {
        //     
        //     await axios.put(context.rootState.nodeHost+'/api/getSupplierItems', user_id)
        //         .then(items => {

        //             context.commit('getSupplierItems', items.data.data)
        //         })
        // },
        async getSupplierCategoriesAndItems(context, user_id) {

            await axios.put(context.rootState.nodeHost + '/api/getSupplierCategoriesAndItems', { user_id: user_id })
                .then(data => {

                    context.commit('getSupplierCategoriesAndItems', { data: data.data.data })
                })
        },
        //stpedd hereeeeeeeeee
        rejectSupplierRequest(context, user_id) {

            axios.put('rejectSupplierRequest', user_id)
                .then(message => {
                    alert(message.data.message)
                })
        }

    }
}