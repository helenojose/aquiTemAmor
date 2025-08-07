<template>
    <div class="login-container">
        <div class="img-content">
            <img src="../../assets/image/fundo.jpg" alt="">
        </div>
        <div class="form-container">
            <div class="img-form">
                <img src="../../assets/image/Logo.png" alt="">
            </div>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="login-user">DIGITE SEU USUÁRIO E SENHA PARA FAZER LOGIN:</label>
                </div>
                <div class="form-group">
                    <input v-model="loginEmail" id="login-user" type="email" placeholder="Usuário" />
                </div>
                <div class="form-group password-group">
                    <input v-model="loginSenha" :type="showPassword ? 'password' : 'text'" id="password" placeholder="Senha"/>
                    <button type="button" class="toggle-password" @click="togglePassword">
                        <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                    </button>
                </div>
                <div class="form-button">
                  <button type="submit">Entrar</button>
                </div>    
            </form>
        </div>
    </div>
</template>

<script setup>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useRouter } from 'vue-router';
import { ref } from "vue";

const loginEmail = ref("");
const loginSenha = ref("");
const auth = getAuth();
const db = getFirestore();
const router = useRouter();

async function handleLogin() {
  try {
    const email = loginEmail.value;     // campos que você vai criar no template
    const senha = loginSenha.value;

    const credenciais = await signInWithEmailAndPassword(auth, email, senha);
    const uid = credenciais.user.uid;

    // Pega os dados do usuário no Firestore
    const docRef = doc(db, "professores", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const usuario = docSnap.data();

      if (usuario.tipo === "professor") {
        router.push("/"); // rota da tela de presença
      } else if (usuario.tipo === "adm") {
        router.push("/"); // exemplo de outra rota para adm
      } else {
        alert("Tipo de usuário desconhecido.");
      }
    } else {
      alert("Usuário não encontrado no banco.");
    }
  } catch (error) {
    alert("Erro no login: " + error.message);
  }
}

</script>

<style scoped>
.login-container{
    position: fixed; /* fixa no topo da página */
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    background-color: #FFF;
    width: 100%;
    height: 100VH;
    text-align: center;
    align-items: center;
}

.form-container{
    width: 400px;
    height: 120VH;
    margin-left: 30rem;
}

.form-group{
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    margin-right: -0.8rem;
}

.form-group label{
    text-align: center;
    font-size: 16px;
    letter-spacing: 2px;
    font-weight: bold;
}

.form-group input{
    width: 400px;
    padding: .9rem;
    border-radius: .5rem;
    border: none;
    background-color: #86b2ad;
    color: #fff;
    
}

input::placeholder{
    color: #f3f3f3;
    opacity: .7;
}

.form-button button{
    width: 400px;
    margin-left: 1rem;
    padding: .9rem;
    border-radius: .5rem;
    border: none;
    background-color: #22c574;
    font-weight: bold;
    color: #fff;
    transition: 0.5s;
    cursor: pointer;
}

.form-button button:hover{
   background-color: #0f9954;
}

.password-group {
  position: relative;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #fff;
  font-size: 1.2rem;
}

/* ícone */
.toggle-password i {
  pointer-events: none;
}

.img-content img{
    width: 120%;
    height: 100vh;
}

.img-form{
    margin-top: 10rem;
}

.img-form img{
    width: 350px;
}



@media (max-width: 1440px) {
  .form-container {
    margin-left: 20rem;
    /* Acrescentei um margin-bottom como no exemplo de 1366px */
    margin-bottom: 5rem;
  }

  .toggle-password {
    width: 10%;
    margin-right: 2rem;
    height: auto;
  }

  .form-group input,
  .form-button button {
    width: 350px;
    /* Utilizei um valor intermediário entre 400px e o 300px da tela de 1366px */
    padding: 0.9rem;
  }

  .img-form img {
    width: 200px;
    /* Valor intermediário inspirado em 1366px (180px) */
  }

  .img-content img {
    width: 600px;
  }
}

@media (max-width: 1366px) {
    .form-container {
     margin-left: 15rem;
     margin-bottom: 5rem;
      }

    .toggle-password{
    width: 10%;
    margin-right: 2rem;
    height: auto;

    }
    .form-group input,
    .form-button button {
        width: 300px;
        padding: .5rem;
    }
    .form-button button{
        margin-left: .6rem;
    }

    .img-form img{
        width: 180px;
    }

    .img-content img {
      width: 600px;
     }
}   

@media (max-width: 1024px) {
  .login-container {
    flex-direction: column;
    height: 100vh;
  }

  .img-content {
    height: 45vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
    .toggle-password{
    width: 10%;
    margin-right: .1rem;
    height: auto;

  }
  .img-content img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .form-container {
    margin: 0;
    width: 100%;
    height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .form-group input,
  .form-button button {
    width: 90%;
  }

  .img-form img {
    width: 300px;
  }
}


@media (max-width: 768px) {
  .form-container {

    width: 80%;
    height: auto;
  }

  .toggle-password{
    width: 10%;
    margin-right: 2rem;
    height: auto;

  }
    .form-group label{
        font-size: 14px;
    }

  .form-group input,
  .form-button button {
    width: 70%;
  }

  .img-form img {
    width: 250px;
  }

  .img-content {
    display: none;
  }

  .login-container {
    justify-content: center;
    flex-direction: column;
    
  }
}

</style>