<template>
  <div>
    <div class="mt-40">
        <div class="p-5 py-10 border-gray-700 rounded-xl shadow-full max-w-lg mx-auto">
            <form class="max-w-sm mx-auto mt-4" @submit.prevent="resetPassword">
                <div class="text-center">
                    <h2 class="text-2xl font-bold">Mật khẩu mới</h2>
                    <p class="mt-2 text-gray-800">Tạo mật khẩu mới có tối thiểu 8 ký tự. Mật khẩu mạnh là mật khẩu được kết hợp từ các ký tự, số và dấu câu.</p>
                </div>
                <div class="relative mt-8">
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Mật khẩu mới</label>
                        <input type="password" v-model="password" name="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" placeholder="Nhập mật khẩu!" required>
                    </div>
                </div>
                <button type="submit" class="text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mt-4">Submit</button>
                <!-- <p v-if="message">{{ message }}</p> -->
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const password = ref('');
    const message = ref('');
    const route = useRoute();
    const router = useRouter();

    const resetPassword = async () => {
      if (password.value.length < 8) {
        alert('Mật khẩu ít nhất 8 ký tự');
        return;
      }
      try {
        const token = route.params.token;
        const response = await axios.post(`http://localhost:8000/api/auth/reset-password/${token}`, { password: password.value });
        message.value = response.data.message;
        alert('Đổi mật khẩu thành công!');
        if (response.status === 200) {
          router.push('/');
        }
      } catch (error) {
        if (error.response) {
          message.value = error.response.data.message;
        } else {
          message.value = 'Lỗi! Hãy thử lại.';
        }
      }
    };

    return {
      password,
      message,
      resetPassword,
    };
  },
};
</script>


<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
}

.close-button {
    position: absolute;
    top: 0.1rem;
    right: 1rem;
    background: transparent;
    border: none;
    font-size: 2rem;
    cursor: pointer;
}
</style>
