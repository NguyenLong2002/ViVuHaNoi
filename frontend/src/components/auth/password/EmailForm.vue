<template>
    <div v-if="isOpen" class="modal-overlay" @click.self="closeEmailModal" >
        <div class="modal-content">
            <button class="back-login flex" @click.prevent="backLoginModal"><font-awesome-icon :icon="['fas', 'angle-left']" /> <span class="text-sm text-gray-700 ml-1">Quay lại</span></button>
            <button class="close-button" @click="closeEmailModal" >&times;</button>
            <form class="max-w-sm mx-auto mt-4" @submit.prevent="requestReset">
                <div class="text-center">
                    <h2 class="text-2xl font-bold">Quên mật khẩu?</h2>
                    <p class="mt-2 text-gray-800">Nhập địa chỉ email được liên kết với tài khoản của bạn. Chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu của bạn.</p>
                </div>
                <div class="relative mt-8">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                        </svg>
                    </div>
                    <input type="email" v-model="email" id="email-address-icon" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full ps-10 p-2.5 " placeholder="name@gmail.com" required>
                </div>
                <button type="submit" class="text-white bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mt-4">Send</button>
                <!-- <p v-if="message">{{ message }}</p> -->
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
    props: { 
        isOpen: {
            type: Boolean,
            required: true,
        },
        closeEmailModal: {
            type: Function,
            required: true,
        },
        openLoginModal: {
            type: Function,
            required: true,
        }
    },
    setup(props) {
        const email = ref('');
        const message = ref('');

        const requestReset = async () => {
            try {
                const response = await axios.post('http://localhost:8000/v1/auth/request-reset', { email: email.value });
                message.value = response.data.message;
                
                alert('Thành công! Hãy kiểm tra email của bạn.');
               
                props.openLoginModal();
                props.closeEmailModal();
            } catch (err) {
                message.value = 'Đã xảy ra lỗi, vui lòng thử lại!';
            }
        };

        const backLoginModal = () => {
            props.closeEmailModal();
            props.openLoginModal();
        };

        return {
            backLoginModal,
            email,
            message,
            requestReset,
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

.back-login {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 1.1rem;
    background: transparent;
    border: none;
    cursor: pointer;
}
</style>
