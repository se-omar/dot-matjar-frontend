<template>
  <div class="tool-bar">
    <v-app-bar color="blue" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-btn text @click="$router.push('/home').catch((err) => {})">اسم الموقع</v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="!currentUser" text @click="$router.push('/reglogin').catch((err) => {})">التسجيل</v-btn>

      <v-btn
        v-if="currentUser"
        text
        @click="$router.push('/editPassword').catch((err) => {})"
      >تغيير كلمة السر</v-btn>

      <v-btn
        v-if="currentUser && currentUser.user_type == 'business'"
        text
        @click="$router.push('/requestsPage').catch((err) => {})"
      >الطلبات</v-btn>

      <v-btn
        v-if="currentUser && currentUser.user_type == 'business'"
        text
        @click="$router.push('/myProducts').catch((err) => {})"
      >منتجاتي</v-btn>

      <v-btn text>
        <span>عن الموقع</span>
      </v-btn>

      <v-btn v-if="currentUser" text @click="logout">تسجيل الخروج</v-btn>

      <!--============================

      />-->

      <v-menu
        v-if="currentUser"
        transition="fab-transition"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn text dark v-bind="attrs" v-on="on">
            <span>حسابي</span>
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
            <img   id="file" :src="nodeHost + currentUser.profile_photo" alt="avatar" />
          </v-card-title>
          <!-- <v-card-text>
            <span>
            <input type="file" 
            ref="profilePhoto"
            @change="profilePhoto"
            id="profilephoto"
            class="file-input"
            />
            </span>
                      <span class="file-label">Click to change your photo</span>

          </v-card-text> -->
          
<div v-if="! currentUser.profile_photo" id="fileUpload" class="file is-boxed is-primary">
<label class="file-label">

<span class="file-cta">
<span class="file-icon">
    

<i class="fas fa-camera fa-2x " style="color:blue"></i> <br/>


</span>
<span  class="file-label" style="font-weight:bold">
Upload your photo here <br/>
</span>
</span>

<input
type="file"
ref="profileUpload"
@change="changePhoto"
class="file-input"
id="profilePhoto"
 /> <br/>
</label>
</div>


<div v-if=" currentUser.profile_photo" id="fileUpload" class="file is-boxed is-primary">
<label class="file-label">

<span class="file-cta">
<span class="file-icon">
    

<i class="fas fa-camera fa-2x " style="color:blue"></i> <br/>


</span>
<span  class="file-label" style="font-weight:bold">
Change profile photo <br/>
</span>
</span>

<input
type="file"
ref="profileUpload"
@change="changePhoto"
class="file-input"
id="profilePhoto"
 /> <br/>
</label>
</div>



          <v-card-text>
            <span class="username">User Name</span>
          </v-card-text>
          <v-card-title>
            <a class="x">الطلبات الصادره و الوارده</a>
          </v-card-title>
          <v-row>
            <v-card-text>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 172 172"
                style=" fill:#000000;"
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style="mix-blend-mode: normal"
                >
                  <path d="M0,172v-172h172v172z" fill="none" />
                  <g fill="#95a5a6">
                    <path
                      d="M43,14.33333v28.66667h7.16667v114.66667h37.0651l14.33333,-14.33333h-37.0651v-28.66667h35.83333v7.16667h28.66667v-28.66667h-28.66667v7.16667h-35.83333v-28.66667h35.83333v7.16667h28.66667v-28.66667h-28.66667v7.16667h-35.83333v-14.33333h7.16667v-28.66667zM159.15039,107.5c-0.91644,0 -1.83477,0.35105 -2.53352,1.0498l-7.16667,7.16667l14.33333,14.33333l7.16667,-7.16667c1.3975,-1.3975 1.3975,-3.66956 0,-5.06706l-9.26628,-9.26628c-0.70233,-0.69875 -1.61709,-1.0498 -2.53353,-1.0498zM144.38314,120.78353l-36.88314,36.88314v14.33333h14.33333l36.88314,-36.88314z"
                    />
                  </g>
                </g>
              </svg>

              <a @click="$router.push('/completedata')" class="size">تعديل بياناتي</a>
            </v-card-text>
          </v-row>
          <v-divider></v-divider>

          <v-col cols="12">
            <v-btn class="btn1" x-large color="blue">
              <span class="mos">انضم كمستشار</span>
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn class="btn1" x-large color="blue">
              <span class="mos" @click="$router.push('/businessownerdata')">انضم كصاحب مشروع</span>
            </v-btn>
          </v-col>

          <v-divider></v-divider>

          <v-col cols="12">
            <v-card-text>
              
<i class="fa fa-cog fa-lg" aria-hidden="true" style="color:black" ></i>

              <a class="size" @click="$router.push('/editPassword')">  تعديل كلمه المرور</a><br/>
<br/>
              <i class="fa fa-power-off fa-lg" aria-hidden="true"  style="color:black"></i>
              <a class="size" @click="$router.push('/login')">  تسجيل الخروج </a>
            </v-card-text>
          </v-col>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    nodeHost()
{
  return this.$store.state.nodeHost 
}      
   
  },

  methods: {
    logout() {
      this.$store.commit("removeCurrentUser");
     setTimeout(() => {
        this.$router.push("/reglogin").catch(() => {});
      }, 10);
    },
    
    changePhoto(){
this.profilephoto=this.$refs.profileUpload.files[0]
var form=new FormData();
console.log("profile function starts")
form.append("profile",this.profilephoto)
form.set("email",this.$store.state.currentUser.email)
console.log(this.$store.state.currentUser.email)
this.$store.dispatch("profilePhoto",form)
    }
    
  },
  data:()=>({
profilephoto:[] 
  })
  
}

</script>

<style scoped>
img {
  border-radius: 50%;
}
.size {
  font-size: 20px;
  font-weight: bold;
}
.x {
  margin-right: 20%;
  font-weight: bold;
}
.username {
  font-weight: bold;
  font-size: 20px;
  margin-right: 33%;
}
.btn1 {
  margin-right: 10%;
  width: 80%;
}
.mos {
  color: beige;
}
#profilePhoto{
   opacity: 0;
    z-index: inherit;
}
#file{
  height: 300px;
  
}
#fileUpload{
  text-align: center;
}
</style>
