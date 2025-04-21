import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:8080/api' //  URL da API

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    error: null,
  }),
  actions: {
    async loginUser(username, password) {
      try {
        const response = await axios.post(`${API_URL}/login`, { username, password })
        this.user = response.data.user  // supondo que o back retorna um objeto user
        this.token = response.data.token  // e um token
        this.error = null
        return true
      } catch (error) {
        this.error = error.response ? error.response.data : error.message
        return false
      }
    },
    logout() {
      this.user = null
      this.token = null
      this.error = null
    },
  },
})
