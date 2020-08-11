<template>
      <nav>
     <v-row justify="center">
<v-card  height="70" width="100%" flat title>
  <v-toolbar extended class="red darken-4"  extension-height="5">
<!-- ================ -->





  <!-- ========== -->
 <v-row justify="end" class="mr-5">
    <v-btn
      color="red lighten-1"
      dark
      @click.stop="dialog = true"
      @click="table"
      v-if="currentUser "
      large
    >
     <i class="fa fa-shopping-cart" aria-hidden="true"></i>
    </v-btn>
    </v-row>
    <!-- ==================== -->





    <!-- =============== -->
  </v-toolbar>

  

   <v-row>
        <v-col cols="12" sm="6" md="6" lg="12" >

    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
    
    
      <v-data-table hide-default-footer  @click:row="rowclicked"   bordered hover :items="items"   :headers="headers">
      <template  v-slot:item.quantity="{ item }">
        <v-row>
          <v-col cols="3" >
            <v-btn x-small @click="increment(item.product_id)">+</v-btn>

          </v-col>
          <v-col cols="2">
           <h4>{{item.quantity}}</h4>

          </v-col>
          <v-col cols="3">
            <v-btn x-small @click="decrement(item.product_id)">-</v-btn>

          </v-col>
        </v-row>
      </template>
      <template v-slot:item.remove="{ item }">
        <v-btn depressed small  color="error" @click="remove(item.product_id)">X</v-btn>
      </template>
<!-- =============== -->


<!-- =================== -->
      </v-data-table>
        

<v-card>

      <v-row>
       
     
<v-col cols="4">
           <v-btn @click="clean"  v-if="cart.length > 0"  depressed small color="error" >Clean</v-btn>

</v-col>
 <v-col cols="6">
       
         <h2>$ Total:  {{ total }}.00 </h2>

      </v-col>
     </v-row>

     <v-row justify="center">
        <v-col lg="1" sm="1" cols="1">
      <v-btn dark large @click="$router.push('/completeData')">Checkout</v-btn>
     </v-col>
       <v-col lg="6" sm="6" cols="6">
          <h2>:Proceed to</h2>
       </v-col>
    
     </v-row>

</v-card>
   
    </v-dialog>
   </v-col>
     </v-row> 

</v-card>
  </v-row>
      </nav>
</template>


<script>
import { loadStripe } from "@stripe/stripe-js";

export default {
  name: "cartTable",
  methods: {
    showProduct() {
      console.log(this.pressedProduct);
    },
    add(product) {
      this.products[product.id - 1].cart = true;
      this.cart.push(product);
      this.counter++;
    },
    clean() {
      this.cart = [];
      for (const key in this.product) {
        this.products[key].cart = false;
        this.products[key].quantaty = 1;
      }
      for (var i = 0; i < this.products.length; i++) {
        this.products[i].cart = false;
      }
    },
    remove(id) {
      for (var x = 0; x < this.items.length; x++) {
        if (this.items[x].product_id == id) {
          this.items.splice(x, 1);
          console.log(this.items);

          this.$store.dispatch("remove", id);
        }
      }
    },

    increment(id) {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].product_id == id) {
          this.items[i].quantity++;
        }
      }
    },
    decrement(id) {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].product_id == id) {
          if (this.items[i].quantity < 1) {
            this.items[i].quantity = 0;
          } else {
            this.items[i].quantity--;
          }
        }
      }
    },
    numbers() {
      return this.cart.length + 1;
    },

    rowclicked(event) {
      console.log("event is :", event);
    },
    table() {
      var self = this;
      this.$store.dispatch("localStorage");
      setTimeout(function() {
        console.log(self.$store.state.table);
        self.items = [];
        for (var i = 0; i < self.$store.state.table.length; i++) {
          self.items.push(self.$store.state.table[i]);
          console.log("store i :", self.$store.state.table[i]);
        }
      }, 100);
    },

    getSession() {
      var quantityArray = [];
      this.items.forEach(element => {
        quantityArray.push(element.quantity);
      });
      loadStripe(
        "pk_test_51H97oICdSDXTIUwz70svxkIu08QM3jR0rB6E2njyq3fC7tLOODIipB8ppdjdPt32pteM8zHqsSF2mAo9Oyfw9Mvf00L3omXjql"
      ).then(stripe => {
        console.log(stripe);
        var sessionId = "";

        this.$axios
          .post("http://localhost:3000/api/checkout", {
            user_id: this.currentUser.user_id,
            quantityArray: quantityArray
          })
          .then(response => {
            console.log(response.data.session_id);
            sessionId = response.data.session_id;
          })
          .then(() => {
            stripe
              .redirectToCheckout({
                sessionId: sessionId
              })
              .then(function(result) {
                console.log(result);
              });
          });
      });
    }
  },

  data() {
    return {
  

       dialog: false,
       
      counter: 0,
      products: [
        {
          id: 1,

          name: "car1",
          price: 1,
          quantaty: 1,
          cart: false
        },
        {
          id: 2,

          name: "car2",
          price: 2,
          quantaty: 1,
          cart: false
        },
        {
          id: 3,

          name: "car3",
          price: 3,
          quantaty: 1,
          cart: false
        }
      ],
      cart:[],
      headers:[ 
       
       
          { text: 'Remove', value: 'remove' },
          { text: 'Price', value: 'unit_price' },
           { text: 'Quantity', value: 'quantity' },
            { text: 'Product name', value: 'product_name' }
            
          ],
          items: [],
          
    }
  },
   computed:{
       
      total(){
        
        var t=0 ;
        for(var i=0 ; i<this.items.length;i++){
          console.log(this.items[i].unit_price)
          t += this.items[i].unit_price * this.items[i].quantity 
          console.log( this.items[0].quantity)
        }
        return t
      },
      currentUser(){
        return this.$store.state.currentUser
      },
      intable(){
        return this.$store.state.table
      }
  
    },
    created:()=>{
      
    }
    


}
</script>