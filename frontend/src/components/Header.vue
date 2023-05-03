<template>
  <!-- component -->
  <div class="mb-4" >
    <div class="antialiased bg-gray-100 dark-mode:bg-gray-900">
      <div
        class="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800"
      >
        <div
          class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8 bg-blue-400"
        >
          <div class="flex flex-row items-center justify-between p-4">
            <router-link
              to="/"
              class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
              >STUDY NOTES</router-link
            >
          </div>
          <nav
            class="flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row"
          >
            <span
              class="px-4 py-2 mt-2 text-sm font-semibold bg-blue-400 duration-300 rounded-lg dark-mode:bg-transparent md:mt-0 md:ml-4 flex"
              ><svg class="h-5 w-5 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="7" r="4" />  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                   {{ user.username }}</span
            >
            <span
              @click="handleLogout"
              class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent cursor-pointer duration-300 rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >Đăng xuất</span
            >
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
  async created() {
    await this.$store.dispatch("getUser");
    this.user = this.$store.state.user.user;
  },
};
</script>
