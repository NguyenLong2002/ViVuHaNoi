<template>
  <nav class="bg-white dark:bg-gray-900 fixed w-full z-40 top-0 start-0 border-b border-gray-200 shadow-lg">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="../../assets/logo.png" alt="" class="w-36">
      </a>
      <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <div v-if="!isLoggedIn">
          <button type="button" class="text-gray-900 font-bold rounded-3xl text-sm px-3 py-1 text-center mr-4" @click="openLoginModal">Đăng nhập</button>
          <LoginModal :isOpen="isLoginModalOpen" :closeModal="closeLoginModal" :openRegisterModal="openRegisterModal" :openEmailModal="openEmailModal" @login-success="handleLoginSuccess"/>
          <EmailModal :isOpen="isEmailModalOpen" :closeEmailModal="closeEmailModal" :openLoginModal="openLoginModal"/>

          <button type="button" class="text-gray-900 bg-primary hover:bg-secondary hover:text-white font-semibold rounded-3xl text-sm px-4 py-2 text-center" @click="openRegisterModal">Đăng ký</button>
          <RegisterModal :isOpen="isRegisterModalOpen" :closeModal="closeRegisterModal" :openLoginModal="openLoginModal"/>
        </div>

        <div class="flex justify-center items-center" v-else>
          <h3 class="mr-4 text-primary font-bold">Chào, <span class="text-gray-900 font-normal">{{ userName }}</span>!</h3>
          <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
            <button type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" @click="toggleDropdown">
              <span class="sr-only">Open user menu</span>
              <img class="w-8 h-8 rounded-full" src="../../assets/images/user-img.png" alt="user photo">
            </button>
            <!-- Dropdown menu -->
            <div v-show="isDropdownOpen" class="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-xl  absolute top-6 -right-4" id="user-dropdown" >
              <div class="px-4 py-3">
                <span class="block text-sm text-gray-900 dark:text-white">{{ userName }}</span>
                <span class="block text-sm text-gray-500 truncate dark:text-gray-400">{{ userEmail }}</span>
              </div>
              <ul class="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Cài đặt</a>
                </li>
                <li>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" @click = "handleLogout" >Đăng xuất</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <button data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
      </div>
      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <router-link to="/" class="block py-2 px-3 text-gray-900 rounded md:bg-transparent md:hover:text-primary md:p-0" aria-current="page">Trang chủ</router-link>
          </li>
          <li>
            <router-link to="/tours" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0">Du lịch</router-link>
          </li>
          <li>
            <router-link to="/blogs" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0">Blog</router-link>
          </li>
          <li>
            <router-link to="/contact" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0">Liên hệ</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import LoginModal from '../LoginPage.vue';
import RegisterModal from '../RegisterPage.vue';
import EmailModal from '../EmailForm.vue';

export default {
  components: {
    LoginModal,
    RegisterModal,
    EmailModal,
  },
  setup() {

    const store = useStore();
    const isLoginModalOpen = ref(false);
    const isRegisterModalOpen = ref(false);
    const isEmailModalOpen = ref(false);
    const isDropdownOpen = ref(false);

    const isLoggedIn = computed(() => !!store.state.auth.login.currentUser);
    const userName = computed(() => store.state.auth.login.currentUser?.username || '');
    const userEmail = computed(() => store.state.auth.login.currentUser?.email || '');

    const openLoginModal = () => {
      isLoginModalOpen.value = true;
    };

    const closeLoginModal = () => {
      isLoginModalOpen.value = false;
    };

    const openRegisterModal = () => {
      isRegisterModalOpen.value = true;
    };

    const closeRegisterModal = () => {
      isRegisterModalOpen.value = false;
    };

    const openEmailModal = () => {
      isEmailModalOpen.value = true;
    };

    const closeEmailModal = () => {
      isEmailModalOpen.value = false;
    };

    const handleLoginSuccess = (user) => {
      if (user && user.username && user.email) {
        userName.value = user.username;
        userEmail.value = user.email;
        isLoggedIn.value = true;
        closeLoginModal();
      } else {
        console.error('Invalid user object:', user);
      }
    };

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

     const handleLogout = async () => {
       try {
          await store.dispatch('auth/logout');
          openLoginModal();
        } catch (error) {
          console.error('Logout failed:', error);
        }
     };

    return {
      isLoginModalOpen,
      isRegisterModalOpen,
      isEmailModalOpen,
      openLoginModal,
      closeLoginModal,
      openRegisterModal,
      closeRegisterModal,
      openEmailModal,
      closeEmailModal,
      handleLoginSuccess,
      userName,
      userEmail,
      isLoggedIn,
      isDropdownOpen,
      toggleDropdown,
      handleLogout,
    };
  },
};
</script>

<style scoped>
/* Style code here */
</style>
