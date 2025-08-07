<template>
  <button @click="criarAdmin">Criar Admin</button>
</template>

<script>
import { auth } from "../../Firebase/FIrebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../Firebase/FIrebase";
import { doc, setDoc } from "firebase/firestore";

export default {
  methods: {
    async criarAdmin() {
      try {
        const cred = await createUserWithEmailAndPassword(auth, "adm@gmail.com", "senha123");
        await setDoc(doc(db, "professores", cred.user.uid), {
          uid: cred.user.uid,
          nome: "Administrador",
          email: "adm@gmail.com",
          modalidades: [],
          tipo: "adm"
        });
        alert("Admin criado com sucesso");
      } catch (e) {
        console.error("Erro ao criar admin:", e.message);
      }
    }
  }
};
</script>
