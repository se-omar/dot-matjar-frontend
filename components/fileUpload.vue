
<template>

<form   enctype="multipart.form/data">
<div class="app">
    <v-card>
  
        
    <!-- <div class="uploader">
   
       <v-avatar for="file" tile color="white" >

      <svg for="file" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"    width="48" height="48"   viewBox="0 0 172 172"  style=" fill:#000000;"><defs><linearGradient x1="51.03383" y1="29.9495" x2="108.11633" y2="138.65708" gradientUnits="userSpaceOnUse" id="color-1_qZ1FibjKOsRJ_gr1"><stop offset="0" stop-color="#00c6ff"></stop><stop offset="1" stop-color="#0072ff"></stop></linearGradient></defs><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g><path d="M172,93.16667c0,23.7575 -19.2425,43 -43,43c-6.45,0 -88.365,0 -94.95833,0c-18.8125,0 -34.04167,-15.22917 -34.04167,-34.04167c0,-16.26833 11.395,-29.885 26.69583,-33.25333c6.09167,-25.11917 28.7025,-43.78833 55.72083,-43.78833c19.74417,0 37.12333,9.96167 47.44333,25.11917c23.36333,0.43 42.14,19.49333 42.14,42.96417z" fill="url(#color-1_qZ1FibjKOsRJ_gr1)"></path><path d="M75.25,87.58025v25.08333c0,3.95958 3.20708,7.16667 7.16667,7.16667h7.16667c3.95958,0 7.16667,-3.20708 7.16667,-7.16667v-25.08333h9.48867c4.78733,0 7.18817,-5.79067 3.80192,-9.17692l-18.97375,-18.97375c-2.79858,-2.79858 -7.33508,-2.79858 -10.13367,0l-18.97375,18.97375c-3.38625,3.38625 -0.989,9.17692 3.80192,9.17692z" fill="#000000" opacity="0.05"></path><path d="M77.04167,85.78858v26.875c0,2.967 2.408,5.375 5.375,5.375h7.16667c2.967,0 5.375,-2.408 5.375,-5.375v-26.875h10.82525c3.36117,0 5.04533,-4.0635 2.66958,-6.44283l-18.37892,-18.3825c-2.24675,-2.24675 -5.891,-2.24675 -8.13775,0l-18.37892,18.3825c-2.37575,2.37575 -0.69517,6.44283 2.66958,6.44283z" fill="#000000" opacity="0.07"></path><path d="M66.67508,83.99692h12.15825v28.66667c0,1.978 1.60533,3.58333 3.58333,3.58333h7.16667c1.978,0 3.58333,-1.60533 3.58333,-3.58333v-28.66667h12.15825c1.935,0 2.9025,-2.33992 1.53367,-3.70517l-17.78767,-17.78767c-1.69492,-1.69492 -4.44692,-1.69492 -6.14183,0l-17.78767,17.78767c-1.36883,1.36525 -0.40133,3.70517 1.53367,3.70517z" fill="#ffffff"></path></g></g></svg>
    
    </v-avatar><br/>

    <label for="file" class="parag">قم بسحب و ادراج السجل التجاري</label><br/>
    <input  id="file" @change="sendFiles" ref="upload" type="file"  /><br/>


</div> -->
      <div class="uploader">
          
<div class="file is-boxed is-primary">
<label class="file-label">





<span class="file-cta">
<span class="file-icon">
    

<i class="fas fa-upload  fa-2x " style="color:blue"></i> <br/>


</span>
<span class="file-label" style="font-weight:bold">
    ...Choose file <br/>
</span>
</span>

<input
type="file"
ref="upload"
@change="sendFiles"
class="file-input"
id="input"
 /> <br/>
<span class="fileName" v-if="image">{{image.name}}</span>
</label>
</div>
      
  <v-btn @click="sendServer"> 
            Send
        </v-btn>


</div>
     





   
    </v-card>
    
      
        
</div>
</form>
</template>
<script>
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
export default {
  name:"fileUpload",
  methods:{
sendFiles(){
    this.image= this.$refs.upload.files[0]
    console.log(this.image)
},
async sendServer(){
    var formdata=new FormData();
    formdata.append('file',this.image)
   
   await this.$axios.post('http://localhost:3000/api/image',formdata)
    .then(data =>{
        console.log(data.data)
    })
}

  },
  data:()=>({
   
    
    image:[]
  })
}
// <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
</script>

<style  scoped>
.uploader{
    text-align: center;
    background-color:oldlace;
    
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

</style>