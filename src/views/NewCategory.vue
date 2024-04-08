<template>
  <div class="pt-5">
    <form @submit.prevent="send">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="name" type="text" class="form-control" id="name" aria-describedby="usernameHelp" placeholder="Enter name">
      </div>
      <div class="form-group">
        <label for="description">Text</label>
        <input v-model="description" type="text" class="form-control" id="description" aria-describedby="usernameHelp" placeholder="Enter description">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewCategory",
  data(){
    return{
      name:'',
      description:'',

    }
  },
  methods:{
    send(){
      this.$axios.post('/api/categories', {
        name: this.name,
        description: this.description,
      }).then(response => {
        console.log(response)
        this.$router.push({name: 'Kategorije'});
      }).catch(()=>{
        alert("Kategorija vec postoji")
      });
    }
  }
}
</script>

<style scoped>

</style>