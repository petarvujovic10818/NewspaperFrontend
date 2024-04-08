<template>
  <div id="nav">
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item v-if="logedin===false"><router-link to="/homepage">HomePage</router-link></b-nav-item>
        <b-nav-item v-if="logedin===false"><router-link to="/najcitanije">Najcitanije</router-link></b-nav-item>
        <b-nav-item v-if="logedin"><router-link to="/">Vesti</router-link></b-nav-item>
        <b-nav-item v-if="logedin"><router-link to="/categories">Kategorije</router-link></b-nav-item>
        <b-nav-item v-if="logedin===false"><router-link to="/login">Login</router-link></b-nav-item>
        <b-nav-item v-if="logedin && tip==='ADMIN'"><router-link to="/admin">Users</router-link></b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>
      <b-button v-if="logedin" v-on:click="clear">log out</b-button>
      <h1 v-if="logedin">Hi: {{user}}</h1>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      logedin:false,
      user:null,
      tip:null
    }
  },
  beforeUpdate() {
    if(!(localStorage.getItem('jwt') === '')){
      this.logedin = true
      const jwt = localStorage.getItem('jwt');
      const payload = JSON.parse(atob(jwt.split('.',)[1]));
      const username = payload.email
      const type = payload.tip
      this.user = username
      this.tip = type
    }

  },
  methods:{
    clear(){
      localStorage.setItem('jwt','');
      this.logedin=false
      this.$router.push({name:"Login"})
    },
    search(){

    }
  },

}
</script>

<style scoped>

</style>