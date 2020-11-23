<template>
    <v-app>
        <v-main>
            <v-row justify="center">
                 <v-radio-group row mandatory v-model="radioGroup">
        <v-radio  value=1>
          <template v-slot:label>
            <span>{{ $t("adminPage.addCompany") }}</span>
          </template>
        </v-radio>

        <v-radio  value=2>
          <template v-slot:label>
            <span>{{ $t("adminPage.removeCompany") }}</span>
          </template>
        </v-radio>
      </v-radio-group>
            </v-row>
            <v-container v-if="radioGroup == 1">
            <v-row justify="center" >
           <v-col lg="3" sm="4" cols="6" md="3" >
<v-text-field filled outlined rounded v-model="companyName" :label="$t('adminPage.companyName')"> 

</v-text-field>
           </v-col>
            <v-col lg="3" sm="4" cols="6" md="3" >
<v-text-field filled outlined rounded v-model="companyNumber" :label="$t('adminPage.companyNumber')"> 

</v-text-field>
           </v-col>
               <v-col lg="3" sm="4" cols="6" md="3" >
<v-text-field filled outlined rounded v-model="companyAddress1" :label="$t('adminPage.companyAddress1')"> 

</v-text-field>
           </v-col>
             <v-col lg="3" sm="4" cols="6" md="3" >
<v-text-field filled outlined rounded v-model="companyAddress2" :label="$t('adminPage.companyAddress2')"> 

</v-text-field>
           </v-col>
             <v-col lg="3" sm="4" cols="6" md="3" >
<v-text-field filled outlined rounded v-model="companyAddress3" :label="$t('adminPage.companyAddress3')"> 

</v-text-field>
           </v-col>
          
       </v-row>
        <v-row justify="center">
           <v-col lg="3" sm="4" cols="6" md="3" >
<v-text-field filled outlined rounded v-model="country" :label="$t('orderedProducts.country')"> 

</v-text-field>
           </v-col>
            <v-col lg="3" sm="4" cols="6" md="3" >
<v-text-field filled outlined rounded v-model="shippingRate" :label="$t('adminPage.shippingRate')"> 

</v-text-field>
           </v-col>
               <v-col lg="3" sm="4" cols="6" md="3" >
<v-text-field filled outlined rounded v-model="governorate" :label="$t('adminPage.governorate')"> 

</v-text-field>
           </v-col>
       </v-row>
       <v-row justify="center">
           <v-col lg="3" sm="4" cols="6" md="3" >
<v-text-field filled outlined rounded v-model="collectionAmount" :label="$t('adminPage.collectionAmount')"> 

</v-text-field>
           </v-col>
            <v-col lg="3" sm="4" cols="6" md="3" >
<v-text-field filled outlined rounded v-model="collectionRate" :label="$t('adminPage.collectionRate')"> 

</v-text-field>
           </v-col>
              
       </v-row>
            </v-container>
            <v-container v-else>
<v-card style="overflow:hidden" elevation="16" max-width="400" class="mx-auto">
                    <v-toolbar shaped>
                      <v-row justify="center">
                        <h2 style="text-align: center">
                        {{$t('adminPage.companies')}}
                        </h2>
                      </v-row>
                    </v-toolbar>
   
 <v-virtual-scroll
                      :items="virtualScrollerCompaniesArray"
                      height="300"
                      item-height="64"
                      ma
                    >
                      <template v-slot="{ item }">
                        <v-list-item>
                          <v-list-item-action>
                            <v-btn
                              @click="true"
                              fab
                              small
                              depressed
                              color="primary"
                            >
                              N
                            </v-btn>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title :key="item">
                              
                                {{ item }}
                          
                            </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-icon>
                            <v-btn @click="activateRemoveDialog(item)" small icon>  <i style="color:red"     class="fa fa-times"></i></v-btn>
                          </v-list-item-icon>
                        </v-list-item>
                      </template>
                    </v-virtual-scroll>
                   
       <v-dialog v-model="removeDialog" width="300">
<v-card style="overflow:hidden">
    <v-card-title>
        {{$t('completedata.dialogQuestion')}}
    </v-card-title>
    <v-row justify="center">
           <v-btn @click="removeCompany()" small rounded :color="siteColor.button_color" ><span :style="`color:${siteColor.button_text_color};font-size:12px`">{{$t('adminPage.removeCompany')}}</span></v-btn>
    </v-row>
</v-card>
       </v-dialog>
   </v-card>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
data(){
    return {
        radioGroup:1,
          country:'',
    governorate:'',
    shippingRate:'',
    collectionRate:'',
collectionAmount:'',
companyName :'',
companyNumber:'',
companyAddress1 :'',
companyAddress2:'',
companyAddress3:'',
removeDialog: false ,
companyData:[]
    }
},
methods:{
 
    activateRemoveDialog(name){
        console.log(name)
        console.log(this.allCompanies)
        for(let i =0 ; i<this.allCompanies.length ; i++){
            if(this.allCompanies[i].company_name == name){
                this.companyData = this.allCompanies[i]
            }
        }
        this.removeDialog=true
    },
    removeCompany(){
        this.$store.dispatch('removeCompany',this.companyData.shipping_companies_id)
    }
},
computed:{
    virtualScrollerCompaniesArray(){
  var array =  this.$store.state.AdminPage.allCompanies.map(company=>{
return company.company_name
    })
    return array
},
  siteColor() {
      if (this.$store.state.Home.siteColor) {
        return this.$store.state.Home.siteColor;
      } else {
        return {
          button_text_color: "black",
          button_color: "white",
          toolbar_color: "white",
          toolbar_text_color: "black",
        };
      }
    },
    allCompanies (){
    return this.$store.state.AdminPage.allCompanies
},
defaultCompany (){
    return this.$store.state.AdminPage.defaultCompany
},
},
async created(){
      await this.$store.dispatch('getDefaultCompany')
        await this.$store.dispatch('getAllCompanies')
  
}
}
</script>