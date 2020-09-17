import axios from 'axios'
// import router from '../router'

export default {
    state: {
        topProduct: {},
        leastProduct: {},
        notSortedDashboardOrders: [],
        myProducts: [],
    },

    mutations: {
        getTopSellingProduct(state, topProduct) {
            state.topProduct = topProduct;
        },

        getLeastSellingProduct(state, leastProduct) {
            state.leastProduct = leastProduct;
        },

        getMyProducts(state, myProducts) {
            state.myProducts = myProducts;
        },

        getMonthlySales(state, orders) {
            state.notSortedDashboardOrders = orders
        },
    },

    actions: {
        async getTopSellingProduct(context, id) {
            await axios
                .post("http://localhost:3000/api/topSellingProduct", {
                    user_id: id
                })
                .then(response => {
                    console.log(response);
                    context.commit('getTopSellingProduct', response.data.maxProduct);
                });
        },

        async getLeastSellingProduct(context, id) {
            await axios
                .post("http://localhost:3000/api/leastSellingProduct", {
                    user_id: id
                })
                .then(response => {
                    console.log(response);
                    context.commit('getLeastSellingProduct', response.data.minProduct);
                });
        },

        async getMyProducts(context, id) {
            await axios.post("http://localhost:3000/api/myProducts", {
                user_id: id
            }).then(response => {
                console.log(response)
                context.commit('getMyProducts', response.data)
            })
        },

        async getMonthlySales(context, id) {
            await axios.post('http://localhost:3000/api/monthlySales', {
                user_id: id
            }).then(response => {
                context.commit('getMonthlySales', response.data)
            })
        },
    }
}