<template>
 <div>
    <div class="menu-placeholder"></div>
      <div class="home-container">
          <div class="img-content">  
              <img src="../../assets/image/Logo.png" alt="">
          </div>
          <div class="menu-content">
              <div class="icone">
                  <i class="bi bi-house"></i>
                  <p>HOME</p> 
              </div>
              <div class="icone">
                  <i class="bi bi-clipboard-check"></i>
                  <p>NOVA MATRICULA</p>
              </div>
                  <router-link class="menuText" to="/frequenciaAtividade">
                    <div class="icone">
                      <i class="bi bi-person-fill-add"></i>
                      <p>REGISTRO DE PRESENÇA</p>
                    </div>
                  </router-link>
              </div>
              <div class="exit">
                  <i class="bi bi-box-arrow-left">
                  </i><p>SAIR</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        
    },
}
</script>

<style scoped>

.menu-placeholder {
  width: 150px;
  height: 100vh;
  float: left;
}


.home-container {
  width: 150px;
  height: 100vh;
  background-color: #22C574;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}

.img-content img {
  margin-top: 1rem;
  width: 120px;
  margin-left: 1rem;
}

.menu-content{
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.icone{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  cursor: pointer;
  font-size: 18px;
  color: #fff;
  transition: all 0.5s ease;
}

.icone:hover{
  background-color: #fff;
  color: rgb(71, 71, 71);
  .menuText{
    color:rgb(71, 71, 71);
  }
}

.icone:hover i,
.icone:hover p{
  color: rgb(71, 71, 71);;
}

.icone p {
  font-size: 10px;
  width: 70px;
  color: #fff;
}

.exit{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 21rem;
  padding: .5rem 0;
  cursor: pointer;
  font-size: 18px;
  color: #fff;
  transition: all 0.5s ease;
}

.exit:hover{
  background-color: #fff;
  color: rgb(71, 71, 71);
}

.exit:hover i,
.exit:hover p {
  color:rgb(71, 71, 71);
}

.exit p{
  font-size: 11px;
}

.menuText{
  color: white;
  text-decoration: none;
  font-size: 10px;
}

@media (max-width: 1440px) {
  .home-container {
    width: 125px;
  }

  .img-content img {
    width: 100px;
  }

  .icone {
    font-size: 16px;
  }

  .icone p {
    font-size: 10px;
  }

  .exit {
    margin-top: 22rem;
  }

  .exit p {
    font-size: 11px;
  }
}


@media (max-width: 1366px) {
  .home-container {
    width: 110px;
  }

  .img-content img {
    width: 90px;
    margin-left: 0.5rem;
  }

  .icone {
    font-size: 16px;
    padding: 0.8rem 0;
  }

  .icone p {
    font-size: 9px;
    width: 70px;
  }

  .exit {
    margin-top: 7rem;
  }

  .exit p {
    font-size: 10px;
  }
}


@media (max-width: 1024px) {
  .home-container {
    width: 110px;
  }

  .img-content img {
    width: 90px;
    margin-left: 0.5rem;
  }

  .icone {
    font-size: 14px;
    padding: 0.6rem 0;
  }

  .icone p {
    font-size: 9px;
  }

  .exit {
    margin-top: 12rem;
    font-size: 14px;
  }

  .exit p {
    font-size: 10px;
  }
}



@media (max-width: 768px) {
  .home-container {
    width: 110px;
  }

  .img-content img {
    width: 100px;
    margin-left: 0.4rem;
  }

  .icone {
    font-size: 24px;
    padding: 0.6rem 0;
  }

  .icone p {
    font-size: 10px;
    width: 70px;
  }

  .exit {
    margin-top: 20rem;
    font-size: 24px;
  }

  .exit p {
    font-size: 10px;
  }
}



</style>
