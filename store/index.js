import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"

Vue.use(Vuex,axios);

export default new Vuex.Store({

  state: {
    row: {},
    productRow: ''
  },

mutations: {
  addRowData(state, payload) {
    state.row = payload;
  },

  getProductRow(state, row) {
    state.productRow = row;
  }
},

actions:{
  register (commit,{email,password,full_arabic_name,national_number}){


   axios.post('http://localhost:3000/api/signup',{email,password ,full_arabic_name,national_number})
.then((data,status)=>{
  if(status===201) console.log("Account Created")
  
})
.catch(error=>{
  console.log(error)
}) 
},

getProductRow(context) {
  axios.get('http://localhost:3000/api/products').then(response => {
    context.commit('getProductRow', response.data[1])
    console.log(response.data[1].product_name);
  })
}
  
}
});

