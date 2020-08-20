import { Request, handleCommonError, AuthRequest } from '../utils/Request'

export const UserService = {
    isLoggedIn: () => {
        let token = localStorage.getItem('token')
        if (token) {
            return true
        }
        return false
    },
    isRole: (role) => {
        let currentRole = localStorage.getItem('role')
        return role === currentRole
    },
    removeJwt: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
    },
    login: (username, password) => {
        return Request().post('api/login', {
            'username': username,
            'password': password
        }).then(res => {
            let data = res.data

            let token = data.data.token;
            let role = data.data.role;
            let name = data.data.name;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('name', name);
            return res;
        }).catch(handleCommonError);
    },
    register: (user) => {
        return Request().post('/api/register', user).catch(handleCommonError)
    },
    createUser: (user) => {
        return AuthRequest.post('/api/createUser', user).catch(handleCommonError)
    },
    setUser: (user) => {
        return AuthRequest.post('/api/user/setUser', user).catch(handleCommonError)
    },
    getAll: () => {
        return AuthRequest.get("/api/user/getAll").catch(handleCommonError)
    },
    enable: (username) => {
        return AuthRequest.post("/api/user/enable?username=" + username).catch(handleCommonError)
    },
    disable: (username) => {
        return AuthRequest.post("/api/user/disable?username=" + username).catch(handleCommonError)
    }
}