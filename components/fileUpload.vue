
<template>


<div class="app">
<form   enctype="multipart.form/data">
<v-col cols="12" >


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
    ...Choose file <br/>
</span>
</span>

<input
type="file"
ref="upload"
@change="dropFiles"
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
    <!--  -->







    
</v-col> 
</form>
    

<form   enctype="multipart.form/data">
<v-col cols="12" >
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
    ...Choose file <br/>
</span>
</span>

<input
type="file"
ref="upload"
@change="dropFiles"
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
    </v-col>
 </form>       
</div>

</template>
<script>
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
export default {
  name:"fileUpload",
  methods:{
dropFiles(){
    this.image= this.$refs.upload.files[0]
    console.log(this.image)
},
async sendServer(){
    var formdata=new FormData();
    formdata.append('file',this.image)
   
   await this.$axios.post('http://localhost:3000/api/image',formdata)
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
    image:[]
  })
}

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
#message{
font-weight:bold;
font-size: large;
color:black
}

</style>