<template>
  <div class="pt-5">
    <form @submit.prevent="send">
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="title" type="text" class="form-control" id="title" aria-describedby="usernameHelp" placeholder="Enter title">
      </div>
      <div class="form-group">
        <label for="text">Text</label>
        <input v-model="text" type="text" class="form-control" id="text" aria-describedby="usernameHelp" placeholder="Enter text">
      </div>
      <b-form-group id="input-group-3" label="Category" label-for="input-3">
        <b-form-select
            id="input-3"
            v-model="category"
            :options="combobox"
            required
        ></b-form-select>
      </b-form-group>
      <div class="form-group">
        <label for="tags">Text</label>
        <input v-model="tags" type="text" class="form-control" id="tags" aria-describedby="usernameHelp" placeholder="Enter tags">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewNews",
  data(){
    return{
      title:'',
      text:'',
      author:'',
      category: '',
      tags:'',
      categories:[],
      combobox:[]
    }
  },
  methods:{
    send(){
      const jwt = localStorage.getItem('jwt');
      const payload = JSON.parse(atob(jwt.split('.',)[1]));
      const author = payload.email;
      const time = new Date();
      const localTime = time.getTime()
      const localOffset = time.getTimezoneOffset()*60000;
      const finalTime = localTime + localOffset + 3600000 * 4

      this.$axios.post('/api/news', {
        title: this.title,
        text: this.text,
        author: author,
        date: finalTime,
        category: this.category,
        tags:this.tags
      }).then(response => {
        console.log(response)
        this.$router.push({name: 'Home'});
      });

    }
  },
  mounted(){
    this.$axios.get('/api/categories').then((response)=>{
      this.categories = response.data
      for(var i=0;i<this.categories.length;i++){
        this.combobox.push(this.categories[i].name);
      }
    })
  }
}
</script>

<style scoped>

</style>