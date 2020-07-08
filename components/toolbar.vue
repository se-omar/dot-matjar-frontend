<template>
  <div class="tool-bar">
    <v-app-bar color="blue" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-btn @click="$router.push('/')" text>اسم الموقع</v-btn>
      </v-toolbar-title>
      <!-- <input
        v-model="toolbarSearch"
        @keyup="filterProducts"
        class="input is-rounded"
        type="text"
        placeholder="search products"
      />-->



 



 
      <v-spacer></v-spacer>

      <v-btn @click="$router.push('/login')" text>
        <span>تسجيل الدخول</span>
      </v-btn>

      <v-btn
        color="blue"
        @click="$router.push('/reglogin').catch((err) => {})"
      >التسجيل</v-btn>

      <v-btn color="blue">
        <span>انشاء حساب</span>
      </v-btn>

      <v-btn text>
        <span>عن الموقع</span>
      </v-btn>

<!--============================

/>-->

  <v-menu
  transition="fab-transition"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="blue"
          dark
          v-bind="attrs"
          v-on="on"
        >
          <span>حسابي</span>
 <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
 
      <v-card>
        <v-card-title >
           <img  src="https://cdn.vuetifyjs.com/images/john.jpg" alt="avatar">
           
        </v-card-title>
        <v-card-text>
          <span class="username">User Name</span>
        </v-card-text>
        <v-card-title> 
          <a class="x" >الطلبات الصادره و الوارده</a>
       
          
          
        </v-card-title>
        <v-row>
        <v-card-text> 

<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"      width="24" height="24"    viewBox="0 0 172 172"    style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#95a5a6"><path d="M43,14.33333v28.66667h7.16667v114.66667h37.0651l14.33333,-14.33333h-37.0651v-28.66667h35.83333v7.16667h28.66667v-28.66667h-28.66667v7.16667h-35.83333v-28.66667h35.83333v7.16667h28.66667v-28.66667h-28.66667v7.16667h-35.83333v-14.33333h7.16667v-28.66667zM159.15039,107.5c-0.91644,0 -1.83477,0.35105 -2.53352,1.0498l-7.16667,7.16667l14.33333,14.33333l7.16667,-7.16667c1.3975,-1.3975 1.3975,-3.66956 0,-5.06706l-9.26628,-9.26628c-0.70233,-0.69875 -1.61709,-1.0498 -2.53353,-1.0498zM144.38314,120.78353l-36.88314,36.88314v14.33333h14.33333l36.88314,-36.88314z"></path></g></g></svg>
       
         <a class="size">تعديل بياناتي  </a>
         </v-card-text>
        </v-row>
        <v-divider></v-divider>

      <v-col cols="12">
        <v-btn class="btn1" x-large color="blue">
          <span class="mos">انضم كمستشار </span>

          
        </v-btn>
       
         
      </v-col>
      <v-col cols="12">
        <v-btn class="btn1" x-large color="blue">
          
           <span class="mos" @click="$router.push('/businessownerdata')">انضم كصاحب مشروع</span>
        </v-btn>
       
         
      </v-col>
      
        <v-divider></v-divider>
        
        <v-cols cols="6" >
          <v-card-text >

             <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"        width="26" height="20"    viewBox="0 0 172 172" style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#3498db"><path d="M75.87019,6.40865l-3.72115,23.56731c-5.65926,1.39544 -11.0601,3.48858 -15.91827,6.40865l-19.43269,-13.85096l-14.05769,14.05769l13.64423,19.43269c-2.94591,4.88401 -5.19411,10.23317 -6.61538,15.91827l-23.36058,3.92788v19.84615l23.36058,4.13462c1.42128,5.6851 3.66947,11.03426 6.61538,15.91827l-13.85096,19.43269l14.05769,14.05769l19.43269,-13.64423c4.85817,2.92007 10.25901,5.01322 15.91827,6.40865l3.92788,23.56731h19.84615l4.34135,-23.56731c5.63342,-1.42128 10.87921,-3.66947 15.71154,-6.61538l19.63942,13.85096l14.05769,-14.05769l-14.05769,-19.43269c2.89423,-4.83233 5.21996,-10.10397 6.61538,-15.71154l23.56731,-4.34135v-19.84615l-23.56731,-3.92788c-1.39543,-5.60757 -3.72115,-10.87921 -6.61538,-15.71154l13.85096,-19.63942l-14.05769,-14.05769l-19.43269,14.05769c-4.83233,-2.92007 -10.25901,-5.19411 -15.91827,-6.61538l-4.13462,-23.56731zM86,42.79327c23.85156,0 43.20673,19.35517 43.20673,43.20673c0,23.85156 -19.35517,43.20673 -43.20673,43.20673c-23.85156,0 -43.20673,-19.38101 -43.20673,-43.20673c0,-23.82572 19.35517,-43.20673 43.20673,-43.20673zM86,53.33654c-17.98558,0 -32.66346,14.67788 -32.66346,32.66346c0,17.98558 14.67788,32.66346 32.66346,32.66346c17.98558,0 32.66346,-14.67788 32.66346,-32.66346c0,-17.98558 -14.67788,-32.66346 -32.66346,-32.66346zM85.79327,72.35577c7.57151,0 13.85096,6.04688 13.85096,13.64423c0,7.57151 -6.27945,13.64423 -13.85096,13.64423c-7.57151,0 -13.64423,-6.07272 -13.64423,-13.64423c0,-7.59735 6.07272,-13.64423 13.64423,-13.64423z"></path></g></g></svg>
            
            <a  class="size" @click="$router.push('/resetPassword')">    تعديل كلمه المرور       </a>

        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="20"   viewBox="0 0 172 172"  style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#3498db"><path d="M86,14.33333c-39.5815,0 -71.66667,32.08517 -71.66667,71.66667c0,39.5815 32.08517,71.66667 71.66667,71.66667c39.5815,0 71.66667,-32.08517 71.66667,-71.66667c0,-39.5815 -32.08517,-71.66667 -71.66667,-71.66667zM78.83333,28.66667h14.33333v57.33333h-14.33333zM86,143.33333c-31.61217,0 -57.33333,-25.72117 -57.33333,-57.33333c0,-24.00833 14.84933,-44.58383 35.83333,-53.11217v15.9315c-12.82833,7.44617 -21.5,21.3065 -21.5,37.18067c0,23.7145 19.2855,43 43,43c23.7145,0 43,-19.2855 43,-43c0,-15.87417 -8.67167,-29.7345 -21.5,-37.18067v-15.9315c20.984,8.52833 35.83333,29.10383 35.83333,53.11217c0,31.61217 -25.72117,57.33333 -57.33333,57.33333z"></path></g></g></svg>

            <a  class="size" @click="$router.push('/login')">تسجيل الخروج</a>

          </v-card-text>


        </v-cols>
 

   
      </v-card>
    </v-menu>

<!--============================

/>-->


      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>


<script>

</script>

<style scoped>

  img {
  border-radius: 50%;
}
.size{
  font-size: 20px;
  font-weight: bold;
  
}
.x{
  margin-right: 20%;
  font-weight: bold;
  
  
}
.username{
    font-weight: bold;
      font-size: 20px;
  margin-right: 33%;


}
.btn1{
  margin-right: 10%;
  width: 80%;
}
.mos{
  color:beige
}

</style>
