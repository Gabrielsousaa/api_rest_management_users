<template>
    <div>
        <h2>Login de usuário!</h2>
        <hr>
        <div class="columns is-centered">
            <div class="columns is-1">
                <div class="column">
                    <div v-if="error !=undefined">
                        <div class="notification is-danger">
                               {{error}}       
                        </div> 
                        <hr>     
                    </div>
                <p>Email:</p>
                <input type="text" placeholder= "Email" v-model="email" class="input">
                <p>Senha:</p>
                <input type="password" placeholder= "*******" v-model="password" class="input">
                <hr>
                <button class= "button is-success" @click="login">Logar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
    export default{
        data() {
            return {
                email:'',
                password:'',
                error: undefined
            }
        },
        methods: { //json de metodos 
            login(){
            axios.post("http://localhost:8686/login",{
                password: this.password,
                email: this.email
            
            }).then(res => {
            console.log(res);
            localStorage.setItem('token',res.data.token);
            this.$router.push({name:"Home"});
            
            }).catch(err => {
            var msgErro = err.response.data.err;
            this.error = msgErro; 
           

                 })
            }
        }
    }

</script>

<style scoped>

</style>