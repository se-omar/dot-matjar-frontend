import axios from 'axios'
// import router from '../router'

export default {
    state: {
        allSuppliersWithSales: [],
        allCompanies : [],
        defaultCompany : []
    },

    mutations: {
        getAllSuppliersWithSales(state, suppliers) {
            state.allSuppliersWithSales = suppliers
        },
    getAllCompanies(state,companies){
        state.allCompanies = companies
    },
    getDefaultCompany(state,company){
        state.defaultCompany = company
    }

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
        },
       async  getAllCompanies(context){
           await  axios.get(context.rootState.nodeHost + '/api/getAllShippingCompanies')
            .then(companies =>{
                console.log(companies.data.data)
                context.commit('getAllCompanies',companies.data.data)
            })
        },
        async getDefaultCompany(context){
await axios.put(context.rootState.nodeHost + '/api/getDefaultCompany')
.then(company =>{
    context.commit('getDefaultCompany',company.data.data)
    console.log('company found ' , company.data.data)
})
        },
        updateShippingCompany(context , wh ){
            axios.put('updateShippingCompany' , {
              country : wh.country,
                shipping_rate :wh.shipping_rate ,
               governorate: wh.governorate ,
               amount: wh.amount ,
               collection_rate: wh.collection_rate,
               shipping_companies_id : wh.shipping_companies_id
            })
        }
    }
}