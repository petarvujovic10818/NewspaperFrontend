<template>
  <div class="home container">
    <b-button v-if="loged" variant="primary" v-on:click="add">Add</b-button>
    <b-form-input v-if="loged" v-model="content" placeholder="search"></b-form-input>
    <b-button v-if="loged" variant="primary" @click="search">Search</b-button>
    <div v-for="n in news" :key="n.author" class="border">
      <h1>{{n.title}}</h1>
      {{n.text.substring(0,24) + "..." }}
      <h2>by:{{n.author}}</h2>
      <h3>Time: {{ (new Date(n.date)).toISOString().slice(0,19).replace('T',' | ')}}</h3>
      <b-button variant = "dark" v-bind:id="n.id" @click="preview($event)">Opsirnije</b-button>
      <b-button v-if="loged" variant="info" v-bind:id="n.id" @click="edit($event)">Edit</b-button>
      <b-button v-if="loged" variant="danger" v-bind:id="n.id" v-on:click="deleteItem($event)">Delete</b-button>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      news: [],
      loged: false,
      prevRoute: '',
      content: '',
      perPage: 2,
      currentPage: 1,
      ip:''
    }
  },
  computed:{
    rows(){
      return this.news.length;
    }
  },
  mounted() {
    if(this.prevRoute === 'Kategorije') {
      const myName = this.$route.params.name
      this.$axios.get(`/api/news/this/${myName}`).then((response) => {
        this.news = response.data
      })
    }

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

    // fetch('https://api.ipify.org?format=json')
    //     .then(x => x.json())
    //     .then(({ ip }) => {
    //       console.log(ip)
    //     });

    console.log(navigator.userAgent)

  },

  methods: {
    add() {
      this.$router.push({name: "NewNews"})
    },
    deleteItem(event) {
      const id = event.currentTarget.id

      this.$axios.delete(`/api/news/${id}`).then((response) => {
        console.log(response);

        //const index = this.news.indexOf((x) => x.id === id);
        //console.log(index)
        //this.news.splice(index, 1);

        for(let i=0;i<this.news.length;i++){
          if(this.news[i].id === id){
            this.news.splice(i,1);
            break;
          }
        }

      });

      this.$axios.delete(`/api/comments/${id}`).then((response)=>{
        console.log(response);
      });

    },
    edit(event){
      const id = event.currentTarget.id
      this.$router.push(`/new/${id}`)
    },
    search(){
      this.$axios.get(`/api/news/find/${this.content}`).then((response)=>{
        this.news=response.data

      })
    },
    preview(event){
      const id = event.currentTarget.id
      this.$router.push(`/preview/${id}`)

    }
  },
    created() {
      if (!(localStorage.getItem('jwt') === '')) {
        this.loged = true
      }
    },
  beforeRouteEnter(to, from, next){
      next(vm=>{
        vm.prevRoute = from.name
      })
  },
}
</script>
