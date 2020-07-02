import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"

Vue.use(Vuex,axios);

const store = new Vuex.Store({

state:{

},
actions:{
  register (commit,{email,password,firstname,lastname}){
var full_arabic_name = firstname+" "+lastname;
   axios.post('http://localhost:3000/api/signup',{email,password ,full_arabic_name})
.then((data,status)=>{
  if(status===201) console.log("Account Created")
  
})

.catch(error=>{
  console.log(error)
}) 
    

  }
  
},
mutations:{

}


















// state:{
//   posts:[]
// },
// actions:{
// // loadPosts({commit}){
// //   axios
// //   .get('http://localhost:3000/api/users')
// //   .then(data=>{
// //     console.log(data.data) 
// //     let posts=data.data;
// //     commit('setposts',posts)
// //   })
// //   .catch(error=>{
// //     console.log(error)
// //   }
    
// //     )

// },
// signup(){
//   axios.post('http://localhost:3000/api/signup',{
//   email:"madad619899",
//   password:"abcdefgggh"
  
// }
//   )
//   .then(data=>{
//     console.log(data)
//   })
// }
// // axios.post('lcoalhost', 
// // )
// },
// mutations:{
// setposts:(state,posts)=>{
// state.posts=posts
// }
// }

































//     state:{
//         products:[{
//             id:1,
//             name:'BMW',
//             price:10

//           },
//           {
//             id:2,
//             name:"Lanos",
//             price:20
//           },
//           {
//             id:3,
//             name:"Fiat",
//             price:30
//           }
//           ]
     
//     },
//     getters:{
//       saleProducts:state=>{
//         var saleProducts= state.products.map(product=>{
//           return{
//             id:product.id,
//             name:"*"+product.name+"*",
//             price:product.price / 2
//           }
//         })
//         return saleProducts
//       }
//     },
//     mutations:{
//       reducePrice:(state,reduce)=>{
//         return state.products.forEach(product=>{
//           product.price -= reduce
//         })
//       }
//     },
//     actions:{
//       reducePrice:(context,reduce)=>{
//         setTimeout(function(){
// context.commit('reducePrice',reduce)
//         },3000)
//       }
//     }
  });

  export default    store;