<template>
<v-app class="grey lighten-4">
   
    <v-row  justify="center">
<v-col  cols="12" lg="4" class="mt-8">
<h1>Products placed in order</h1>
</v-col>
<!-- <product :filteredProduct="filteredProduct"></product> -->

<v-col cols="12" lg='10'>
    <v-card>
        <v-row >
    <v-col cols="12" lg="6"  >
 <v-data-table @click:row="showProducts" :headers="usersTableHeaders" :items="usersMadeOrders"  :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus'
    }">

<template v-slot:item.showProducts><v-btn small  >Show Products</v-btn> </template>

 </v-data-table>
    </v-col>
    <v-divider></v-divider>
<v-col cols="12" lg="6"  >
        <v-data-table :headers="productsTableHeaders" :items="showOrderProducts" hide-default-footer>
<!-- ================= -->
<!-- Address detailss  -->





<!-- =================== -->
        </v-data-table>
    </v-col>

        </v-row>
        <v-divider></v-divider>
        <!-- ============================ -->
<v-row justify="center">
 <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          @click="dialog=true"
        >
          Show Address Details
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Address Details</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Country" disabled v-model="country" ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field disabled label="City" v-model="city" hint="example of helper text only on focus"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                disabled
                  label="State"
                  hint="example of persistent helper text"
                  v-model="state"
                  
                
                ></v-text-field>
              </v-col>
            
              <v-col cols="12" sm="12" >
                <v-text-field disabled v-model="address1" label="Address Line-1" textarea class="mx-4" outlined ></v-text-field>
              </v-col>
               <v-col cols="12" sm="12" >
                <v-text-field disabled v-model="address2" label="Address Line-2" textarea class="mx-4" outlined ></v-text-field>
              </v-col>
              
            </v-row>
          </v-container>
       
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
         
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-row>
        <!-- ========================= -->
</v-card>
</v-col>

    </v-row>
   
</v-app>
</template>

<script>

export default {
    components:{
      
    },
    data:()=>({
        dialog:false,
usersTableHeaders:[
    {text:'User name' , value:'full_arabic_name'},
    {text:'User mobile number' , value:'mobile_number'},
         {text:'Order Number',value:'order_number'},
             {text:'Order Date',value:'order_date'},
           {text:'status',value:'status'},
            {text:'Show Products',value:'showProducts'}

     
    
    
],
productsTableHeaders:[
    {text:'Product name',value:'product_name'},
    {text:'product ID',value:'product_id'},
     {text:'product Code',value:'product_code'},
    
    {text:'Quantity',value:'quantity'},


],
state:'',
country:'',
address1:'',
address2:'',
city:''

    }),
    methods:{
   async    showProducts(event){
console.log(event)
await this.$store.commit('showOrderProducts',event.order_number)
// await this.$store.commit('showAddressDetails',event.order_number)
console.log('order addrress',this.$store.state.OrderAddressDetails)

        this.country = this.pressedOrder.country
        this.state= this.pressedOrder.state
        this.address1 = this.pressedOrder.address_line_1
        this.address2= this.pressedOrder.address_line_2
        this.city = this.pressedOrder.city
        
        },
     

    },
   async created(){
        await this.$store.dispatch('refreshCurrentUser')
console.log(this.currentUser.user_id)
this.$store.dispatch('ordersMade',this.currentUser.user_id)
console.log('user made orders',this.usersMadeOrders)
    },
    computed:{
        currentUser(){
            return this.$store.state.currentUser
        },
        ordersMade(){
            return this.$store.state.ordersMade
        },
        usersMadeOrders(){
            return this.$store.state.usersMadeOrders
        },
        showOrderProducts(){
            return this.$store.state.showOrderProducts
        },
        userOrderAddress(){
            return this.$store.state.userOrderAddress
        },
      //  OrderAddressDetails(){
      //    return this.$store.state.OrderAddressDetails
      //  },
       pressedOrder(){
         return this.$store.state.pressedOrder
       }
      
    }
}
</script>