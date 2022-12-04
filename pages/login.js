import { Card, Form, Alert, Button } from 'react-bootstrap'
import { useState } from 'react'
import { authenticateUser } from '../lib/authenticate'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { searchHistoryAtom, favouritesAtom } from '../store'
import { getFavourites, getHistory } from '../lib/userData'

export default function Login(props) {
    const [vpuser, setvpUser] = useState('')
    const [vppassword, setvpPassword] = useState('')

    const [vpwarning, setvpWarning] = useState('')
    const router = useRouter()

    const [vpfavourites, setvpFavourites] = useAtom(favouritesAtom)
    const [vpsearchHistory, setvpSearchHistory] = useAtom(searchHistoryAtom)

    async function updateAtoms() {
        setvpFavourites(await getFavourites())
        setvpSearchHistory(await getHistory())
    }

    async function handleSubmit(e) {
        e.preventDefault()
                try {
            if (vpuser == '' || vppassword == '') {
            setvpWarning(`you have not enter any thing ,please enter`) 
            }
            else {

            await authenticateUser(vpuser, vppassword)
            await updateAtoms()
            router.push('/favourites')
            }

        } catch (err) {
            setvpWarning(`${vpuser} we can not find this`)
        }
    }
    return (
        <>
           <Card bg='danger'>
            <Button>
                <Card.Body>
                    <h1  >LOGIN</h1>
                    </Card.Body></Button>
                    </Card>
            <br />
                    <Card>
                        <Button>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>User:
                    <Form.Control
                        type='text'
                        value={vpuser}
                        id='userName'
                        name='userName'
                        placeholder="Enter user"
                        onChange={(e) => setvpUser(e.target.value)}
                    /></Form.Label>
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Password:
                    <Form.Control
                        type='password'
                        value={vppassword}
                        id='password'
                        name='password'
                        placeholder="Enter password"
                        onChange={(e) => setvpPassword(e.target.value)}
                    /></Form.Label>
                </Form.Group>
                {vpwarning && (
                    <>
                        <br />
                        <Alert variant='danger'>{vpwarning}</Alert>
                    </>
                )}
                <br />
                <Button variant='success' className='pull-right' type='submit'>
                    Login
                </Button>
                </Form>
            </Button></Card>
        </>
    )
}
