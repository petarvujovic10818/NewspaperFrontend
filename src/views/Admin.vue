<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
            <b-table striped hover :items = "users" :fields="fields">
              <template v-slot:cell(actions)="row">
                <b-button variant="info" @click="edit(row.item)">Edit</b-button>
                <b-button variant="danger" @click="deleteItem(row.item.email)">Delete</b-button>
                <b-button v-if="row.item.tip==='CONTENT_CREATOR'" variant="dark" @click="changeStatus(row.item)">*</b-button>
              </template>
            </b-table>
        </b-col>
      </b-row>
    </b-container>
    <b-button variant="info" v-on:click="next">New User</b-button>
  </div>
</template>

<script>

export default {
  name: "Admin",
  data(){
    return{
      users:[],
      fields:["email","name","surname","tip","status","password","actions"],
    }
  },
  //mounted: function(){
    //fetch('http://localhost:8080/api/users', {method:'get'}).then((response)=>{
      //return response.json()
    //}).then((jsonData) => {
      //this.users = jsonData;
    //});
  //},
  methods:{
    edit(user){
      console.log(user)
      this.$router.push(`/user/${user.email}`)
    },
    deleteItem(email){
      const headers = {Authorization: 'Bearer ' + localStorage.getItem('jwt')};
      this.$axios.delete(`/api/users/${email}`,{
        headers:headers
      }).then((response)=>{
        console.log(response);
        const index = this.users.indexOf((x)=>x.email===email);
        this.users.splice(index,1);
      })
    },
    next(){
      this.$router.push({name:"NewUser"})
    },
    changeStatus(user){
      const headers = {Authorization: 'Bearer ' + localStorage.getItem('jwt')};
      if(user.status==='ACTIVE'){
        user.status='INACTIVE'
      } else if(user.status==='INACTIVE'){
        user.status='ACTIVE'
      }

      this.$axios.put('api/users',{
        email:user.email,
        name:user.name,
        surname:user.surname,
        tip:user.tip,
        status:user.status,
        password:user.password
      },{
        headers:headers
      }).then((response)=>{
        console.log(response)
      })

    }
  },
  created(){
    const response = this.$axios.get('/api/users', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then((response)=>{
      this.users = response.data;
    });
    console.log(response)
  },
  beforeCreate() {
    if(localStorage.getItem('jwt') === ''){
      this.$router.push({name:"Login"})
    }
  }
}
</script>

<style scoped>

</style>