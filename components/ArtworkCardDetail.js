import useSWR from 'swr'
import { removeFromFavourites } from '../lib/userData'
import { useState} from 'react'
import { useEffect } from 'react'
import Error from 'next/error'
import { Button } from 'react-bootstrap'
import { Card } from 'react-bootstrap'

import { useAtom } from 'jotai'
import { favouritesAtom } from '../store'

import { addToFavourites} from '../lib/userData'

export default function ArtworkCardDetail({ objectID }) {
    
    const [vrajlist, setvrajlist] = useAtom(favouritesAtom)
    
    
    const [vaddshow, setvaddshow] = useState(false)

    const { data, error } = useSWR( objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`: null )
 






    useEffect(() => { setvaddshow(vrajlist?.includes(objectID)) },[vrajlist])



    const vsfav = async () => {
        if (vaddshow) { setvrajlist(await removeFromFavourites(objectID)) 
             setvaddshow((prevState) => false)
        } else { setvrajlist(await addToFavourites(objectID))
            setvaddshow((prevState) => true)
        } }






    if (error) return <Error statusCode={404} />

    if (!data && !error) return null

    return (
        <Card>
            {data?.primaryImage && (
                <Card.Img src={data?.primaryImage}></Card.Img>
            )}


            <Card.Body>
                <Card.Title>{data?.title ? data?.title : 'N/A'}</Card.Title>
                <Card.Text>

                    <b>Date:</b>&nbsp;
                    {data?.objectDate ? data?.objectDate : 'N/A'}
                    <br />


                    <b>Classification:</b>&nbsp;
                    {data?.classification ? data?.classification : 'N/A'}
                    <br />

                    <b>Medium:</b>&nbsp;{data?.medium || 'N/A'}

                </Card.Text>
                <br />
                
                <Card.Text>
                    
                    <b>Artist:</b>&nbsp;
                    {data?.artistDisplayName || 'N/A'}&nbsp; (
                    {data?.artistDisplayName && (
                        <a href={data?.artistWikidata_URL} target='_blank'  rel='noreferrer'>WIKIPEDIA </a>
                    )})
                    <br />
                    <b>Credit Line:</b>&nbsp;
                    {data?.creditLine || 'N/A'}
                    <br />
                    <b>Dimensions:&nbsp;</b>
                    {data?.dimensions || 'N/A'}
                    <br />
                    <br />
                    <br />
                    <Button variant={vaddshow ? 'primary' : 'outline-primary'} onClick={() => vsfav()}>+ Favourite {vaddshow && '(added)'} </Button>
                </Card.Text></Card.Body></Card>
)}
