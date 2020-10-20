import axios from 'axios'
// import router from '../router'

export default {
    state: {
        table: JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : [],
        totalPrice: localStorage.getItem('totalPrice') ? localStorage.getItem('totalPrice') : '',
        cart: [],
    },

    mutations: {
        removeProductFromCart(state, id) {
            console.log(state.table)
            for (var i = 0; i < state.table.length; i++) {
                if (state.table[i].product_id == id) {
                    state.table.splice(i, 1)
                    localStorage.setItem('cartItems', JSON.stringify(state.table))
                    console.log('splice is:', state.table)
                }
            }
        },

        localStorage(state, products) {
            localStorage.setItem('cartItems', JSON.stringify(products))
            state.table = JSON.parse(localStorage.getItem('cartItems'))
        },

        putTotalPriceInStore(state, total) {
            localStorage.setItem('totalPrice', total)
            state.totalPrice = localStorage.getItem('totalPrice');
        },

        cleanCart(state) {
            var cartLength = state.table.length;
            state.table.splice(0, cartLength)
            localStorage.setItem('cartItems', JSON.stringify(state.table))
        },

        table(state, data) {
            localStorage.setItem('cartItems', JSON.stringify(data))
            state.table = JSON.parse(localStorage.getItem('cartItems'))
        },

        cart(state, product) {
            state.cart.push(product)
        },
    },

    actions: {
        async removeProductFromCart(context, id) {
            await axios.put('http://localhost:3000/api/remove', {
                product_id: id
            })
                .then(response => {
                    console.log(response.data)
                    context.commit('removeProductFromCart', id)
                })
        },

        async localStorage(context) {
            await axios.put('http://localhost:3000/api/getProducts', {
                user_id: context.rootState.Home.currentUser.user_id
            })
                .then((response) => {
                    context.commit('localStorage', response.data.data)
                })
        },

        async cleanCart(context) {
            debugger
            console.log('entered clean cart')
            context.commit('cleanCart')
            await axios.put('http://localhost:3000/api/cleanCart', {
                user_id: context.rootState.Home.currentUser.user_id
            })
                .then(response => {
                    debugger
                    console.log('clean cart message', response.data.message)
                })
        },

        table(context, product) {
            axios.post('http://localhost:3000/api/table', {
                user_id: context.rootState.Home.currentUser.user_id,
                product_id: product.product_id
            })
                .then(response => {
                    console.log(response.data.message)
                })
        },

        cart(context, product_id) {
            axios.post('http://localhost:3000/api/cart', {
                product_id: product_id,
                user_id: context.rootState.Home.currentUser.user_id

            })
                .then(response => {
                    console.log(response.data)
                })
        },

    }
}