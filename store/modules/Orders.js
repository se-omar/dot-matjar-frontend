/* eslint-disable no-unused-vars */
import axios from 'axios'
// import router from '../router'

export default {
    state: {
        showOrderProducts: [],
        pressedOrder: [],
        ordersMade: JSON.parse(localStorage.getItem('ordersMade')) ? JSON.parse(localStorage.getItem('ordersMade')) : [],
        usersMadeOrders: [],
        userOrderAddress: [],
        paymentToken: localStorage.getItem('paymentToken'),
        orders: [],
        orderProducts: [],
        productsQuantityArray: JSON.parse(localStorage.getItem('quantity')),
        orderMessage: ''
    },

    mutations: {
        showOrderProducts(state, orderNumber) {
            for (var i = 0; i < state.ordersMade.length; i++) {
                if (state.ordersMade[i].order_number == orderNumber) {
                    state.showOrderProducts = state.ordersMade[i].products
                    state.pressedOrder = state.ordersMade[i]
                }
            }
        },

        ordersMade(state, orders) {
            // var products=orders.map(e=>{return e.products})
            var userId = true
            var users = []
            var address = []
            for (var i = 0; i < orders.length; i++) {


                if (userId) {
                    users.push({
                        'full_arabic_name': orders[i] && orders[i].user ? orders[i].user.full_arabic_name : '',
                        'mobile_number': orders[i] && orders[i].user ? orders[i].user.mobile_number : '',
                        'order_number': orders[i] ? orders[i].order_number : '',
                        'order_date': orders[i] ? orders[i].order_date : '',
                        'status': orders[i] ? orders[i].status : '',
                        'order_id': orders[i] ? orders[i].order_i : ''
                    })
                }
            }

            localStorage.setItem('ordersMade', JSON.stringify(orders))
            state.ordersMade = JSON.parse(localStorage.getItem('ordersMade'))
            state.usersMadeOrders = users

            for (var x = 0; x < orders.length; x++) {
                address.push({
                    'country': orders[x].country,
                    'city': orders[x].city,
                    'state': orders[x].state,
                    'address_line_1': orders[x].address_line_1,
                    'address_line_2': orders[x].address_line_2
                })
            }
            state.userOrderAddress = address
        },

        setPaymentToken(state, token) {
            localStorage.setItem('paymentToken', token);
            state.paymentToken = localStorage.getItem('paymentToken');
        },

        getOrders(state, order) {

            state.orders = order

        },

        getOrderProducts(state, response) {
            var products = response.map(e => {
                e.product.pending_status = e.status
                e.product.quantity = e.quantity
                e.product.product_color = e.product_color
                return e.product
            })
            state.orderProducts = products

        },

        putQuantityInStore(state, quantity) {
            localStorage.setItem('quantity', JSON.stringify(quantity))
            state.productsQuantityArray = JSON.parse(localStorage.getItem('quantity'))
        },
        createOrder(state, message) {
            state.orderMessage = message
        }
    },

    actions: {
        async createOrder(context, { governorate, region, address }) {
            await axios.post(context.rootState.nodeHost + '/api/createOrder', {
                user_id: context.rootState.Home.currentUser.user_id
                , governorate: governorate,
                region: region,
                address: address,
            })
                .then(res => {
                    context.commit('createOrder', res.data.message)
                })
        },

        completedata(context, {
            national_number,
            gender,
            full_arabic_name,
            full_english_name,
            birthdate,
            qualifications,
            job,
            governorate,
            village,
            center,
            phone_number,
            mobile_number,
            fax,
            facebook_account,
            linkedin,
            website,
            address,
            email
        }) {

            axios.put(context.rootState.nodeHost + '/api/completedata', {
                national_number,
                gender,
                full_arabic_name,
                full_english_name,
                birthdate,
                qualifications,
                job,
                governorate,
                village,
                center,
                phone_number,
                mobile_number,
                fax,
                facebook_account,
                linkedin,
                website,
                address,
                email
            })
                .then(response => {
                    alert(response.data.message)

                })
                .catch(err => {

                })
        },

        updateProductStatus(context, { status, orderId, productId }) {

            axios.put(context.rootState.nodeHost + '/api/updateProductStatus', { status: status, orderId: orderId, productId: productId })
                .then(response => {

                })
        },

        ordersMade(context, id) {
            axios.put(context.rootState.nodeHost + '/api/supplierProductsInOrder', { user_id: id })
                .then(orders => {


                    context.commit('ordersMade', orders.data.data)
                })
        },

        async getOrders(context) {

            await axios.put(context.rootState.nodeHost + '/api/getUserOrders', {
                user_id: context.rootState.Home.currentUser.user_id
            })
                .then(orders => {

                    context.commit('getOrders', orders.data.data)
                })
        },

        getOrderProducts(context, id) {
            axios.put(context.rootState.nodeHost + '/api/getOrderProducts', {
                order_id: id
            })
                .then(response => {

                    context.commit('getOrderProducts', response.data)
                })
        },

    }
}