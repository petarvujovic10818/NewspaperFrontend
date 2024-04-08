<template>
  <div>
    <div>
      <a>Read more</a>
    </div>
    <h1>{{this.title}}</h1>
    <h1>{{this.text}}</h1>
    <h1>{{this.author}}</h1>
    <h3>Time: {{ (new Date(this.date)).toISOString().slice(0,19).replace('T',' | ')}}</h3>
    <div>
      <b-button-group v-for="t in tagsArray" :key="t">
        <b-button variant="primary" @click="filter(t)">{{t}}</b-button>
      </b-button-group>
    </div>
    <b-button variant="dark" @click="addComment">Add Comment</b-button>
    <div v-for="c in comments" :key="c.id" class="border">
      <h1>{{c.author}}</h1>
      <h1>{{c.text}}</h1>
      <h3>Time: {{ (new Date(c.date)).toISOString().slice(0,19).replace('T',' | ')}}</h3>
      <h4>Likes:{{c.likes}}, Dislikes:{{c.dislikes}}</h4>
      <b-button variant="success" v-bind:id="c.id" @click="like($event)">Like</b-button>
      <b-button variant="danger" v-bind:id="c.id" @click="dislike($event)">Dislike</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PreviewNews",
  data(){
    return{
      id:null,
      title:'',
      text:'',
      author:'',
      date:null,
      category:'',
      tags:'',
      comments:[],
      tagsArray:[]
    }
  },
  methods:{
    addComment(){
      this.$router.push(`/add-comment/${this.id}`)
    },
    like(){
      this.likes++;
    },
    dislike(){
      this.dislikes++;
    },
    filter(event){
      this.$router.push(`/news/${event}`)
    }
  },
  mounted() {
    const myId = this.$route.params.id
    this.$axios.get(`/api/news/${myId}`).then((response)=>{
      this.id = response.data.id
      this.title = response.data.title
      this.text = response.data.text
      this.author = response.data.author
      this.date = response.data.date
      this.category = response.data.category
      //this.tags = response.data.tags
      this.tagsArray = response.data.tags.split(" ")
    })


    this.$axios.get(`/api/comments/${myId}`).then((response)=>{
      this.comments=response.data

      this.comments.sort(function(a,b){
        var keyA = a.date,
            keyB = b.date;
        if(keyA>keyB) return -1;
        if(keyA<keyB) return 1;
        return 0;
      });

    })

  }
}
</script>

<style scoped>

</style>