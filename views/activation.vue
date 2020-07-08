<template>
 <div>
    

<v-card-actions class="justify-center">
  
<div  class="text-xs-center">
    <h2>Click to activate</h2>
    <v-btn x-large color="success" dark @click="activation">Activate</v-btn>
          
</div>
</v-card-actions>



</div>
</template>

<script>
export default {
    name:"activation",
    methods:{
        activation(){
          alert("Sucessfuly activated")
            this.$router.push('/login')
            this.$store.dispatch('activation')
        },
    
   
    },
    data:()=>({
     
    })
};


</script>

<style scoped>

</style>