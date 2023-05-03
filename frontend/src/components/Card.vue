<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg" v-if="task">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ task?.title }}</div>
      <p class="text-gray-700 text-base">
        {{ task?.body }}
      </p>
    </div>
    <!-- <div class="px-6 pt-4 pb-2">
      <span
        @click="handleDelete(task?._id)"
        class="cursor-pointer inline-block bg-red-400 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2"
        >Xóa</span
      >
      <span
        @click="handleEdit(task?._id)"
        class="cursor-pointer inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2"
        >Chỉnh sửa</span
      >
    </div> -->

    <!-- <div class="px-6 pt-4 pb-2">
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >#{{ task?.status }}</span
      >
    </div> -->
    

    <div class="px-6 pt-4 pb-2">
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 "
        >#{{ task?.status }}</span
      >
      <button
        class="cursor-pointer inline-block rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2 "
        @click="handleEdit(task?._id)"
        >
        <svg class="h-5 w-5 text-blue-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
        </svg>
      </button>

      <button
        class="cursor-pointer inline-block rounded-full px-3 py-1 text-sm font-semibold text-black mr-2 mb-2 "
        @click="handleDelete(task?._id)"
        >
        <svg class="h-5 w-5 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg>
      </button>
    </div>

    
  </div>
</template>

<script>
// import { DeleteFilled } from '@ant-design/icons-vue';
export default {
  // components: {
  //   DeleteFilled,
  //   },
  props: {
    task: { type: Object },
  },
  methods: {
    async handleEdit(id) {
      this.$store.dispatch("showModal");
      await this.$store.dispatch("getTask", id);
    },
    async handleDelete(id) {
      this.$store.dispatch("showModalDelete");
      await this.$store.dispatch("getTask", id);
    },
  },
};
</script>
