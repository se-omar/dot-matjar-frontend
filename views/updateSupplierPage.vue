<template>
<v-app >
  
<v-row class="mt-6" justify="center">
    <h1>Welcome to Dot-Market</h1>

    </v-row>
     <v-row class="mt-6" justify="center">
    <h2>Please be aware that your logo has to be a PNG file</h2>

    </v-row>
    <!-- <v-row class="mb-8" justify="center"> -->
    <v-container>
    
      <v-row justify="center"> 
      <!-- =============== photo -->
       <v-col   cols="12" lg="4" sm="6" md="6">
         <form   enctype="multipart.form/data">
         <label>
         
     <v-card max-width="200" :color="siteColor">
       
           <span class="ml-4 mt-4" style="font-size:25px">Upload your logo here:</span>
        
              <i class="fa fa-upload fa-lg"> </i> 
           <input @change="fileUploaded"  type="file" ref="logo"/>
          <span v-if="logo">
           {{logo.name}}
          </span>
         
       </v-card>
       
         </label>
         </form>
          </v-col>
         <!-- =================== -->
            <v-col cols="6" lg="4" sm="4" md="6">
            <v-text-field rounded label="Site Name"  v-model="siteName" outlined :color="siteColor" > </v-text-field>
          </v-col>
          <!-- ================ -->
        
          <v-col cols="6" lg="4" sm="4" md="6"> 
            <v-text-field label="Facebook account"  v-model="facebook" rounded outlined :color="siteColor" > </v-text-field>
          </v-col>
          <v-col cols="6" lg="4" sm="4" md="6">
            <v-text-field label="Twitter account"  v-model="twitter" rounded outlined :color="siteColor" > </v-text-field>
          </v-col>
          <v-col cols="6" lg="4" sm="4" md="6">
            <v-text-field label="linkedin account"  v-model="linkedin" rounded outlined :color="siteColor" > </v-text-field>
          </v-col>
          <v-col cols="6" lg="4" sm="4" md="6">
            <v-text-field label="Instgram account"  v-model="instgram" rounded outlined :color="siteColor" > </v-text-field>
          </v-col>
           <v-col cols="6" lg="4" sm="4" md="6">
            <v-text-field label="google account"  v-model="google" rounded outlined :color="siteColor" > </v-text-field>
          </v-col>
            <v-col cols="12" lg="12" sm="12" md="12">
            <v-textarea rounded label="Footer" v-model="footer" outlined :color="siteColor" > </v-textarea>
          </v-col>
           <v-col cols="5" lg="3" sm="3" md="3">
             <v-btn @click="sendData" x-large :color="siteColor" class="white--text">Update</v-btn>
          </v-col>
         
<!-- ======================== -->


 
  

    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :color="siteColor"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
     Page Updated succesfully

      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>


<!-- ======================= -->



      </v-row>
      
    </v-container>
    <!-- </v-row> -->
    </v-app>
</template>

<script>
export default {
    name:'updateSupplierPage',
    components:{},
    data:()=>({  
      logo : '',
      siteName:'',
      facebook:'',
      instgram:'',
      linkedin:'',
      twitter:'',
      google:'',
      footer:'',




        mode: '',
        snackbar: false,
     
        timeout: 3000,
        x: null,
        y: 'top',





    }),
    methods:{
     fileUploaded(){
       this.logo =  this.$refs.logo.files[0]
       console.log(this.$refs.logo.files[0])

     },
     sendData(){
       var formdata= new FormData()
       formdata.append('file',this.logo)
       formdata.set('siteName',this.siteName)
       formdata.set('facebook',this.facebook)
       formdata.set('instgram',this.instgram)
       formdata.set('linkedin',this.linkedin)
       formdata.set('twitter',this.twitter)
        formdata.set('google',this.google)
        formdata.set('footer',this.footer)
       formdata.set('supplier_id',this.supplier.user_id)

       this.$store.dispatch('updateSupplierPage',formdata)
       this.snackbar = true
     }
    },
    computed:{
   siteColor(){
       return this.$store.state.siteColor
   },
   supplier(){
     return this.$store.state.supplier
   },
   currentUser(){
     return this.$store.state.currentUser
   }
    },
    created(){
      this.$store.dispatch('refreshCurrentUser')
        this.$store.dispatch("getSupplier", this.$route.params.supplier_id);
       this.$store.dispatch('getSupplierPageData' , this.$route.params.supplier_id);
      if(this.currentUser){
         if(this.$route.params.supplier_id != this.currentUser.user_id){
        this.$router.push('/notFound')
      }
      }
     
console.log(this.supplier.user_id)

    }
    
}
</script>

<style scoped>
input{
   opacity: 0;
    z-index: inherit;
}
</style>