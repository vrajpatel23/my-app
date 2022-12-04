import { useState } from 'react'
import { useRouter } from 'next/router'
import Error from 'next/error'
import useSWR from 'swr'
import { Card, Pagination } from 'react-bootstrap'
import { ArtworkCard } from '../../components'
import { useEffect} from 'react'
import { Row, Col} from 'react-bootstrap'
import validObjectIDList from '../../public/data/validObjectIDList.json'

const vraj_PER_PAGE = 12
export default function Artwork() {
    const [vrajartworkList, setvrajArtworkList] = useState([])


    const [vrajpage, setvrajPage] = useState(1)
    const router = useRouter()


    let vrajfinalsearchQuery = router.asPath.split('?')[1]

    const { data, error } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?${vrajfinalsearchQuery}`
    )

    useEffect(() => {
        if (data) { let vrajfilterresult = validObjectIDList.objectIDs.filter((x) =>
                data?.objectIDs?.includes(x)
            )


            
            let my_results = []
            
            for (let i = 0; i < vrajfilterresult.length; i += vraj_PER_PAGE) {
                const hu = vrajfilterresult.slice(i, i + vraj_PER_PAGE)
                my_results.push(hu)
            }


            setvrajArtworkList(() => my_results)
            setvrajPage(() => 1)
        }

    }, [data])

    const previousPage = () => {
        if (vrajpage > 1) {
            setvrajPage((currPage) => currPage - 1)
        }    }

    const nextPage = () => {
        if (vrajpage < vrajartworkList.length) {
            setvrajPage((currPage) => currPage + 1)
        }    }

    if (error) return <Error statusCode={404} />
    if (!data && !error) return null

    return (

        <Row className='gy-4'>{!vrajartworkList.length ? ( <Card>
                    <Card.Body> <Card.Title> <h4>Nothing Here</h4></Card.Title>
                        <Card.Text>can you please! Try searching for something else.</Card.Text>
                    </Card.Body>   </Card>
            ) : 
            
            (
                vrajartworkList[vrajpage - 1].map((objectID) => (
                    <Col lg={3} key={objectID}><ArtworkCard objectID={objectID} /> </Col>   )) )} {vrajartworkList.length > 0 && (
                <Row>  <Col>
                        <Pagination>
                            <Pagination.Prev onClick={() => previousPage()} />
                            <Pagination.Item>{vrajpage}</Pagination.Item>
                            <Pagination.Next onClick={() => nextPage()} />
                        </Pagination>
                    </Col>
                </Row>
            )}
        </Row>
    )
}
