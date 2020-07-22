<template>
<div id="app">





    <v-app>
        <v-parallax
    dark
    height="400"
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col class="text-center" cols="12">
        <h1 class="display-1 font-weight-thin mb-4">Vuetify.js</h1>
        <h4 class="subheading">Build your application today!</h4>
      </v-col>
    </v-row>
  </v-parallax>
        <v-container >

            <div id="container"  style="width: 80% ">
                <v-tabs v-model="tab" show-arrows background-color="white" icons-and-text dark grow>
                    <v-tabs-slider color="purple darken-4"></v-tabs-slider>
                    <v-tab  v-for="i in tabs" :key="i.name">
                        
                        <div id="tabs" class="caption py-1">{{ i.name }}</div>
                    </v-tab>
                    <v-tab-item>
                        <v-card class="px-4">
                          
                            <v-card-text>
                                <v-form ref="loginForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="4" sm="6">
                                            <v-text-field v-model=" bussinessName"  label="اسم المشروع" required></v-text-field>
                                        </v-col>
                                        <v-col cols="4" sm="6">
                                            <v-text-field v-model="bussinessActivity" :append-icon="show1?'eye':'eye-off'"  name="input-10-1" label="النشاط"  counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                         <v-col cols="4" sm="6">
                                            <v-text-field v-model="enterPriceNationalNumber" :rules="[rules.mobilenumber]"  name="input-10-1" label="الرقم القومي للمنشاه" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                       

                                       <!-- Photo upload ==================== -->
                                        
                                          <form   enctype="multipart.form/data">
<v-row>



<!-- First photo -->



 <v-col lg="4" sm="4" md="4">

    <div v-if="message">
<span id="message">{{message}}</span>

    </div>
   
    <v-card>

    
      <div class="uploader">
        
<div class="file is-boxed is-primary">
<label class="file-label">





<span class="file-cta">
<span class="file-icon">
    

<i class="fas fa-upload  fa-2x " style="color:blue"></i> <br/>


</span>
<span class="file-label" style="font-weight:bold">
 قم بوضع السجل التجاري <br/>
</span>
</span>

<input
type="file"
ref="upload1"
@change="dropFiles"
class="file-input"
id="input"
 /> <br/>
<span class="fileName" v-if="commercialRegister">{{commercialRegister.name}}</span>
</label>
</div>
   
  
</div>
</v-card>
   </v-col>





<!-- Socond photo -->


 <v-col lg="4" sm="4" md="4">

    <div v-if="message">
<span id="message">{{message}}</span>

    </div>
   
    <v-card>

    
      <div class="uploader">
          
<div class="file is-boxed is-primary">
<label class="file-label">





<span class="file-cta">
<span class="file-icon">
    

<i class="fas fa-upload  fa-2x " style="color:blue"></i> <br/>


</span>
<span class="file-label" style="font-weight:bold">
    قم بوضع البطاقه الضريبيه <br/>
</span>
</span>

<input
type="file"
ref="upload2"
@change="dropFiles"
class="file-input"
id="input"
 /> <br/>
<span class="fileName" v-if="taxCard">{{taxCard.name}}</span>
</label>
</div>
  

</div>
</v-card>
   </v-col>



<!-- Third photo -->



 <v-col lg="4" sm="4" md="4">

    <div v-if="message">
<span id="message">{{message}}</span>

    </div>
   
    <v-card>

    
      <div class="uploader">
          
<div class="file is-boxed is-primary">
<label class="file-label">





<span class="file-cta">
<span class="file-icon">
    

<i class="fas fa-upload  fa-2x " style="color:blue"></i> <br/>


</span>
<span class="file-label" style="font-weight:bold">
    قم بوضع الرخصه <br/>
</span>
</span>

<input
type="file"
ref="upload3"
@change="dropFiles"
class="file-input"
id="input"
 /> <br/>
