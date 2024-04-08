<template>
  <div class="pt-5 container">
    <h1 v-if="username">Hello, {{username}}</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="username" type="text" class="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter username">
        <small id="usernameHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>
  </div>
</template>


<script>
export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      tip:'',
    }
  },
  methods: {
    login() {
      this.$axios.post('/api/users/login', {
        username: this.username,
        password: this.password,
      }).then(response => {
        localStorage.setItem('jwt', response.data.jwt)
        const jwt = response.data.jwt
        const payload = JSON.parse(atob(jwt.split('.',)[1]));
        const type = payload.tip
        this.tip = type
          if (this.tip === 'ADMIN') {
            this.$router.push({name: 'Admin'});
          } else {
            this.$router.push({name: 'Home'})
          }

        console.log(response);
      }).catch(e =>{
        if(e.response.status===422){
          alert("Wrong email or password")
        }else if(e.response.status===423){
          alert("Your account is INACTIVE")
        }
      })

    }
  },
  //beforeCreate() {
    //if(!(localStorage.getItem('jwt') === '')){
      //this.$router.push({name:"Home"})
    //}
  //}

}
</script>

<style scoped>

</style>