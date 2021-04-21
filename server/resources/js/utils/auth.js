import axios from 'axios';

export async function requireAuth() {
    try {
        const res = await axios.post("/api/authenticated");
        console.log(res);
    } catch (e) {
        return false;
    }
    return true;
}