<template>
  <div class="home container">
    <div v-for="n in news" :key="n.author" class="border">
      <h1>{{n.title}}</h1>
      <p>{{n.text.substring(0,24) + "..." }}<p/>
      <h3>{{n.category}}</h3>
      <h3>Created: {{ (new Date(n.date)).toISOString().slice(0,19).replace('T',' | ')}}</h3>
      <b-button variant = "dark" v-bind:id="n.id" @click="preview($event)">Opsirnije</b-button>
    </div>

  </div>
</template>

<script>
export default {
  name: "Najcitanije",
  data(){
    return{
      news:[],
    }
  },
  mounted(){
    fetch('http://localhost:8080/api/news', {method: 'get'}).then((response) => {
      return response.json()
    }).then((jsonData) => {
      this.news = jsonData;

      this.news.sort(function(a,b){
        var keyA = a.count,
            keyB = b.count;
        if(keyA>keyB) return -1;
        if(keyA<keyB) return 1;
        return 0;
      });

    });
  },
  methods:{
    preview(event){
      const id = event.currentTarget.id
      this.$router.push(`/preview/${id}`)

    }
  }
}
</script>

<style scoped>

</style>