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
        orderMessage: '',
        billOrderData:[],
        billOrderProducts : []
    },

    mutations: {
        showOrderProducts(state, orderNumber) {
            for (var i = 0; i < state.ordersMade.length; i++) {
                if (state.ordersMade[i].order_number == orderNumber) {
                    state.showOrderProducts = state.ordersMade[i].products_orders
                    console.log(state.showOrderProducts)
                    state.pressedOrder = state.ordersMade[i]
                }
            }
        },

        ordersMade(state, revOrders) {
            // var products=orders.map(e=>{return e.products})
            var userId = true
            var users = []
            var address = []
           
            var orders = revOrders.reverse();
            for (var i = 0; i < orders.length; i++) {


                if (userId) {
                    users.push({
                        'full_arabic_name': orders[i] && orders[i].user ? orders[i].user.full_arabic_name : '',
                        'mobile_number': orders[i] && orders[i].user ? orders[i].user.mobile_number : '',
                        'order_number': orders[i] ? orders[i].order_number : '',
                        'order_date': orders[i] ? orders[i].order_date : '',
                        'status': orders[i] ? orders[i].status : '',
                        'order_id': orders[i] ? orders[i].order_id : ''
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
        },
        getOrder(state,{order,productsInOrder}){
           
            state.billOrderData = order 
            state.billOrderProducts = productsInOrder
        }
    },

    actions: {
        async createOrder(context, { governorate, region, address }) {
            console.log('price',context.rootState.Cart.totalPrice)
            await axios.post(context.rootState.nodeHost + '/api/createOrder', {
                user_id: context.rootState.Home.currentUser.user_id
                , governorate: governorate,
                region: region,
                address: address,
                total_price : context.rootState.Cart.totalPrice
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

        updateProductStatus(context, { status, orderId, productId, productColor }) {

            axios.put(context.rootState.nodeHost + '/api/updateProductStatus',
                { status, orderId, productId, productColor })
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
 getOrder(context,{order_id}){
    console.log('order_iddddd' , order_id)
     axios.put(context.rootState.nodeHost  + "/api/getOrder" , {order_id , user_id : context.rootState.Home.currentUser.user_id})
    .then(order =>{
        context.commit('getOrder' ,{ order:order.data.order , productsInOrder:order.data.productsInOrder})
    })
}
    }
}