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
                        'full_arabic_name': orders[i].user.full_arabic_name,
                        'mobile_number': orders[i].user.mobile_number,
                        'order_number': orders[i].order_number,
                        'order_date': orders[i].order_date,
                        'status': orders[i].status,
                        'order_id': orders[i].order_id
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
            console.log('orer si', order)
            state.orders = order
            console.log('state order', state.order)
        },

        getOrderProducts(state, response) {
            var products = response.map(e => {
                e.product.pending_status = e.status
                e.product.quantity = e.quantity
                return e.product
            })
            state.orderProducts = products
            console.log('commit products', state.orderProducts)
        },

        putQuantityInStore(state, quantity) {
            localStorage.setItem('quantity', JSON.stringify(quantity))
            state.productsQuantityArray = JSON.parse(localStorage.getItem('quantity'))
        },
    },

    actions: {
        createOrder(context, { governorate, region, address }) {

            axios.post('http://localhost:3000/api/createOrder', {
                user_id: context.rootState.Home.currentUser.user_id
                , governorate: governorate,
                region: region,
                address: address,
                cartItems: context.rootState.Cart.table,
                totalPrice: context.rootState.Cart.totalPrice,

            })
                .then(res => {
                    console.log(res.data.data)
                    console.log('order crreatedd', res.data.message)
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

            axios.put('http://localhost:3000/api/completedata', {
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
                    console.log(response.data.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        updateProductStatus(context, { status, orderId, productId }) {
            console.log('testing befor sending to database', status, orderId, productId)
            axios.put('http://localhost:3000/api/updateProductStatus', { status: status, orderId: orderId, productId: productId })
                .then(response => {
                    console.log(response.data.message)
                })
        },

        ordersMade(context, id) {
            axios.put('http://localhost:3000/api/supplierProductsInOrder', { user_id: id })
                .then(orders => {
                    console.log('ordersss', orders.data.data)

                    context.commit('ordersMade', orders.data.data)
                })
        },

        async getOrders(context) {
            console.log('user id iss', context.rootState.Home.currentUser.user_id)
            await axios.put('http://localhost:3000/api/getUserOrders', {
                user_id: context.rootState.Home.currentUser.user_id
            })
                .then(orders => {
                    console.log('database responde', orders.data.data)
                    context.commit('getOrders', orders.data.data)
                })
        },

        getOrderProducts(context, id) {
            axios.put('http://localhost:3000/api/getOrderProducts', {
                order_id: id
            })
                .then(response => {
                    console.log('get products from data base', response.data)
                    context.commit('getOrderProducts', response.data)
                })
        },

    }
}