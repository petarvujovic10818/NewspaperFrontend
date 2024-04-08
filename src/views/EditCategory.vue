<template>
  <div class="pt-5">
    <form @submit.prevent="edit">
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
  name: "EditCategory",
  data(){
    return{
      name:'',
      description:''
    }
  },
  mounted(){
    const myId = this.$route.params.id
    this.$axios.get(`/api/categories/${myId}`).then((response)=>{
      this.id=response.data.id
      this.name=response.data.name
      this.description=response.data.description
    })
  },
  methods:{
    edit(){
      this.$axios.put('api/categories',{
        id:this.id,
        name:this.name,
        description:this.description,

      }).then((response)=>{
        console.log(response)
        this.$router.push({name:"Kategorije"})
      })
    }
  }
}
</script>

<style scoped>

</style>