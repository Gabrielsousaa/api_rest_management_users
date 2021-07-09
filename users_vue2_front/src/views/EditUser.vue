<template>
    <div>
        <h2>Editando usuários !</h2>
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
                <input type="email" placeholder= "Email" v-model="email" class="input">
                <hr>
                <button class= "button is-success" @click="update">Editar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
    export default{
        created(){
            var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }

            axios.get("http://localhost:8686/user/"+ this.$route.params.id, req).then(res=>{
                console.log(res);
                this.name = res.data.name;
                this.email = res.data.email;
                this.id = res.data.id;
            }).catch(err =>{
                console.log(err.response);
                this.$router.push({name:"Users"});
            })

        },
        data() {
            return {
                name:'',
                email:'',
                id: '',
                error: undefined
            }
        },
        methods: { //json de metodos 
            update(){

            var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
            axios.put("http://localhost:8686/user",{
                name: this.name,
                email: this.email,
                id: this.id
            
            },req).then(res => {
            console.log(res);
            this.$router.push({name:"Users"});
            
            }).catch(err => {
            var msgErro = err.response.data.err;
            this.error = msgErro; 
           

             })
         },

    }
}

</script>

<style scoped>

</style>