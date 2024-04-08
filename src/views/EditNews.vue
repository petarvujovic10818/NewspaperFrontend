<template>
  <div class="pt-5">
    <form @submit.prevent="update">
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="title" type="text" class="form-control" id="title" aria-describedby="usernameHelp" placeholder="Enter title">
      </div>
      <div class="form-group">
        <label for="text">Text</label>
        <input v-model="text" type="text" class="form-control" id="text" aria-describedby="usernameHelp" placeholder="Enter text">
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <input v-model="category" type="text" class="form-control" id="category" aria-describedby="usernameHelp" placeholder="Enter category">
      </div>
      <div class="form-group">
        <label for="tags">Tags</label>
        <input v-model="tags" type="text" class="form-control" id="tags" aria-describedby="usernameHelp" placeholder="Enter tags">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditNews",
  data(){
    return{
      id:null,
      title:'',
      text:'',
      author:'',
      date:null,
      category:'',
      tags:'',
      count:null
    }
  },
  mounted(){
    const myId = this.$route.params.id
    this.$axios.get(`/api/news/${myId}`).then((response)=>{
      this.id=response.data.id
      this.title=response.data.title
      this.text=response.data.text
      this.author=response.data.author
      this.date=response.data.date
      this.category=response.data.category
      this.tags=response.data.tags
      this.count = response.data.count
    })
  },
  methods:{
    update(){
      this.$axios.put('api/news',{
        id:this.id,
        title:this.title,
        text:this.text,
        author:this.author,
        date:this.date,
        category:this.category,
        tags:this.tags,
        count:this.count
      }).then((response)=>{
        console.log(response)
        this.$router.push({name:"Home"})
      })
    }
  }
}
</script>

<style scoped>

</style>