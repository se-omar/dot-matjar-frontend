<template>
<div>


<v-form>
    <v-container>
      <v-row>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="nationalNumber"
            label="الرقم القومي"
            filled
            shaped
            outlined
            maxlength="14"
            :rules="[rules.must,rules.numbers]"
            disabled
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="gender"
            label="النوع"
            
            shaped
            outlined
          ></v-text-field>
        </v-col>

         <v-col cols="12" sm="6">
          <v-text-field
            v-model="fullArabicName"
            label="الاسم بلكامل عربي"
            outlined
            disabled
            filled
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="fullEnglishName"
            label="الاسم بلكامل انجليزي"
            
            outlined
          ></v-text-field>
        </v-col>





     <v-col cols="12" sm="6">   



  <v-menu
    ref="menu"
    
    :close-on-content-click="false"
    transition="scale-transition"
    offset-x
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="birthDate"
        label="Birthday date"
        prepend-icon="event"
        readonly
        v-bind="attrs"
        v-on="on"
        outlined
        
      ></v-text-field>
    </template>
    <v-date-picker
      ref="picker"
      v-model="birthDate"
      :max="new Date().toISOString().substr(0, 10)"
      min="1950-01-01"
      
    ></v-date-picker>
  </v-menu>








</v-col>
        

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="qualifications"
            label="المؤهل"
            outlined
            
          ></v-text-field>
        </v-col>

         <v-col cols="12" sm="6">
          <v-text-field
            v-model="job"
            label="المهنه"
            outlined
            
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="governorate"
            label="المحافظه"
            outlined
            
          ></v-text-field>
        </v-col>
        
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="center"
            label="المركز"
            outlined
            
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="village"
            label="القريه"
            outlined
           
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="telephoneNumber"
            label="التيليفون"
            outlined
            
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="phoneNumber"
            label="الموبيل"
            outlined
            
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="fax"
            label="الفاكس"
            outlined
            
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="email"
            label="البريد الالكتروني"
            filled
            outlined
            disabled=""
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="facebookAccount"
            label="الفيسبوك"
            outlined
            
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="linkedin"
            label="لينكدان"
         outlined
            
          ></v-text-field>
        </v-col>

        
        <v-col cols="12" >
          <v-text-field
            v-model="website"
            label="الموقع الالكتروني"
            outlined
            
          ></v-text-field>
        </v-col>

        
<v-col cols="12" >
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
 












 <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
 <v-btn x-large block   color="blue" @click="completedata">حفظ</v-btn>

 <v-btn x-large block  color="red" @click="$router.push('/')">الغاء</v-btn>
 


 
</v-col>

 


      </v-row>
    </v-container>
  </v-form>



</div>                  
                  
</template>
<script>
export default {
    name:"completedata",
    methods:{
      completedata(){
        this.$store.dispatch('completedata',{
          national_number:this.nationalNumber,
          gender:this.gender,
          full_arabic_name:this.fullArabicName,
          full_english_name:this.fullEnglishName,
          birthdate:this.birthDate,
          qualifications:this.qualifications,
          job:this.job,
          governorate:this.governorate,
          village:this.village,
          center:this.center,
          telephone_number:this.telephoneNumber,
          phone_number:this.phoneNumber,
          fax:this.fax,
          facebook_account:this.facebookAccount,
          linkedin:this.linkedin,
          website:this.website,
          address:this.address
        })
      },
      
    },
    data:()=> ({
      rules: {
      ex:v => !!v || "This field is required",
     telephonenumber:v => (v && v.length >= 8) || "telenumber must be 8 NUMBERS at least",
     
      must:v => (v && v.length == 14) || "ID must be 14 NUMBERS",
      numbers:v=> /\d+/.test(v)|| "Enter numbers"
    },

nationalNumber:"",
gender:"",
fullEnglishName:"",
birthDate:"",
fullArabicName:"",
qualifications:"",
job:"",
governorate:"",
village:"",
center:"",
telephoneNumber:"",
phoneNumber:"",
fax:"",
facebookAccount:"",
linkedin:"",
website:"",
address:"",
email:"",






    })

}
</script>