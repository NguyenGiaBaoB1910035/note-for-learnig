<template>
  <Header></Header>
  <main class="w-9/12 mx-auto">
    <div class="mb-4">
      <button
        @click="handleShowModal"
        type="button"
        class="text-black 
        bg-blue-400 
        font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Thêm task
      </button>
    </div>
    <Cards></Cards>
  </main>
  <Modal></Modal>
</template>

<script>
import Header from "../components/Header.vue";
import Cards from "../components/Cards.vue";
import Modal from "../components/Modal.vue";
export default {
  components: {
    Header,
    Cards,
    Modal,
  },
  methods: {
    handleShowModal() {
      this.resetTask();
      this.$store.dispatch("showModal");
    },
    resetTask() {
      this.$store.state.task.task = {};
    },
  },
  async created() {
    if (!this.$store.state.user.isLogged) {
      this.$router.push("/");
    }
  },
};
</script>
