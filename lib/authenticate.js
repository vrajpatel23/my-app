import jwt_decode from 'jwt-decode'

const vraj = process.env.NEXT_PUBLIC_API_URL

export async function authenticateUser(user, password) {
    const vp = await fetch(`${vraj}/login`, {  method: 'POST', body: JSON.stringify({ userName: user, password: password }),
        headers: {'content-type': 'application/json' } })

   
        const nvdata = await vp.json()
   
        if (user != '' && password != '') {
   
            if (vp.status === 200) {
        setToken(nvdata.token)
        return true
    } else {
        throw new Error(nvdata.message)
    }
}
else {
    throw new Error('you put wrong input please input correctly')
}

}
function setToken(token) {
    localStorage.setItem('access_token', token)
}

export function getToken() {
    try {
        return localStorage.getItem('access_token')
    } catch (err) {
        return null
    }
}

export function removeToken() {
    localStorage.removeItem('access_token')
}

export function readToken() {
    try {
        const token = getToken()
        return token ? jwt_decode(token) : null
    } catch (err) {
        return null
    }
}

export function isAuthenticated() {
    const token = readToken()
    return token ? true : false
}

export async function registerUser(user, password, password2) {
    const vp = await fetch(`${vraj}/register`, { method: 'POST', body: JSON.stringify({ userName: user, password, password2 }),
        headers: { 'content-type': 'application/json'  } })

   
        const kvdata = await vp.json()

    
        if (vp.status === 200) {        return true
    } else {
        throw new Error(kvdata.message)
    }
}
