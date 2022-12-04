import { getFavourites, getHistory } from '../lib/userData'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { isAuthenticated } from '../lib/authenticate'
import {  searchHistoryAtom } from '../store'
import { useAtom } from 'jotai'
import { favouritesAtom } from '../store'

import { useEffect } from 'react'
const genralvrajpath = ['/login', '/', '/_error', '/register']

export default function RouteGuard({ children }) {
    
    const [vrajauthorized, setvrajAuthorized] = useState(false)
    
    const [vrajfavourites, setvrajFavourites] = useAtom(favouritesAtom)
    
    const [vrajsearchHistory, setvrajSearchHistory] = useAtom(searchHistoryAtom)
    
    const router = useRouter()

    
    
    useEffect(() => { const absorbusersidedata = async () => { await vrajupdateatoms()   }
absorbusersidedata()
        vrajcheck(router.pathname)
        router.events.on('canvrajrouteChangeComplete', vrajcheck)
        return () => {  router.events.off('canvrajrouteChangeComplete', vrajcheck)   }  },[])


        
    const vrajupdateatoms = async () => {
        setvrajFavourites(await getFavourites())
        setvrajSearchHistory(await getHistory())
    }

    const vrajcheck = (url) => {
        const mypath = url.split('?')[0]
        if (!isAuthenticated() && !genralvrajpath.includes(mypath)) {
            setvrajAuthorized(false)
            router.push('/login')
        } else {
            setvrajAuthorized(true)
        }
    }

    return <>{vrajauthorized && children}</>
}