<span class="fileName" v-if="operatingLicence">{{operatingLicence.name}}</span>
</label>
</div>
   
  


</div>
</v-card>
   </v-col>







</v-row>

</form> 

                                        




                                        


                                      <!-- ======================================================= -->
                                        
                                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <!-- <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                            <v-btn x-large block :disabled="!valid" color="success" @click="validateLoginPage"> Login </v-btn>
                                        </v-col> -->
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>


                        <v-card class="px-4">
                            <v-card-text>
   <p  > يمكنك التعديل من هنا او من  <a @click="$router.push('/completedata')">تعديل بياناتي من حسابي</a></p>

                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    <v-row>
                                       <v-col cols="4" sm="6">
                                            <v-text-field v-model="name"  label="الاسم"     outlined></v-text-field>
                                        </v-col>
                                         <v-col cols="4" sm="6" >
                                            <v-text-field v-model="nationalNumber"    label="الرقم القومي لصاحب المشروع" maxlength="14"      outlined></v-text-field>
                                        </v-col>

                                        <v-col cols="4" sm="6" >
                                            <v-text-field v-model="job"  label="الوظيفه الحاليه"      outlined></v-text-field>
                                      </v-col>
                                        <v-col cols="4" sm="6" >
                                            <v-text-field v-model="email"  label="البريد الالكتروني"  filled  disabled outlined ></v-text-field>
                                      </v-col>
                                       
                                       

                                         <!-- National NUMBER  -->

                                        
                                        <v-col cols="4" sm="6">
                                            <v-text-field v-model="mobileNumber"   label="الموبايل"  counter @click:append="show1 = !show1"     outlined></v-text-field>
                                        </v-col>
                                        <v-col cols="4" sm="6">
                                            <v-text-field block v-model="fax"   label="الفاكس" counter @click:append="show1 = !show1"     outlined></v-text-field>
                                        </v-col>
                                          <v-col cols="4" sm="6">
                                            <v-text-field block v-model="website"   label="رابط الموقع" counter @click:append="show1 = !show1"     outlined></v-text-field>
                                        </v-col>
                                              
<v-col cols="12" >
            <v-textarea
               v-model="address"
               outlined
            
           
              color="teal"
            >
              <template v-slot:label>
                <div >
                  العنوان
                </div>
              </template>
            </v-textarea>
          </v-col>
 
                                        <v-spacer></v-spacer>

                                          <v-col cols="12">
                                      <v-checkbox v-model="checkbox">
      <template v-slot:label>
        <div>
          لقد قرات و وافقت علي 
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <a
                
                href="http://vuetifyjs.com"
                @click.stop
                v-on="on"
              >
                سياسه التسجيل
              </a>
            </template>
            Opens in new window
          </v-tooltip>
         
        </div>
      </template>
    </v-checkbox>
                                       </v-col>
                                         
                                        
                                      

                                        <v-col class="d-flex ml-auto" cols="12" sm="6" xsm="12">
                                            <v-btn x-large block :disabled="!valid || !checkbox"  id="btn" color="success" @click="sendServer">تسجيل</v-btn>
                                       <v-btn x-large block :disabled="!valid || !checkbox"  color="success" @click="$router.push('/')">الغاء</v-btn>
                                        </v-col>

                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-container>
    </v-app>
  </div>
