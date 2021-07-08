<template>
    <div>
        <h2>Registro de usuário!</h2>
        <hr>
        <div class="columns is-centered">
            <div class="columns is-1">
                <div class="column">
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
    export default{
        data() {
            return {
                name:'',
                email:'',
                password:''
            }
        },
        methods: { //json de metodos 
            register(){
            console.log(this.name);
            console.log(this.email);
            console.log(this.password);
        }
        }

        
    }

</script>

<style scoped>

</style>