import axios from 'axios'
// import router from '../router'

export default {
    state: {
        allSuppliersWithSales: [],
    },

    mutations: {
        getAllSuppliersWithSales(state, suppliers) {
            state.allSuppliersWithSales = suppliers
        },

    },

    actions: {
        async getAllSuppliersWithSales(context) {
            return axios.get('http://localhost:3000/api/getAllSuppliersWithSales').then(response => {
                context.commit('getAllSuppliersWithSales', response.data.suppliers)
            })
        },
    }
}