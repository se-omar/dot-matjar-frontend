<template>
  <div>
    <input :disabled="disabled" type="color" id='color' v-model="color" >
    <v-btn  @click="colorName">X</v-btn>
  </div>
</template>
<script>
export default {
  data:()=>({
color:'',
disabled:true
  }),
  methods:{
    colorName(){
      console.log(this.color)
      this.disabled = false

    }
  }
  
}
</script>