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
        
        <td>
          <router-link :to="{name: 'UsersEdit', params:{id: user.id}}"><button class="button is-warning">Editar</button> </router-link> <button class="button is-danger" @click="showModalUser(user.id)">Deletar</button></td>
    </tr>
  </tbody>
</table>

<div :class="{modal: true, 'is-active': showModal}">
  <div class="modal-background"></div>
  <div class="modal-content">
  <div class="card">
  <div class="card-content">
    <div class="content">
      <p>Se você deletar o usuário ele será removido da base de dados e perderá todos os dados tem certeza?</p>
    </div>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item" @click="hideModal()">Cancelar</a>
    <a href="#" class="card-footer-item" @click="deleteUser()">Delete</a>
  </footer>
</div>
  
    
  </div>
  <button class="modal-close is-large" aria-label="close" @click="hideModal()"></button>
</div>

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
            users: [],
            showModal: false,
            deleteUserId: -1
        }
    },
    methods: {
      hideModal(){
        this.showModal = false;
      },
      showModalUser(id) {
        console.log("id do usuario" + id);
        this.deleteUserId = id;
        this.showModal = true;
      },
      deleteUser(){
            var req = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }

        axios.delete("http://localhost:8686/user/" + this.deleteUserId, req).then(res =>{
          console.log(res);
           this.showModal = false;
             axios.get("http://localhost:8686/user",req).then(res => {
                console.log(res);
                  this.users = res.data;
        }).catch(err =>{
            console.log(err);
        })
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        }).catch(err =>{
          console.log(err);
          this.showModal = false;
        })
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
