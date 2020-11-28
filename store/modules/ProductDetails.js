import axios from 'axios'
// import router from '../router'

export default {
    state: {
        productRating: 0,
        productReview: '',
        currentProductRatings: [],
        userOrderedProductFlag: false,
        currentProduct: JSON.parse(localStorage.getItem('currentProduct')),
        dialog: false,
        productRequestDialog: false,
        productColors: []
    },

    mutations: {
        getProductReview(state, row) {

            state.productRating = row.rating;
            state.productReview = row.review;
        },

        getProductRatingsArray(state, rows) {
            state.currentProductRatings = [];
            rows.forEach(element => {
                state.currentProductRatings.push(element);
            });
        },

        checkIfUserOrdered(state, row) {
            if (row) {
                state.userOrderedProductFlag = true;
            }
            else {
                state.userOrderedProductFlag = false;
            }
        },

        setCurrentProduct(state, payload) {
            localStorage.setItem('currentProduct', JSON.stringify(payload));
            state.currentProduct = JSON.parse(localStorage.getItem('currentProduct'))

        },

        toggleDialog(state) {
            state.dialog = !state.dialog;
        },

        productToggleResponse(state) {
            state.productRequestDialog = !state.productRequestDialog;
        },

        getProductColors(state, colors) {
            state.productColors = colors
        }
    },

    actions: {
        async getProductReview(context, {
            product_id, user_id
        }) {
            await axios
                .post(context.rootState.nodeHost + "/api/getProductReview", {
                    product_id: product_id,
                    user_id: user_id,
                }).then(response => {

                    context.commit('getProductReview', response.data.review)
                })
        },

        async getProductRatingsArray(context, product_id) {
            await axios.post(context.rootState.nodeHost + '/api/getProductRatingsArray', {
                product_id
            }).then(response => {
                context.commit('getProductRatingsArray', response.data.rows)
            })
        },

        async checkIfUserOrdered(context, {
            user_id, product_id
        }) {
            await axios.post(context.rootState.nodeHost + '/api/checkIfUserOrdered', {
                product_id,
                user_id
            }).then(response => {
                if (response.data.row) {
                    context.commit('checkIfUserOrdered', response.data.row)
                }
                else {
                    context.commit('checkIfUserOrdered')
                }
            })
        },

        setCurrentProduct(context, product) {
            context.commit('setCurrentProduct', product)
        },

        toggleDialog(context) {
            context.commit('toggleDialog');
        },

        addProductReview(context, {
            user_id, product_id, rating, review
        }) {
            axios
                .post(context.rootState.nodeHost + "/api/addProductReview", {
                    user_id, product_id, rating, review
                })
                .then((response) => {
                    alert(response.data.message);
                });
        },

        calculateProductRating(context, product_id) {
            axios.post(context.rootState.nodeHost + '/api/calculateProductRating',
                { product_id })
        },

        async getProductColors(context, id) {
            await axios.post(context.rootState.nodeHost + '/api/getProductColors',
                { product_id: id }).then(response => {
                    console.log(response.data.colors)
                    context.commit('getProductColors', response.data.colors)
                })
        }

    }
}