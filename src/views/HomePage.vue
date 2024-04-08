<template>
  <div class="home">
    <b-form-input v-model="content" placeholder="search"></b-form-input>
    <b-button variant="primary" @click="search">Search</b-button>
    <div v-for="n in news" :key="n.author" class="border">
      <h1>{{n.title}}</h1>
      <p>{{n.text.substring(0,24) + "..." }}<p/>
      <h3>{{n.category}}</h3>
      <h3>Created: {{ (new Date(n.date)).toISOString().slice(0,19).replace('T',' | ')}}</h3>
      <b-button variant = "dark" v-bind:id="n.id" @click="preview($event)">Opsirnije</b-button>
      <b-button variant = "success" v-bind:id="n.id">Like</b-button>
      <b-button variant = "danger" v-bind:id="n.id">Dislike</b-button>

    </div>

  </div>
</template>

<script>
export default {
  name: "HomePage",
  data(){
    return{
      news:[],
      content:'',
      something:[],
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
    fetch('http://localhost:8080/api/news', {method: 'get'}).then((response) => {
      return response.json()
    }).then((jsonData) => {
      this.news = jsonData;

      this.news.sort(function(a,b){
        var keyA = a.date,
            keyB = b.date;
        if(keyA>keyB) return -1;
        if(keyA<keyB) return 1;
        return 0;
      });

    });

    this.$axios.get('/api/news/test').then((response)=>{
      if(localStorage.getItem("cookie") === '' || localStorage.getItem("cookie") === null) {
        localStorage.setItem(response.data.name, response.data.value);
      }
    });

  },
  methods:{
    search(){
      this.$axios.get(`/api/news/find/${this.content}`).then((response)=>{
        this.news=response.data

        this.news.sort(function(a,b){
          var keyA = a.date,
              keyB = b.date;
          if(keyA>keyB) return -1;
          if(keyA<keyB) return 1;
          return 0;
        });

      })
    },
    preview(event){
      const id = event.currentTarget.id

      const value = localStorage.getItem("cookie")

      var size = 0;

      this.$axios.get(`/api/news/cookie/${value}/${id}`).then((response)=>{
        size = response.data.length
      }).then(()=>{
        this.$axios.get(`/api/news/${id}`).then((response)=>{
          this.id=response.data.id
          this.title=response.data.title
          this.text=response.data.text
          this.author=response.data.author
          this.date=response.data.date
          this.category=response.data.category
          this.tags=response.data.tags
          this.count = response.data.count
        }).then(()=>{
          if(size===0){
            this.$axios.put('api/news',{
              id:this.id,
              title:this.title,
              text:this.text,
              author:this.author,
              date:this.date,
              category:this.category,
              tags:this.tags,
              count:(this.count+1)
            }).then(()=>{
              this.$axios.post("/api/news/cookie/",{
                value:value,
                newsId:id
              })
            })
          }
        })
      })


      this.$router.push(`/preview/${id}`)

    }
  }
}
</script>

<style scoped>

</style>