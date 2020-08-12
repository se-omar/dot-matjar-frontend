<template>
    <v-app id="app">
        
     <tool-bar></tool-bar>
        <v-row  justify="start">
            <v-row>
            <v-col cols='4'>  
      <v-card class="white"  >
<b-table striped hover :items="items" :fields="fields"></b-table>
  </v-card>
            </v-col>
          </v-row>
          
              <v-col align="start" cols="12">
              Total
              </v-col>
          
        <v-container>
          
            <v-row justify="center">
                <v-col cols="3">
                   <h2>Dilevery Address</h2>
                </v-col>
            </v-row>
           <v-row justify="center">
                <v-col cols="3">
                     <v-text-field
                    label="المحافظه"
                    outlined
                    v-model="governorate"
                    ></v-text-field>
                </v-col>
               
               <v-col cols="3">
                     <v-text-field
                    label="القريه"
                    v-model="village"
                    outlined
                    ></v-text-field>
                </v-col>
                
            </v-row>
                  
          
             <v-row justify="center" >
                     
<v-col cols="6" >
            <v-textarea
               v-model="address"
               outlined
            
              color="teal"
            >
              <template v-slot:label>
                <div>
                  العنوان
                </div>
              </template>
            </v-textarea>
          </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="3">
                <h2>:Total</h2>
                </v-col>
            </v-row>
        </v-container>
        </v-row>
            
        <v-container>
          
            <v-row justify="center">
                <v-col cols="3">
                   <h2>Dilevery Address</h2>
                </v-col>
            </v-row>
           <v-row justify="center">
                <v-col cols="3">
                     <v-text-field
                    label="المحافظه"
                    outlined
                    v-model="governorate"
                    ></v-text-field>
                </v-col>
               
               <v-col cols="3">
                     <v-text-field
                    label="القريه"
                    v-model="village"
                    outlined
                    ></v-text-field>
                </v-col>
                
            </v-row>
                  
          
             <v-row justify="center" >
                     
<v-col cols="6" >
            <v-textarea
               v-model="address"
               outlined
            
              color="teal"
            >
              <template v-slot:label>
                <div>
                  العنوان
                </div>
              </template>
            </v-textarea>
          </v-col>
            </v-row>
            <v-row justify="center">
                <v-col cols="3">
                <h2>:Total</h2>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
import ToolBar from "../components/toolbar.vue";

export default {
name:'checkOut',
components:{
ToolBar
},
data:()=>({
   
    governorate:'',
    village:'',
    address:'',
  
    //   headers:[
    //   {text:"Product", value:"product"},
    //   {text:"price" , value:'price'}  

      
      
    //   ],
    //   items: [
    //     {
    //       product:'machinegun'
    //     },
    //     {
    //         product:'anything'
    //     }
    //   ]
 fields: [{key:"product_name",label:"المنتجات"},
 {key:"unit_price",label:"السعر"}],
        items:[]
}),
created(){
this.address=this.$store.state.currentUser.address
this.village=this.$store.state.currentUser.village
this.governorate=this.$store.state.currentUser.governorate
this.items=this.$store.state.table

},
mounted:{
   
}
    
}
</script>
<style scoped>
#app{
    background-color: whitesmoke;
}
</style>