</template>


  
<script>
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
export default {
    name:"businessownerdata",
 components: {
    
  },
mounted(){
  

if (this.currentUser.website ){ this.website = this.currentUser.website}
if (this.currentUser.full_arabic_name ){ this.name = this.currentUser.full_arabic_name}
if (this.currentUser.fax ){ this.fax = this.currentUser.fax}
if (this.currentUser.mobile_number ){ this.mobileNumber = this.currentUser.mobile_number}
if (this.currentUser.national_number ){ this.nationalNumber = this.currentUser.national_number}
if (this.currentUser.job ){ this.job = this.currentUser.job}
if (this.currentUser.email ){ this.email = this.currentUser.email}
if (this.currentUser.address ){ this.address = this.currentUser.address}




},
 computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },

    row() {
      return this.$store.state.row;
    },
    currentUser(){
      return this.$store.state.currentUser
    },  
    
    
  },
  methods: {




// Photoupload=============================



dropFiles(){
    
   this.commercialRegister=this.$refs.upload1.files[0]
    this.taxCard=this.$refs.upload2.files[0]
    this.operatingLicence=this.$refs.upload3.files[0]
    this.images = [this.commercialRegister , this.taxCard , this.operatingLicence]
    
},
 sendServer(){
   
    var formdata=new FormData();
   this.images.forEach(element => {
        formdata.append('file',element)
    });
    formdata.set("bussiness_activity",this.bussinessActivity)
    formdata.set("bussiness_name",this.bussinessName)
    formdata.set("enterprice_national_number",this.enterPriceNationalNumber)
    formdata.set("user_id",this.$store.state.currentUser.user_id)
    // USER Table
    formdata.set("full_arabic_name",this.name)
    formdata.set("national_number",this.nationalNumber)
    formdata.set("job",this.job)
    formdata.set("fax",this.fax)
    formdata.set("address",this.address)
    formdata.set("website",this.website)
    formdata.set("mobile_number",this.mobileNumber)
    formdata.set("email",this.email)


    this.$axios.post('http://localhost:3000/api/businessOwnerData',formdata)
    
    .then(response =>{
        this.message="Image uploaded sucssfully"
        

        alert(response.data.message)
    }).catch(err=>{
        this.message="Error occured , Please upload again"
        console.log(err)
    })
   
},

 

//======================================

    // validateSignup() {
    //   alert("Please Verify your account , a message has been sent")
    // var self = this;
    //     self.$store.dispatch('register',
    //     {
    //         email: this.email,
    //         password:this.password,
    //         full_arabic_name:this.fullArabicName,
    //         national_number:this.nationalNumber,
    //         mobile_number:this.mobileNumber
    //     }
    //     )
    // },

    validateLoginPage() {
     
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    changeRoute(){
      document.getElementById("btn").disapled()
    },
    
   
  },
  


  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
      { name: "بيانات اساسيه01"  },
      { name: "بيانات الشخص المسئول02" }
    ],
    valid: true,

   name:"",
    email: "",
    nationalNumber:"",
    password: "",
    verify: "",
    mobileNumber:"",
    loginPassword: "",
    loginEmail: "",
    bussinessName:"",
    bussinessActivity:"",
    enterPriceNationalNumber:"",
    job:"",
    fax:"",
    website:"",
    address:"",
    loginEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid",

    

    ],
    emailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    

    show1: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 7) || "Min 7 characters",
      valid: v=> /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(v)||"password must have at least one letter, one number and one special character",
      national:v=> /\d+/.test(v) || "ID must be numbers only",
      must:v => (v && v.length == 14) || "ID must be 14 NUMBERS",
      mobilenumber:v=> /\d+/.test(v)|| "Enter numbers"
    },
    checkbox:false,

 message:"",
    error:false,
    commercialRegister:[],
    taxCard:[],
    operatingLicence:[],
    images:[]
    
    


    
  })
};





</script>

<style scoped>
.v-parallax__image {
  transform: none !important;
  width: 100% !important;
  ;
}
#container{
    margin-top: -10%;
    margin-right: 10%;
}
#tabs{
  font-weight: bold;
  color:black 
}
.uploader{
    text-align: center;
    background-color:white;
    
}
.parag{
    font-weight: bold;
    font-size: large;
}
i{
   width: 100;
   height: 100;
}
input{
    opacity: 0;
    z-index: inherit;
}
.fileName{
    font-weight: bold;
    font-size: large;
} 
#message{
font-weight:bold;
font-size: large;
color:black
}
p{
font-weight: bold;
font-size: large;
color:black
}

</style>