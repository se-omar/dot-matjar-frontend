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
            return axios.get(context.rootState.nodeHost + '/api/getAllSuppliersWithSales').then(response => {
                context.commit('getAllSuppliersWithSales', response.data.suppliers)
            })
        },

        async addNewUser(context, form) {
            await axios.post(context.rootState.nodeHost + '/api/addNewUser', form).then(response => {
                alert(response.data.message)
            })
        }
    }
}