import { Nav, Provider } from '@components'
import '@styles/globals.css'

// edit the meta data for the app
// this will generate the head element <head> Prompts </head> 
export const metadata = {
    title: "Prompts",
    description: "Discover & Share AI Prompts"
}

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <div className='main'>
                        <div className="gradient"></div>
                    </div>

                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout