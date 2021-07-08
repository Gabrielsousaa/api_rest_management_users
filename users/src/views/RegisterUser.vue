<template>
    <div>
        <h2>Registro de usuário!</h2>
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
                <p>Nome:</p>
                <input type="text" placeholder= "Nome do usuário" v-model="name" class="input">
                <p>Email:</p>
                <input type="text" placeholder= "Email" v-model="email" class="input">
                <p>Senha:</p>
                <input type="text" placeholder= "*******" v-model="password" class="input">
                <hr>
                <button class= "button is-success" @click="register">Cadastrar</button>
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
                name:'',
                email:'',
                password:'',
                error: undefined
            }
        },
        methods: { //json de metodos 
            register(){
            axios.post("http://localhost:8686/user",{
                name: this.name,
                email: this.email,
                password: this.password
            
            }).then(res => {
            console.log(res);
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