/* eslint-disable no-unused-vars */
import axios from 'axios'
// import router from '../router'

export default {
    state: {
        cartItems: [],
        totalPrice: localStorage.getItem('totalPrice') ? localStorage.getItem('totalPrice') : '',
        cart: [],
    },

    mutations: {
        removeProductFromCart(state, item) {
            var itemIndex = state.cartItems.indexOf(item);
            console.log(itemIndex);
            state.cartItems.splice(itemIndex, 1);
        },

        getCartProducts(state, products) {
            state.cartItems = products
        },

        putTotalPriceInStore(state, total) {
            localStorage.setItem('totalPrice', total)
            state.totalPrice = localStorage.getItem('totalPrice');
        },

        cleanCart(state) {
            var cartLength = state.cartItems.length;
            state.cartItems.splice(0, cartLength)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },

        table(state, data) {
            localStorage.setItem('cartItems', JSON.stringify(data))
            state.cartItems = JSON.parse(localStorage.getItem('cartItems'))
        },

        cart(state, product) {
            state.cart.push(product)
        },
    },

    actions: {
        async removeProductFromCart(context, item) {
            await axios.put(context.rootState.nodeHost + '/api/removeProductFromCart', {
                cart_products_id: item.cart_products_id
            })
                .then(response => {
                    context.commit('removeProductFromCart', item)
                })
        },

        async getCartProducts(context) {
            await axios.put(context.rootState.nodeHost + '/api/getCartProducts', {
                user_id: context.rootState.Home.currentUser.user_id
            })
                .then((response) => {
                    context.commit('getCartProducts', response.data.products)
                    console.log('cart products ', response.data.products)
                })
        },

        async cleanCart(context) {


            context.commit('cleanCart')
            await axios.put(context.rootState.nodeHost + '/api/cleanCart', {
                user_id: context.rootState.Home.currentUser.user_id
            })
                .then(response => {


                })
        },

        addProductToCart(context, { product, color }) {
            axios.post(context.rootState.nodeHost + '/api/addProductToCart', {
                user_id: context.rootState.Home.currentUser.user_id,
                product_id: product.product_id,
                color
            })
                .then(response => {

                })
        },

        cart(context, product_id) {
            axios.post(context.rootState.nodeHost + '/api/cart', {
                product_id: product_id,
                user_id: context.rootState.Home.currentUser.user_id

            })
                .then(response => {

                })
        },
    }
}