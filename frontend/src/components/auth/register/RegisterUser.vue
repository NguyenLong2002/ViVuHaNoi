<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">&times;</button>
      <div class="mt-10">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white text-center mb-10">
          Đăng ký tài khoản
        </h1>
        <form class="space-y-4 md:space-y-6" @submit.prevent="register">
          <div>
            <label for="email" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Email</label>
            <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="vd: name@gmail.com" required>
            <p v-if="emailError" class="text-sm text-red-600 mt-2 ">{{ emailError }}</p>
          </div>
          <div>
            <label for="username" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Tên người dùng ?</label>
            <input v-model="username" type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="vd: nguyen van a" required>
            <p v-if="usernameError" class="text-sm text-red-600 mt-2">{{ usernameError }}</p>
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Mật khẩu</label>
            <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            <p class="text-sm text-gray-700 font-normal mt-2">Gợi ý: Mật khẩu cần có ít nhất 8 kí tự.</p>
            <p v-if="passwordError" class="text-sm text-red-600 mt-2">{{ passwordError }}</p>
          </div>
          <!-- <div>
            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xác nhận mật khẩu</label>
            <input v-model="confirmPassword" type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
          </div> -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required>
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="font-light text-gray-500 dark:text-gray-300">Tôi chấp nhận <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Các điều khoản và điều kiện</a></label>
            </div>
          </div>
          <button type="submit" class="w-full text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng ký</button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Bạn đã có tài khoản? <a href="" class="font-medium text-primary hover:underline dark:text-primary-500" @click.prevent="switchToLogin">Đăng nhập</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  props: ['isOpen', 'closeModal','openLoginModal'],
  setup(props) {
    const email = ref('');
    const username = ref('');
    const password = ref('');
    const emailError = ref('');
    const usernameError = ref('');
    const passwordError = ref('');
    // const confirmPassword = ref('');
    const store = useStore();

    const register = async () => {
      emailError.value = '';
      usernameError.value = '';
      passwordError.value = '';
      // if (password.value !== confirmPassword.value) {
      //   passwordError.value = 'Mật khẩu không khớp với Xác nhận mật khẩu.';
      //   return;
      // }
      
      const newUser = {
        email: email.value,
        username: username.value,
        password: password.value
      };
      try{
        const success = await store.dispatch('auth/register',newUser);
        if (success) {
          alert('Đăng ký thành công! Vui lòng kiểm tra email để xác minh tài khoản.');
          props.closeModal();
          props.openLoginModal();
        } else {
          alert('Đăng ký thất bại');
        }
      }catch (error) {
        if (error.response && error.response.status === 400) {
          if (error.response.data.message === 'Email already exists') {
            emailError.value = 'Email này đã được đăng ký.';
          } else if (error.response.data.message === 'Username already exists') {
            usernameError.value = 'Tên người dùng đã tồn tại.';
          } else {
            alert('Đăng ký thất bại');
          }
        } else {
          console.error('Đăng ký thất bại', error);
        }
      }
      if(password.value.length < 8){
        passwordError.value = 'Mật khẩu cần ít nhất 8 kí tự.';
        return;
      }
    };
    
    const switchToLogin = () => {
      props.closeModal();
      props.openLoginModal();
    };
    return {
      email,
      username,
      password,
      register,
      switchToLogin,
      emailError,
      usernameError,
      passwordError
    };
  }
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
