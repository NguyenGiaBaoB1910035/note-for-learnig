<template>
  <div v-if="isShowModal">
    <!-- Main modal -->
    <div
      v-if="!isDelete"
      id="authentication-modal"
      tabindex="-1"
      aria-hidden="true"
      class="mx-auto bg-gray-400/75 fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full"
    >
      <div class="relative w-full mx-auto mt-14 max-w-md h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="authentication-modal"
            @click="handleHideModal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <Form
            as="div"
            class="py-6 px-6 lg:px-8"
            v-slot="{ handleSubmit }"
            :validation-schema="schema"
          >
            <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              {{ renderNameForm }}
            </h3>
            <form
              class="space-y-6"
              @submit="handleSubmit($event, handleSaveData)"
            >
              <div>
                <label
                  for="title"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Title task</label
                >
                <Field
                  :model-value="getTaskById?.title"
                  type="text"
                  name="title"
                  id="title"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="nhập tiêu đề"
                />
                <ErrorMessage name="title" class="text-rose-400" />
              </div>
              <div>
                <label
                  for="body"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Body task</label
                >
                <Field
                  :model-value="getTaskById?.body"
                  type="text"
                  name="body"
                  id="body"
                  placeholder="nhập body task"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                />
                <ErrorMessage name="body" class="text-rose-400" />
              </div>
              <div>
                <Field
                  :model-value="getTaskById?.status"
                  as="select"
                  name="status"
                  id="status"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" disabled selected>Chọn trạng thái</option>
                  <option :value="item" v-for="item in initialValue">
                    {{ item }}
                  </option>
                </Field>
                <ErrorMessage name="status" class="text-rose-400" />
              </div>

              <div class="flex gap-5">
                <button
                  class="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Lưu</button
                ><button
                  @click="handleHideModal"
                  class="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Trở về
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        id="popup-modal"
        tabindex="-1"
        class="mx-auto bg-gray-400/75 fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full"
      >
        <div class="relative w-full mx-auto mt-14 max-w-md h-full md:h-auto">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="popup-modal"
              @click="handleHideModal"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6 text-center">
              <svg
                aria-hidden="true"
                class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3
                class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
              >
                Bạn chắc chắn muốn xóa task này?
              </h3>
              <button
                @click="handleDeleteTask"
                data-modal-toggle="popup-modal"
                type="button"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Vâng, tôi đồng ý
              </button>
              <button
                @click="handleHideModal"
                data-modal-toggle="popup-modal"
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Không, từ chối
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as yup from "yup";
import { Field, Form, ErrorMessage } from "vee-validate";
export default {
  data() {
    const schema = yup.object().shape({
      title: yup.string().required(),
      body: yup.string().required(),
      status: yup
        .string()
        .required()
        .oneOf(["Chuẩn bị", "Thực hiện", "Hoàn thành"]),
    });

    return {
      schema,
      initialValue: ["Chuẩn bị", "Thực hiện", "Hoàn thành"],
      nameForm: "Tạo task mới",
    };
  },
  components: { Field, Form, ErrorMessage },
  computed: {
    isShowModal() {
      return this.$store.state.modal.isShowModal;
    },
    isDelete() {
      return this.$store.state.modal.isDelete;
    },
    getTaskById() {
      return this.$store.state.task.task;
    },
    renderNameForm() {
      if (this.getTaskById?._id) {
        return "Chỉnh sửa task";
      }
      return this.nameForm;
    },
  },
  methods: {
    async handlePostTask(values) {
      await this.$store.dispatch("postTask", values);
      this.handleHideModal();
    },
    async handleEditTask(values, id) {
      await this.$store.dispatch("editTask", { values, id });
      this.handleHideModal();
    },
    async handleDeleteTask() {
      await this.$store.dispatch("deleteTask", this.getTaskById?._id);
      this.handleHideModal();
    },
    handleSaveData(values) {
      if (this.getTaskById?._id) {
        this.handleEditTask(values, this.getTaskById?._id);
      } else {
        this.handlePostTask(values);
      }
    },
    handleHideModal() {
      this.$store.dispatch("hideModal");
    },
  },
};
</script>
