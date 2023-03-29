import api from './apiConnet'

export const loginRequest = async (cedula: number, password: string) => {
    return await api.post('/api/auth/signin', {
        cedula,
        password
    })
}

export const registerRequest = async (username: string, cedula: number, password: string) => {
    return await api.post('/api/auth/signup', {
        username,
        cedula,
        password
    })
}

