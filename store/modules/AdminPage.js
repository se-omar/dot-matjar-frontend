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

        async removeCategory(context, parentId) {
         await   axios.post(context.rootState.nodeHost + '/api/removeCategory', { parentId })
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
      async  updateShippingCompany(context , wh ){
            // axios.put('updateShippingCompany' , {
            //   country : wh.country,
            //     shipping_rate :wh.shipping_rate ,
            //    governorate: wh.governorate ,
            //    amount: wh.amount ,
            //    collection_rate: wh.collection_rate,
            //    shipping_companies_id : wh.shipping_companies_id
            // })
           await axios.put(context.rootState.nodeHost + '/api/updateShippingCompany' , {
                company_name : wh.companyName,
                company_number : wh.companyNumber ,
                 company_address1 : wh.companyAddress1 ,
                 company_address2 : wh.companyAddress2 , 
                 company_address3 : wh.companyAddress3,
                 shipping_companies_id : wh.shipping_companies_id
             }).then(res=>{
alert(res.data.message)
             })
        },
       async  updateCollectionTable(context,{collection_rate , amount , collection_id}){
            axios.put(context.rootState.nodeHost + '/api/updateShippingCompany' , {collection_rate , amount , collection_id})
            .then(res=>{
                alert(res.data.message)
            })
        },
        async updateShippingTable(context , wh){
            axios.put(context.rootState.nodeHost + '/api/updateShippingCompany' , {
                country : wh.country,
                region:wh.region,
                 shipping_rate :wh.shipping_rate ,
            governorate: wh.governorate ,
            rate_id : wh.rate_id
        }).then(res=>{
            alert(res.data.message)
        })
    },
    async removeCompany(context , shipping_companies_id){
        console.log(shipping_companies_id)
axios.put(context.rootState.nodeHost + '/api/deleteShippingCompany' ,{shipping_companies_id:shipping_companies_id})
.then(res=>{
    alert(res.data.message)
})
    },
    async addNewCompany(context,wh){
      await   axios.post(context.rootState.nodeHost + '/api/addNewShippingCompany' , { 
          
               shippingTable:wh.shippingTable,
               collectionTable : wh.collectionTable,
               company_name : wh.company_name,
               company_number : wh.company_number ,
                company_address1 : wh.company_address1 ,
                company_address2 : wh.company_address2 , 
                company_address3 : wh.company_address3,
              
        }).then(res=>{
            alert(res.data.message)
        })
    },
    async makeDefaultCompany(context , id){
      await  axios.put(context.rootState.nodeHost + '/api/updateDefaultShippingCompany',{shipping_companies_id :id})
       .then(res=>{
           alert(res.data.message)
       })
    },
    async addNewShippingRatesToCompany(context , {shippingTable,shipping_companies_id}){
        console.log(shippingTable , shipping_companies_id)
      await  axios.post(context.rootState.nodeHost +'/api/addOrRemoveShipingRate',{shippingTable,shipping_companies_id})
        .then(message=>{
        alert(message.data.message)
        })
    },
    async addNewCollectionRatesToCompany(context,{collectionTable,shipping_companies_id}){
       await axios.post(context.rootState.nodeHost+'/api/addOrRemoveCollectionRate',{collectionTable,shipping_companies_id})
        .then(message=>{
            alert(message.data.message)
        })
    }
    }
}