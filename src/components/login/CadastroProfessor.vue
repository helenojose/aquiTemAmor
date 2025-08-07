<template>
  <div class="cadastro-professor">
    <h2>Cadastro de Professor</h2>
    <form @submit.prevent="cadastrarProfessor">
      <input v-model="nome" type="text" placeholder="Nome completo" required />
      <input v-model="email" type="email" placeholder="E-mail" required />
      <input v-model="senha" type="password" placeholder="Senha" required />
      
      <h3>Modalidades:</h3>
      <label><input type="checkbox" value="REFORÇO" v-model="modalidades" /> REFORÇO</label>
      <label><input type="checkbox" value="MUAY TAI" v-model="modalidades" /> MUAY TAI</label>
      <label><input type="checkbox" value="BALLET" v-model="modalidades" /> BALLET</label>
      <label><input type="checkbox" value="NATAÇÃO" v-model="modalidades" /> NATAÇÃO</label>

      <h3>Tipo de Conta:</h3>
      <select v-model="tipo">
        <option value="professor">Professor</option>
        <option value="adm">ADM</option>
      </select>

      <button type="submit">Cadastrar Professor</button>
    </form>
  </div>
</template>

<script>
import { auth, db } from "../../Firebase/FIrebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";


export default {
  data() {
    return {
      nome: "",
      email: "",
      senha: "",
      modalidades: [],
      tipo: "professor",
    };
  },
  methods: {
    async cadastrarProfessor() {
      try {
        const credenciais = await createUserWithEmailAndPassword(auth, this.email, this.senha);
        await setDoc(doc(db, "professores", credenciais.user.uid), {
          uid: credenciais.user.uid,
          nome: this.nome,
          email: this.email,
          modalidades: this.modalidades,
          tipo: this.tipo,
        });
        alert("Professor cadastrado com sucesso!");
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar: " + error.message);
      }
    },
  },
};
</script>

<style scoped>
.cadastro-professor {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cadastro-professor h2 {
  text-align: center;
  margin-bottom: 20px;
}

.cadastro-professor form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cadastro-professor input,
.cadastro-professor select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.cadastro-professor button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.cadastro-professor button:hover {
  background-color: #0056b3;
}

.cadastro-professor h3 {
  margin-top: 10px;
}
</style>
