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
        },

        async adminPageAddCategory(context, { parentCat, catName, catArName }) {
            await axios.post(context.rootState.nodeHost + '/api/adminPageAddCategory',
                {
                    parentCatId: parentCat ? parentCat.id : 64,
                    category_name: catName,
                    category_arabic_name: catArName
                }).then(response => {
                    console.log('addmin page add product', response)
                })
        },

        removeCategory(context, parentId) {
            axios.post(context.rootState.nodeHost + '/api/removeCategory', { parentId })
                .then(response => {
                    alert(response.data)
                })
        }
    }
}