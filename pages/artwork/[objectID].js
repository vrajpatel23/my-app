import { Col } from 'react-bootstrap'
import { ArtworkCardDetail } from '../../components'
import { useRouter } from 'next/router'
import { Row} from 'react-bootstrap'

export default function ArtworkById() {
    const { query } = useRouter()

    return (
        <Row> <Col>
                <ArtworkCardDetail objectID={query.objectID} />
            </Col> </Row>
  
  
  
  )
}
