<template>
  <div  class="tool-bar">
    <v-app-bar class="red darken-2" dark dense >
      

      <v-toolbar-title>
        <v-btn  class="font" text @click="$router.push('/home').catch((err) => {})">E-Commerce</v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>
<!-- ============== Profile  -->


      <v-menu
        v-if="currentUser"
        transition="fab-transition"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
        class="menu"
        max-width="20%"
        min-width="300px"
       
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn   text dark v-bind="attrs" v-on="on">
              <v-icon color="white">mdi-account-circle</v-icon>
            <span class="font">Profile</span>
          </v-btn>
        </template>

        <v-card >
          <v-card-title class="ml-4" style="width:100">
            <v-img
              v-if="currentUser.profile_photo"
              style="width:70%; height:100%"
              id="picture"
              :src="nodeHost + currentUser.profile_photo"
            />
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

          </v-card-text>-->

          <div v-if="! currentUser.profile_photo" id="fileUpload" class="file is-boxed is-primary">
            <label class="file-label">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-camera fa-2x" style="color:blue"></i>
                  <br />
                </span>
                <span class="file-label" style="font-weight:bold">
                  Upload your photo here
                  <br />
                </span>
              </span>

              <input
                type="file"
                ref="profileUpload"
                @change="changePhoto"
                class="file-input"
                id="profilePhoto"
              />
              <br />
            </label>
          </div>

          <div v-if=" currentUser.profile_photo" id="fileUpload" class="file is-boxed is-primary">
            <label class="file-label">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fas fa-camera fa-2x" style="color:blue"></i>
                  <br />
                </span>
                <span class="file-label" style="font-weight:bold">
                  Change profile photo
                  <br />
                </span>
              </span>

              <input
                type="file"
                ref="profileUpload"
                @change="changePhoto"
                class="file-input"
                id="profilePhoto"
              />
              <br />
            </label>
          </div>

          <v-card-text>
            <v-row justify="center">
            <span  class="username">{{currentUser.full_arabic_name}}</span>
         </v-row>
          </v-card-text>
         
          <v-row>
            
          </v-row>
          <v-divider></v-divider>

          <!-- <v-col cols="12">
            <v-btn class="btn1" x-large color="blue">
              <span class="mos" @click="$router.push('/businessownerdata')">انضم كصاحب مشروع</span>
            </v-btn>
          </v-col> -->
            <v-col cols="12 ml-6  ">
            <v-btn class="btn1" x-large color="blue">
              <span class="mos" @click="$router.push('/myProducts')">My products</span>
            </v-btn>
          </v-col>

          <v-divider></v-divider>

          <v-col cols="12">
            <v-card-text>
              

          
  <a class="size" @click="$router.push('/editPassword')">Change your password <i class="fa fa-cog " aria-hidden="true" style="color:black"></i></a>  <br/>
<br/>

<a @click="$router.push('/completedata')" class="size">Update Info <i class="fas fa-edit" aria-hidden="true" style="color:black"></i></a>  
<br/>
           <br/> 
              <a class="size" @click="logout">Logout <i class="fa fa-power-off " aria-hidden="true"  style="color:black"></i>
 </a>
            </v-card-text>
          </v-col>
        </v-card>
      </v-menu>




<!-- ================= -->
      <v-btn class="font"
        v-if="!currentUser && !$vuetify.breakpoint.sm && !$vuetify.breakpoint.xs"
        text
        @click="$router.push('/reglogin').catch((err) => {})"
      >Register</v-btn>

     
      <v-btn
       class="font"
        v-if="currentUser && currentUser.user_type == 'business' && !$vuetify.breakpoint.sm && !$vuetify.breakpoint.xs"
        text
        @click="$router.push('/requestsPage').catch((err) => {})"
      >Requests</v-btn>

      <!-- <v-btn
      class="font"
        v-if="currentUser && currentUser.user_type == 'business' && !$vuetify.breakpoint.sm && !$vuetify.breakpoint.xs"
        text
        @click="$router.push('/myProducts').catch((err) => {})"
      >My Products</v-btn> -->

      <v-btn class="font" v-if="!$vuetify.breakpoint.sm && !$vuetify.breakpoint.xs" text>
        <span>About us</span>
      </v-btn>

      <!-- <v-btn
      class="font"
        v-if="currentUser && !$vuetify.breakpoint.sm && !$vuetify.breakpoint.xs"
        text
        @click="logout"
      >Logout</v-btn> -->

      <!--============================

      />-->
      <v-app-bar-nav-icon
        @click="drawer = true"
        v-if="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="$router.push('/home').catch((err) => {})">
              <span style="font-size: 17px">الصفحة الرئيسية</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if="currentUser">
            <v-list-item-icon>
              <v-icon>mdi-lock-reset</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="$router.push('/editPassword').catch((err) => {})">
              <span style="font-size: 17px">تغيير كلمة السر</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if="currentUser && currentUser.user_type == 'business'">
            <v-list-item-icon>
              <v-icon>mdi-email</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="$router.push('/requestsPage').catch((err) => {})">
              <span style="font-size: 17px">الطلبات</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if="currentUser && currentUser.user_type == 'business'">
            <v-list-item-icon>
              <v-icon>mdi-cart-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="$router.push('/myProducts').catch((err) => {})">
              <span style="font-size: 17px">منتجاتي</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if="!currentUser">
            <v-list-item-icon>
              <v-icon>mdi-account-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="$router.push('/reglogin').catch((err) => {})">
              <span style="font-size: 17px">التسجيل</span>
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-information</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <span style="font-size: 17px">عن الموقع</span>
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    nodeHost() {
      return this.$store.state.nodeHost;
    }
  },

  methods: {
    logout() {
      this.$store.commit("removeCurrentUser");
      
      setTimeout(() => {
        this.$router.push("/reglogin").catch(() => {});
      }, 10);
    },

    changePhoto() {
      this.profilephoto = this.$refs.profileUpload.files[0];
      var form = new FormData();
      console.log("profile function starts");
      form.append("profile", this.profilephoto);
      form.set("email", this.$store.state.currentUser.email);
      console.log(this.$store.state.currentUser.email);
      this.$store.dispatch("profilePhoto", form);
    }
  },
  data: () => ({
    profilephoto: [],
    drawer: false
  })
};
</script>

<style scoped>
.img {
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
  font-size: 25px;
  text-align: center;
  color:black
}
.btn1 {
  margin-right: 10%;
  width: 80%;
}
.mos {
  color: beige;
}
#profilePhoto {
  opacity: 0;
  z-index: inherit;
}
#picture {
  margin-right: 15%;
  border-radius: 50%;
  text-align: center;
}
#fileUpload {
  text-align: center;
}
.font{
color:white;
 font-size: 18px;
}

</style>
