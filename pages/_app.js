import '../styles/bootstrap.min.css'
import Layout from '../components/Layout'
import RouteGuard from '../components/RouteGuard'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }) {
    return (
        <RouteGuard><Layout><SWRConfig
                    value={{ fetcher: async (url) => {
                            const vp = await fetch(url)
                            if (!vp.ok) {
                                const error = new Error( 'something went wrong while fetching data.'     )



                                error.info = await vp.json()
                                error.status = vp.status

                                throw error
                            }

                            return vp.json()
                        }
                    }}
                >
                    <Component {...pageProps} />
                </SWRConfig> </Layout></RouteGuard> )}

export default MyApp
