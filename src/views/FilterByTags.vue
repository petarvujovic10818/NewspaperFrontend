<template>
  <div class="home">
    <b-form-input v-model="content" placeholder="search"></b-form-input>
    <b-button variant="primary" @click="search">Search</b-button>
    <div v-for="n in news" :key="n.author" class="border">
      <h1>{{n.title}}</h1>
      <p>{{n.text.substring(0,24) + "..." }}<p/>
      <h3>Created: {{ (new Date(n.date)).toISOString().slice(0,19).replace('T',' | ')}}</h3>
      <b-button variant = "dark" v-bind:id="n.id" @click="preview($event)">Opsirnije</b-button>
    </div>

  </div>
</template>

<script>
export default {
  name: "FilterByTags",
  data(){
    return{
      news:[],
      content:''
    }
  },
  mounted(){
    const tag =  this.$route.params.tag

    this.$axios.get(`api/news/that/${tag}`).then((response)=>{
      this.news = response.data
    });

    this.news.sort(function(a,b){
      var keyA = a.date,
          keyB = b.date;
      if(keyA>keyB) return -1;
      if(keyA<keyB) return 1;
      return 0;
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
      this.$router.push(`/preview/${id}`)
    }
  }
}
</script>

<style scoped>

</style>