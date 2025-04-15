<template>
     <div>
    <Menu />
    <div class="main-content">
      <h1>Bem-vindo(a) a Secretaria Digital!</h1>
      <div class="search-bar">
        <input type="search" placeholder="Digite o nome da criança..." /><i class="bi bi-search"></i>
        <div class="filter">
          <i class="bi bi-funnel"></i>
        </div>
      </div>
    </div>
  </div>    
        
        
        
    
</template>

<script>
import Menu from "../sideBar/menu.vue"
export default {
  components: {
    Menu,
  },
};
</script>

<style scoped>
.main-content {
  margin-left: 200px;
  padding: 1rem;     
  width: calc(100% - 150px) 
}

.search-bar {
  margin-top: 1rem;
  border-radius: .5rem;
  position: relative;
  
}


.search-bar i {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  pointer-events: none;
}

input::placeholder{
  color: #fff;
}

.search-bar input[type="search"] {
  width: 40%;
  padding: 0.5rem;
  padding-left: 3rem;
  border: 1px solid #ccc;
  border-radius: .7rem 0rem 0rem .7rem;
   border-right: none; 
  outline: none;
  transition: border-color 0.3s ease;
  background-color: #118678;
  color: #fff;
}

.search-bar input[type="search"]:focus {
  border-color: #22C574;
}

.filter{
  background-color: #118678;
}

.filter i{
  margin-left: 43.3rem;
  color: #fff;
   background-color: #118678;
   padding: .44rem;
   border-radius: 0rem .7rem .7rem 0rem;
}
</style>