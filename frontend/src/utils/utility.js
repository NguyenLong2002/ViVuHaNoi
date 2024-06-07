import axios from 'axios';

export async function checkAdmin() {
    try {
        const response = await axios.get('http://localhost:8000/api/user/check-admin', { withCredentials: true });
        return response.data.role === 'admin';
    } catch (error) {
        console.error("Error checking admin status:", error);
        return false;
    }
}