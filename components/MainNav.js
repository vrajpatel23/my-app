import {Container} from 'react-bootstrap'
import {  Form} from 'react-bootstrap'
import {  NavDropdown} from 'react-bootstrap'
import { useRouter } from 'next/router'
import {   Nav} from 'react-bootstrap'
import {   Navbar} from 'react-bootstrap'

import {  Button} from 'react-bootstrap'

import { useForm } from 'react-hook-form'

import { useState } from 'react'
import Link from 'next/link'



import { useAtom } from 'jotai'
import { searchHistoryAtom } from '../store'


import { addToHistory } from '../lib/userData'
import { readToken, removeToken } from '../lib/authenticate'
export default function MainNav() {
    let myholdtoken = readToken()
    const [vrajsearchingHistory, setvrajSearchingHistory] = useAtom(searchHistoryAtom)

    const router = useRouter()
    const [vrajexpandedtoo, setvrajExpandedtoo] = useState(false)
    const { register, handleSubmit, reset } = useForm({defaultValues: { search: ''}  })


    const logout = () => { setvrajExpandedtoo(false) 
        removeToken()
        router.push('/login') 
    }


    const vrajhandelformsubmit = async (data) => { const patel = `title=true&q=${data.search}`
       
    
    router.push(`/artwork?${patel}`)
       
    reset({ search: '' })
        
    setvrajExpandedtoo((prevState) => false)
        setvrajSearchingHistory(await addToHistory(patel))
    }

    return (
        <>
            <Navbar bg='info' variant='warning'  expand='lg'
                
                style={{ paddingTop: '15px', paddingBottom: '15px' }}
                expanded={vrajexpandedtoo}
            >
                <Container>
                    
                    <Navbar.Brand>Vraj bhaveshbhai patel</Navbar.Brand>
                    
                    
                    <Navbar.Toggle aria-controls='navbarScroll' onClick={() => setvrajExpandedtoo((prevState) => !prevState)}/>
                    
                    
                    <Navbar.Collapse id='navbarScroll'>
                        <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '100px' }} navbarScroll>
                            
                            
                            
                            
                            
                            
                            <Link href='/' passHref>


                                <Nav.Link active={router.pathname === '/'} onClick={() => setvrajExpandedtoo((prevState) => false)}> Home</Nav.Link>
                            </Link>

                            {myholdtoken && (  <Link href='/search' passHref>
                                    
                                    
                                    <Nav.Link active={router.pathname === '/search'}                                
                                        onClick={() =>setvrajExpandedtoo((prevState) => false)}>    Advanced Search
                                    </Nav.Link>

                                </Link>
                            )}

                        </Nav>

                        &nbsp;
                        {myholdtoken && (
                            <>
                                <Form className='d-flex' onSubmit={handleSubmit(vrajhandelformsubmit)} >
                                    
                                    
                                    <Form.Control type='search' className='me-2 form-control-sm' aria-label='Search' placeholder='Search' {...register('search')}
                                    />
                                    <Button variant='success' className='btn-sm' type='submit' > Search </Button>
                               
                                </Form>
                                &nbsp;&nbsp;  &nbsp;&nbsp;
                                <Nav>
                                    
                                    
                                    <NavDropdown title={myholdtoken.userName} id='basic-nav-dropdown'  >
                                      
                                      
                                        <Link href='/favourites' passHref>
                                           
                                           
                                            <NavDropdown.Item   active={ router.pathname === '/favourites'  }
                                               
                                               
                                               
                                               
                                                onClick={() =>setvrajExpandedtoo((prevState) => false  )}
                                            >Favourites           </NavDropdown.Item>
                                        
                                        
                                        </Link>
                                        <Link href='/history' passHref>
                                            
                                            
                                            
                                            
                                              <NavDropdown.Item 

                                                active={router.pathname ==='/history'    }
                                                
                                                
                                                onClick={() => setvrajExpandedtoo(   (prevState) => false )  }    >    Search History
                                            </NavDropdown.Item>




                                        </Link>
                                        <NavDropdown.Item
                                            onClick={() => {
                                                logout()
                                                setvrajExpandedtoo(
                                                    (prevState) => false
                                                )
                                            }}
                                        >
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </>
                        )}
                        {!myholdtoken && (
                            <Nav>

                                <Link href='/register' passHref>
                                
                                    <Nav.Link active={router.pathname === '/register'}   onClick={() =>
                                      
                                            setvrajExpandedtoo((prevState) => false)  }
                                    >              Register
                                    </Nav.Link>
                                </Link>
                                
                                
                                <Link href='/login' passHref>
                                    
                                    
                                    <Nav.Link   active={router.pathname === '/login'}     onClick={() =>
                                            setvrajExpandedtoo((prevState) => false)   }  >   Login
                                    
                                    
                                    </Nav.Link>
                                </Link>
                            </Nav>
                        )}
                    
                    
                    </Navbar.Collapse></Container></Navbar>
                
            
            <br /><br />

          
            
        </>
    )
}
