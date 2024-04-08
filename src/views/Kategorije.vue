<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b-table striped hover :items = "categories" :fields="fields">
            <template v-slot:cell(actions)="row">
              <b-button variant="dark" @click="sendCategoryName(row.item.name)">Look</b-button>
              <b-button variant="info" @click="edit(row.item.id)">Edit</b-button>
              <b-button variant="danger" @click="deleteItem(row.item)">Delete</b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
    <b-button variant="info" v-on:click="next">New Category</b-button>
  </div>
</template>

<script>
export default {
  name: "Kategorije",
  data(){
    return{
      categories:[],
      news:[],
      fields:["name","description","actions"],
    }
  },
  mounted(){
    fetch('http://localhost:8080/api/categories', {method:'get'}).then((response)=>{
      return response.json()
    }).then((jsonData) => {
      this.categories = jsonData;
    });

    fetch('http://localhost:8080/api/news', {method:'get'}).then((response)=>{
      return response.json()
    }).then((jsonData) => {
      this.news = jsonData;
    });

  },
  methods:{
    deleteItem(item) {
      var exists = false
      for (var i = 0; i < this.news.length; i++) {
        if (this.news[i].category === item.name) {
          exists = true;
          break;
        }
      }
      if (exists===false) {

      this.$axios.delete(`/api/categories/${item.id}`).then((response) => {
        console.log(response);
        const index = this.categories.indexOf((x) => x.id === item.id);
        this.categories.splice(index, 1);
      })
    } else{
        alert("Ova kategorija ima vesti!")
      }
    },
    edit(id){
      this.$router.push(`/category/${id}`)
    },
    next(){
      this.$router.push({name:"NewCategory"})
    },
    sendCategoryName(name){
        this.$router.push(`/home/${name}`)
      }
    }
}
</script>

<style scoped>

</style>