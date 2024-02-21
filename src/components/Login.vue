<template>
  <div class="w-full  max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Email
        </label>
        <input v-model="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username" type="text" placeholder="Username">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input v-model="password"
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password" type="password" placeholder="******************">
      </div>
      <div class="flex flex-col justify-center items-center">
        <button @click="login"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline  mb-2"
          type="button">
          Login
        </button>
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      </div>

    </form>

  </div>
</template>
  
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  computed: {
    error() {
      return this.$store.getters['auth/getError'];
    }
  },
  methods: {
    async login() {
      const credentials = {
        Email: this.email,
        Password: this.password,
        GrantType: 'password',
        Scope: 'amazon_data',
        ClientId: 'C0001',
        ClientSecret: 'SECRET0001',
        RedirectUri: 'https://api.eva.guru'
      };
      try {
        await this.$store.dispatch('auth/login', credentials);
        const error = this.$store.getters['auth/getError'];
        if (!error) {
          const response = this.$store.getters['auth/getResponse'];
       
          if (response.ApiStatus) {
            const token = this.$store.getters['auth/getToken'];
            const userInfo = this.$store.getters['auth/getUserInfo'];
            this.$router.push('/home');
          } else {
            this.errorMessage = 'Authentication failed';
          }
        } else {
          this.errorMessage = 'Authentication failed';
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  }
}
</script>