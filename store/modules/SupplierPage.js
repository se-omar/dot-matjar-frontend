import axios from 'axios'
// import router from '../router'

export default {
    state: {
        supplierPageInfo: [],
        supplierProducts: JSON.parse(localStorage.getItem('supplierProducts')),
        supplierRating: 0,
        supplierReview: '',
        currentSupplierRatings: [],
        supplier: {},
        pendingSuppliers: [],
        supplierProductsSave: []
    },

    mutations: {
        updateSupplierPage(state, pageData) {
            state.supplierPageInfo = pageData
        },

        getSupplierPageData(state, info) {
            state.supplierPageInfo = info
        },

        getSupplier(state, supplier) {
            state.supplier = supplier
        },



        getSupplierProducts(state, supplierProducts) {
            localStorage.setItem('supplierProducts', JSON.stringify(supplierProducts))
            state.supplierProducts = JSON.parse(localStorage.getItem('supplierProducts'));
            state.supplierProductsSave = state.supplierProducts
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

        }
    },

    actions: {
        async addSupplierReview(context, {
            supplier_id,
            user_id,
            rating,
            review,
        }) {
            await axios.post('http://localhost:3000/api/addSupplierReview', {
                supplier_id,
                user_id,
                rating,
                review,
            }).then(response => {
                console.log('add supplier review response', response.data)
                alert(response.data.message)
            })
        },

        async getSupplier(context, id) {
            await axios.put('http://localhost:3000/api/getSupplier', { user_id: id })
                .then(supplier => {
                    context.commit('getSupplier', supplier.data.data)
                    context.commit('changeSiteColor', supplier.data.data)
                })
        },

        getSupplierPageData(context, id) {
            axios.put('http://localhost:3000/api/getSupplierPageData', { supplier_id: id })
                .then(info => {
                    context.commit('getSupplierPageData', info.data.data)
                })
        },

        async getSupplierProducts(context, id) {
            console.log('the id is', id);
            await axios.put("http://localhost:3000/api/supplierProducts", {
                user_id: id
            }).then(response => {
                console.log('Products is here', response)
                context.commit('getSupplierProducts', response.data.data)
            })
        },

        async getSupplierReview(context, {
            supplier_id, user_id
        }) {
            await axios
                .post("http://localhost:3000/api/getSupplierReview", {
                    supplier_id: supplier_id,
                    user_id: user_id,
                }).then(response => {
                    context.commit('getSupplierReview', response.data.review)
                })
        },

        async getSupplierRatingsArray(context, supplier_id) {
            await axios.post('http://localhost:3000/api/getSupplierRatingsArray', {
                supplier_id
            }).then(response => {
                context.commit('getSupplierRatingsArray', response.data.rows)
            })
        },

        updateSupplierPage(context, formdata) {
            axios.post('http://localhost:3000/api/updateSupplierPage', formdata)
                .then(response => {
                    console.log(response.data.message, response.data.data)
                    context.commit('updateSupplierPage', response.data.data)

                })
        },

        supplierPageColor(context, color) {
            axios.put('http://localhost:3000/api/supplierPageColor', {
                page_color: color,
                user_id: context.state.supplier.user_id
            })

                .then(response => {
                    console.log(response.data.message)
                    console.log(response.data.data)
                    context.commit('supplierPageColor', response.data.data)
                })
        },

        calculateSupplierRating(context, supplier_id) {
            axios.post('http://localhost:3000/api/calculateSupplierRating', {
                supplier_id
            }).then(response => {
                console.log(response.message)
            })
        },
        getPendingSuppliers(context) {
            axios.put('http://localhost:3000/api/getPendingSuppliers')
                .then(suppliers => {
                    console.log(suppliers.data.message)
                    console.log(suppliers.data.data)
                    context.commit('getPendingSuppliers', suppliers.data.data)
                })
        },
        acceptSupplierRequest(context, user_id) {
            axios.put('http://localhost:3000/api/acceptSupplierRequest', { user_id: user_id })
                .then(message => {
                    alert(message.data.message)
                })
        },
        filterSupplierProducts(context, { productsSearch, user_id }) {

            axios.put('http://localhost:3000/api/filterSupplierProducts', { productsSearch, user_id })
                .then(products => {
                    console.log(products.data.data)
                    console.log(products.data.message)
                    context.commit('filterSupplierProducts', products.data.data)
                })
        },
        filterProductsWithCategory(context, { categoryName, user_id }) {
            console.log('testing', categoryName, user_id)
            axios.put('http://localhost:3000/api/filterSupplierProducts', { categoryName, user_id })
                .then(products => {
                    context.commit('filterProductsWithCategory', products.data.data)
                })
        },
        filterProductsWithItem(context, { user_id, itemName }) {
            axios.put('http://localhost:3000/api/filterSupplierProducts', { user_id, itemName })
                .then(products => {
                    console.log('testing products items', products.data.data)
                    context.commit('filterProductsWithItem', products.data.data)
                })
        }
    }
}