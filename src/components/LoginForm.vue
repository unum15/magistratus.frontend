<template>
  <div class="login-wrapper border border-light">
    <div style="max-width:330px;margin: 0 auto;">
      <img alt="logo" src="../assets/logo.png" style="height:100px" />
      <p>
        Welcome to this new project
      </p>
    </div>
    <form class="form-signin" @submit.prevent="login">
      <h2 class="form-signin-heading">Please sign in</h2>
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <label for="inputEmail" class="sr-only">Login</label>
      <input v-model="userLogin" type="text" id="inputLogin" class="form-control" placeholder="Login" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      userLogin: '',
      password: '',
      error: false,
      settings: {}
    }
  },
  created () {
    this.$http.get('/status')
      .then(request => {
        if(request.data.status == 'active'){
          this.loginSuccessful(request)
        }
      })
  },
  methods: {
    login () {
      var form = this
      this.$http.post('/auth', { login: form.userLogin, password: form.password })
        .then(request => {
          if (!request.data.bearer_token) {
            this.loginFailed()
            return
          }
          form.loginSuccessful(request)
        })
        .catch(() => form.loginFailed())
    },
    loginSuccessful (req) {
      for (var prop in req.data) {
        //test for string?
        localStorage.setItem(prop, req.data[prop])
      }
      var perms = [];
      for (var role in req.data.roles) {
        for (var perm in req.data.roles[role].perms) {
          perms.push(req.data.roles[role].perms[perm].name)
        }
      }
      perms = perms.filter((value, index, perms) => (perms.indexOf(value) === index))
      localStorage.setItem('perms', perms.toString())
      this.error = false
      this.$router.push('/assignments')
    },

    loginFailed () {
      this.error = 'Login failed!'
    }

  }
}
</script>

<style lang="css">

.login-wrapper {
  background: #fff;
  width: 70%;
  margin: auto;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
