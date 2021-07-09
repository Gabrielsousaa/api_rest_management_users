<template>
<div>
    <h1>PAINEL DE ADIMINISTRAÇÃO</h1>
<table class="table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Nome</th>
      <th>Email</th>
      <th>Cargo</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="user in users" :key="user.id">
        <td>{{user.id}}</td>
        <td>{{user.name}}</td>
        <td>{{user.email}}</td> 
        <td>{{user.role | processRole}}</td>
        
        <td><button class="button is-warning">Editar</button><button class="button is-danger">Deletar</button></td>
    </tr>
  </tbody>
</table>

</div>
</template>

<script>
import axios from 'axios';
export default {
    created() {
            var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        axios.get("http://localhost:8686/user",req).then(res => {
            console.log(res);
            this.users = res.data;
        }).catch(err =>{
            console.log(err);
        })
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    },
    data() {
        return{
            users: []
        }
    },
        filters: {
            processRole: function(value){
                 if (value == 0){
                     return "Usuário comum!"
                 }else if(value == 1 ){
                     return "ADM"
                 }
             }

         }
  }
    </script>

<style scoped>

</style>
