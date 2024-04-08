<template>
  <div class="pt-5">
    <form @submit.prevent="send">
      <div class="form-group">
        <label for="author">Author</label>
        <input v-model="author" type="text" class="form-control" id="author" aria-describedby="usernameHelp" placeholder="Enter author">
      </div>
      <div class="form-group">
        <label for="text">Text</label>
        <input v-model="text" type="text" class="form-control" id="text" aria-describedby="usernameHelp" placeholder="Enter text">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddComment",
  data(){
    return{
      author:'',
      text:'',
      date:null,
      newsId:null,
      likes:0,
      dislikes:0
    }
  },
  methods:{
    send(){

      this.newsId = this.$route.params.id
      const time = new Date();
      const localTime = time.getTime()
      const localOffset = time.getTimezoneOffset()*60000;
      const finalTime = localTime + localOffset + 3600000 * 4
      this.date = finalTime

      this.$axios.post('/api/comments',{
        author:this.author,
        text:this.text,
        date:this.date,
        news:this.newsId,
        likes:this.likes,
        dislikes:this.dislikes
      }).then((response)=>{
        console.log(response)
        this.$router.push(`/preview/${this.newsId}`)
      })

    }
  }
}
</script>

<style scoped>

</style>