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
                                        <v-col cols="4">
                                            <v-text-field v-model="productName"  label="اسم المشروع" required></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field v-model="businessActivity" :append-icon="show1?'eye':'eye-off'"  :type="show1 ? 'text' : 'password'" name="input-10-1" label="النشاط"  counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                         <v-col cols="4">
                                            <v-text-field v-model="enterPriceNationalNumber"  :append-icon="show1?'eye':'eye-off'"  :type="show1 ? 'text' : 'password'" name="input-10-1" label="الرقم القومي للمنشاه" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                        </v-col>
                                       
                                        
                                          
                                        <fileUpload />
                                        


                                      
                                        
                                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                        </v-col>
                                        <v-spacer></v-spacer>
                                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                            <v-btn x-large block :disabled="!valid" color="success" @click="validateLogin"> Login </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>


                        <v-card class="px-4">
                            <v-card-text>
                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    <v-row>
                                       <v-col cols="4">
                                            <v-text-field v-model="name"  label="الاسم" disabled filled   outlined></v-text-field>
                                        </v-col>
                                         <v-col cols="4" >
                                            <v-text-field v-model="nationalNumber"    label="الرقم القومي لصاحب المشروع" maxlength="14"  disabled filled   outlined></v-text-field>
                                        </v-col>

                                        <v-col cols="4" >
                                            <v-text-field v-model="job"  label="الوظيفه الحاليه"  disabled filled   outlined></v-text-field>
                                      </v-col>
                                        <v-col cols="4" >
                                            <v-text-field v-model="email"  label="البريد الالكتروني" disabled filled   outlined ></v-text-field>
                                      </v-col>
                                       
                                       

                                         <!-- National NUMBER  -->

                                        
                                        <v-col cols="4">
                                            <v-text-field v-model="mobileNumber" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" name="input-10-1" label="الموبايل" hint="At least 7 characters" counter @click:append="show1 = !show1" disabled filled   outlined></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field block v-model="fax" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"  :type="show1 ? 'text' : 'password'" name="input-10-1" label="الفاكس" counter @click:append="show1 = !show1" disabled filled   outlined></v-text-field>
                                        </v-col>
                                          <v-col cols="4">
                                            <v-text-field block v-model="website" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"  :type="show1 ? 'text' : 'password'" name="input-10-1" label="رابط الموقع" counter @click:append="show1 = !show1" disabled filled   outlined></v-text-field>
                                        </v-col>
                                              
<v-col cols="12" >
            <v-textarea
               v-model="address"
               outlined
            
            disabled=""
              color="teal"
            >
              <template v-slot:label>
                <div>
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
                                         
                                        
                                      

                                        <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                            <v-btn x-large block :disabled="!valid || !checkbox"  id="btn" color="success" @click="validateSignup">تسجيل</v-btn>
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
import fileUpload from '../components/fileUpload'
export default {
    name:"businessownerdata",
 components: {
    fileUpload
  },

 computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },

    row() {
      return this.$store.state.row;
    }
    
  },
  methods: {
    validateSignup() {
      alert("Please Verify your account , a message has been sent")
    var self = this;
        self.$store.dispatch('register',
        {
            email: this.email,
            password:this.password,
            full_arabic_name:this.fullArabicName,
            national_number:this.nationalNumber,
            mobile_number:this.mobileNumber
        }
        )
    },

    validateLogin() {
      this.$axios
        .post("http://localhost:3000/api/login", {
          email: this.loginEmail,
          password: this.loginPassword
        })
        .then(response => {
          if(response.data != "Please activate your account"){

         
         
         if (response.data != "authenitcation succesfull") {
            alert(response.data);
          } else {
            this.$router.push("/");
            alert(response.data) 
          }
          }
          else {alert(response.data)}
        })
        .catch(error => {
          console.log(error);
        });
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
  created(){
    var x=this.$store.state.currentUser
    console.log(x)
    this.name=x;
    
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
    checkbox:false
    
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
</style>