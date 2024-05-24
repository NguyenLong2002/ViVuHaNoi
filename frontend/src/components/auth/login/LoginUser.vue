<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">&times;</button>
      <div class="py-6 mt-4">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-3xl text-center mb-10">
          Đăng nhập/Đăng ký
        </h1>
        <form class="space-y-4 md:space-y-6" @submit.prevent="login">
          <div>
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Tên người dùng</label>
            <input v-model="username" type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" placeholder="Nhập tên người dùng!" required>
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Mật khẩu</label>
            <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" required>
          </div>
          <p v-if="loginFailed && !emailNotVerified" class="text-sm text-red-600 -mt-3">Tên người dùng hoặc mật khẩu không đúng!</p>
          <p v-if="emailNotVerified" class="text-sm text-red-600 -mt-3">Tài khoản chưa được xác minh! Kiểm tra email.</p>
          <div class="flex items-center justify-between">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300">
              </div>
              <div class="ml-3 text-sm">
                <label for="remember" class="text-gray-500">Nhớ tài khoản</label>
              </div>
            </div>
            <a href="#" class="text-sm font-medium text-primary hover:underline" @click="openEmailFormModal">Quên mật khẩu?</a>
           

          </div>
          <button type="submit" class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Đăng nhập</button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Bạn chưa có tài khoản? <a href="#" class="font-medium text-primary hover:underline" @click.prevent="switchToRegister">Đăng ký</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  components: {
    
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    closeModal: {
      type: Function,
      required: true,
    },
    openRegisterModal: {
      type: Function,
      required: true,
    },
    openEmailModal: {
      type: Function,
      required: true,
    }
  },
  setup(props, { emit }) {
    const username = ref('');
    const password = ref('');
    const store = useStore();
    const router = useRouter();
    const loginFailed = ref(false);
    const emailNotVerified = ref(false);

    const openEmailFormModal = () => {
      props.closeModal();
      props.openEmailModal();
    };
  
    const login = async () => {
      loginFailed.value = false;
      emailNotVerified.value = false;
      const user = {
        username: username.value,
        password: password.value
      };

      try {
        const response = await store.dispatch('auth/login', user);
        if (response.success) {
          const loggedInUser = response.user;
          if (loggedInUser.emailVerified) {
            emit('login-success', loggedInUser);
            props.closeModal();
            router.push('/');
          } else {
            emailNotVerified.value = true;
          }
        } else {
          if (response.message === 'Email has not been verified!') {
            emailNotVerified.value = true;
          } else {
            loginFailed.value = true;
          }
        }
      } catch (error) {
        loginFailed.value = true;
      }
    };

    const switchToRegister = () => {
      props.closeModal();
      props.openRegisterModal();
    };

    return {
      username,
      password,
      login,
      switchToRegister,
      loginFailed,
      emailNotVerified,
      openEmailFormModal,
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
