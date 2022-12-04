const vraj = process.env.NEXT_PUBLIC_API_URL
import { getToken } from './authenticate'

export async function addToFavourites(id) {
    const vp = await fetch(`${vraj}/favourites/${id}`, { method: 'PUT',  headers: {    Authorization: 'JWT ' + getToken()  } })


    const bvdaya = await vp.json()
    if (vp.status === 200) {
        return bvdaya
    } else return []

}

export async function removeFromFavourites(id) {
    const vp = await fetch(`${vraj}/favourites/${id}`, {method: 'DELETE',headers: {  Authorization: 'JWT ' + getToken()  }   })
        const vddata = await vp.json()
    if (vp.status === 200) {
        return vddata
    } else return []
}

export async function getFavourites() { 
    const vp = await fetch(`${vraj}/favourites`, { method: 'GET', headers: { Authorization: 'JWT ' + getToken() } })

    const sddata = await vp.json()
    if (vp.status === 200) {
        return sddata
    } else return []
}

export async function addToHistory(id) {
    const vp = await fetch(`${vraj}/history/${id}`, {  method: 'PUT', headers: { Authorization: 'JWT ' + getToken() } })
    const kcddata = await vp.json()
    if (vp.status === 200) {   return kcddata
    } else return []
}


export async function removeFromHistory(id) {
    const vp = await fetch(`${vraj}/history/${id}`, { method: 'DELETE',headers: { Authorization: 'JWT ' + getToken()} })
    const lkjdata = await vp.json()
    if (vp.status === 200) {
        return lkjdata
    } else return []
}

export async function getHistory() {
    const vp = await fetch(`${vraj}/history`, {  method: 'GET', headers: {Authorization: 'JWT ' + getToken()  } })
    const jhgdata = await vp.json()
    if (vp.status === 200) {
        return jhgdata
    } else return []
}
