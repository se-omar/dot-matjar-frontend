<template>
  <div >
    <v-app class="grey lighten-4" >
     
      <cartTable/>
      
     <div class="mx-7"  >

        
        
        <v-row >
          <v-col lg="3">
            <v-text-field
              @keyup="emptySearchBox"
              dense
               outlined
              v-model="toolbarSearch"
              placeholder="Search for your Product"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="3">
            <v-select 
            @keyup="emptySelectBox"
            placeholder="Search By category"
            dense
             outlined
            v-model="categoryName"
            :items="category"
            @click="categoriesDB"
            ></v-select>

          </v-col>
        </v-row>
     
        <v-row>
         

          <v-col lg="1">
            <v-text-field dense type="number" label="Price From"></v-text-field>
          </v-col>

          <v-col lg="1  ">
            <v-text-field dense type="number" label="Price TO"></v-text-field>
          </v-col>

          <v-col lg="1">
            <v-btn class="red darken-4 white--text" @click="filterProducts">Search</v-btn>
          </v-col>
        </v-row>

  
        <v-row >
          <v-col
            lg="2"
            md="4"
            sm="6"
            cols="6"
            v-for="filteredProduct in filteredProducts"
            :key="filteredProduct.id"
          >
             <v-hover>
    <v-card
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 4}`"
      
      width="280"
    >
          <product  :filteredProduct="filteredProduct">
  


          </product>
   
               
    </v-card>
             </v-hover>
          </v-col>
        </v-row>
       
   
     </div>
        
   <v-card>
        <Footer></Footer>
    </v-card>
    </v-app>

    
  </div>
</template>

<script>
import Product from "../components/product.vue";
import cartTable from "../components/cartTable"
import Footer from '../components/footer.vue'
//import usersModel from "../models/usersModel";

export default {
  name: "Home",
  data() {
    return {
      toolbarSearch: "",
      categoryName:'',
      items: [],
      egyptGovernorates: [
        "الإسكندرية",
        "الإسماعيلية",
        "أسوان",
        "أسيوط",
        "الأقصر",
        "البحر الأحمر",
        "البحيرة",
        "بني سويف",
        "بورسعيد",
        "جنوب سيناء",
        "الجيزة",
        "الدقهلية",
        "دمياط",
        "سوهاج",
        "السويس",
        "الشرقية",
        "شمال سيناء",
        "الغربية",
        "الفيوم",
        "القاهرة",
        "القليوبية",
        "قنا",
        "كفر الشيخ",
        "مطروح",
        "المنوفية",
        "المنيا",
        "الوادي الجديد"
      ],
      category:[]
    };
  },
  created() {
    this.$store.dispatch("getProducts");
    console.log(this.$store.state.filteredProducts)
     return new Promise(resolve => {
        setTimeout(() => {
 this.$store.dispatch('categoriesDB')    
         resolve()
        })
    })
  },
  computed: {
    row() {
      return this.$store.state.row;
    },
    products() {
      return this.$store.state.products;
    },
    filteredProducts() {
      return this.$store.state.filteredProducts;
    }
  },

  methods: {
    filterProducts() {
      console.log(this.toolbarSearch,this.categoryName)
      this.$store.dispatch("filterProducts",{
        product_name:this.toolbarSearch,
        category_name:this.categoryName
      });

    },
  
    emptySearchBox(){
      if(!this.toolbarSearch){
        this.$store.commit('emptySearch')
}
    },
      emptySelectBox(){
      if(this.categoryName == "All"){
        this.$store.commit('emptySearch')
}
    },
    categoriesDB(){
      this.category = this.$store.state.category
    }
  },
  components: {
    Product,
    cartTable,
    Footer
  }
};
</script>
<style scoped>

.container {
  max-width: 960px;
}
</style>
