<template>
  <div class="pt-5">
    <h1>{{email}}</h1>
    <form @submit.prevent="update">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="name" type="text" class="form-control" id="name" aria-describedby="usernameHelp" placeholder="Enter name">
      </div>
      <div class="form-group">
        <label for="surname">Surname</label>
        <input v-model="surname" type="text" class="form-control" id="surname" aria-describedby="usernameHelp" placeholder="Enter surname">
      </div>
      <b-form-group id="input-group-3" label="Tip" label-for="input-3">
        <b-form-select
            id="input-3"
            v-model="tip"
            :options="combobox2"
            required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-3" label="Status" label-for="input-3">
        <b-form-select
            id="input-3"
            v-model="status"
            :options="combobox"
            required
        ></b-form-select>
      </b-form-group>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" type="text" class="form-control" id="password" aria-describedby="usernameHelp" placeholder="Enter password">
      </div>

      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditUser",
  data(){
    return{
      email:'',
      name:'',
      surname:'',
      tip:'',
      status:'',
      password:'',
      combobox:['ACTIVE','INACTIVE'],
      combobox2:['ADMIN','CONTENT_CREATOR']

    }
  },
  mounted(){
    const headers = {Authorization: 'Bearer ' + localStorage.getItem('jwt')};
    const mail = this.$route.params.email
    this.$axios.get(`/api/users/${mail}`,{
      headers:headers
    }).then((response)=>{
      this.email=response.data.email
      this.name=response.data.name
      this.surname=response.data.surname
      this.tip=response.data.tip
      this.status=response.data.status
      this.password=response.data.password
    })
  },
  methods:{
      update(){
        const headers = {Authorization: 'Bearer ' + localStorage.getItem('jwt')};
        this.$axios.put('api/users',{
          email:this.email,
          name:this.name,
          surname:this.surname,
          tip:this.tip,
          status:this.status,
          password:this.password
        },{
          headers:headers
        }).then((response)=>{
          console.log(response)
          this.$router.push({name:"Admin"})
        })
      }
  }

}
</script>

<style scoped>

</style>