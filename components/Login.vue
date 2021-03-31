<template v-slot:default>
  <div class="content">
      <div class="form">
        <!-- Email -->
        <div class="field">
          <div style="text-align: left">
            <label class="label is-small ">Email</label>
            <div class="control has-icons-left">
              <input
                class="input is-small"
                type="email"
                name="email" 
                v-model="email"
              />
              <span class="icon is-small is-left">
                <font-awesome-icon icon="envelope" />
              </span>
            </div>
          </div>
        </div><!-- Email -->
        <div class="field">
          <div style="text-align: left">
            <label class="label is-small">Password</label>
            <div class="control has-icons-left">
              <input
                class="input is-small"
                type="password"
                name="pass" 
                v-model="pass"
              />
              <span class="icon is-small is-left">
                <font-awesome-icon icon="key" />
              </span>
            </div>
          </div>
        </div>
        <div class="control">
          <p class="error">{{errorMessege}}</p>
          <button @click="login" class="button is-primary" :disabled="disableLogin">
            Login
          </button>
          <p class="register">Not registered? <a href="./register">Apply now</a></p>
        </div>
      </div>
  </div>
</template>
<script>
import Airtable from 'airtable'
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            pass: '',
            errorMessege: '',
            processing: false
        }
    },
    computed:{
        disableLogin(){
            return this.processing ? true : false
        }
    },
    methods:{
        login(){          
            this.errorMessege = '';
            this.processing = true;
            var _ = this;
            var data = JSON.stringify({"auth_task":"auth_login","auth_eml":this.email,"auth_pw":this.pass});
            var config = {
                method: 'post',
                url: 'http://localhost:8888/.netlify/functions/at_auth',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
            };

            this.$axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response));
                    _.$store.commit('setUserData', response.data);
                    _.processing = false;
                })
                .catch(function (error) {
                    _.errorMessege = 'Invalid Email or Password';
                    console.log(error);
                    _.processing = false;
                });
        }
    }
    
}
</script>
<style scoped>
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form button {
  margin: 15px 0 0;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .register {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .register a {
  color: #4CAF50;
  text-decoration: none;
}
.form .error {
  margin: 15px 0 0;
  color: #FF0000;
  font-size: 12px;
}
.form .error a {
  color: #FF0000;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
</style>
