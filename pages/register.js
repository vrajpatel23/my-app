import { Card, Form, Alert, Button } from 'react-bootstrap'
import { useState } from 'react'
import { registerUser } from '../lib/authenticate'
import { useRouter } from 'next/router'

export default function Register(props) {
    const [vpuser, setvpUser] = useState('')
    const [vppassword, setvpPassword] = useState('')
    const [vppassword2, setvpPassword2] = useState('')

    const [vpwarning, setvpWarning] = useState('')
    const router = useRouter()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (vpuser == '' || vppassword == '' || vppassword2 == '') {
                setvpWarning(`not a single field should not be blank`)
            }
            else {
            await registerUser(vpuser, vppassword, vppassword2)
            router.push('/login')
            }
        } catch (err) {
            setvpWarning('can you please try it again !!!!!')
        }
    }


    return (
        <>
          

          
            <Card bg='danger'>
            <Button>
                <Card.Body>
                    <h1  >Register</h1>
                    </Card.Body></Button>
                    </Card>
            <br />
            <Card>
            <Button>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label >User: <Form.Control
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
                        align='centre'
                        placeholder="Enter new password"
                        onChange={(e) => setvpPassword(e.target.value)}
                    /></Form.Label>
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Confirm Password:
                    <Form.Control
                        type='password'
                        value={vppassword2}
                        id='password2'
                        name='password2'
                        placeholder="Enter password again"
                        onChange={(e) => setvpPassword2(e.target.value)}
                    /></Form.Label>
                </Form.Group>
                {vpwarning && (
                    <>
                        <br />
                        <Alert variant='danger'>{vpwarning}</Alert>
                    </>
                )}
                <br />
                <Button variant='success' className='pull-right' type='submit' >
                    Register
                </Button>
            </Form>
            </Button></Card>
        </>
    )
}
