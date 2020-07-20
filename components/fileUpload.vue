
<template>


<div class="app">
<form   enctype="multipart.form/data">
<v-row>



<!-- First photo -->



 <v-col lg="4" sm="2" md="1">

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
    الرخصه <br/>
</span>
</span>

<input
type="file"
ref="upload1"
@change="dropFiles"
class="file-input"
id="input"
 /> <br/>
<span class="fileName" v-if="image1">{{image1.name}}</span>
</label>
</div>
   
  <v-btn @click="sendServer"> 
            Send
        </v-btn>


</div>
</v-card>
   </v-col>





<!-- Socond photo -->


 <v-col lg="4" sm="2" md="1">

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
    الرخصه <br/>
</span>
</span>

<input
type="file"
ref="upload2"
@change="dropFiles"
class="file-input"
id="input"
 /> <br/>
<span class="fileName" v-if="image2">{{image2.name}}</span>
</label>
</div>
   
  <v-btn @click="sendServer"> 
            Send
        </v-btn>


</div>
</v-card>
   </v-col>



<!-- Third photo -->



 <v-col lg="4" sm="2" md="1">

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
    الرخصه <br/>
</span>
</span>

<input
type="file"
ref="upload3"
@change="dropFiles"
class="file-input"
id="input"
 /> <br/>
<span class="fileName" v-if="image3">{{image3.name}}</span>
</label>
</div>
   
  <v-btn @click="sendServer"> 
            Send
        </v-btn>


</div>
</v-card>
   </v-col>







</v-row>

</form> 




   
 
 
 
</div>

</template>
<script>
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
export default {
    
  name:"fileUpload",
  methods:{
dropFiles(){
    
   this.image1=this.$refs.upload1.files[0]
    this.image2=this.$refs.upload2.files[0]
    this.image3=this.$refs.upload3.files[0]
    this.images = [this.image1 , this.image2 , this.image3]
    this.$store.state.images=this.images
},
 sendServer(){
    var formdata=new FormData();
   this.images.forEach(element => {
        formdata.append('file',element)
    });

    this.$axios.post('http://localhost:3000/api/image',formdata)
    .then(data =>{
        this.message="Image uploaded sucssfully"
        console.log(data.data)
    }).catch(err=>{
        this.message="Error occured , Please upload again"
        console.log(err)
    })
}

  },
  data:()=>({
   message:"",
    error:false,
    image1:[],
    image2:[],
    image3:[],
    images:[]
    
    
    
  })
}

</script>

<style  scoped>
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

</style>