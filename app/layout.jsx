import "../styles/globals.css";
import Nav from '../components/Nav'
import Provider from '../components/Provider'
export const metadata = {
  title: "Data Trek",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <head>
          <link rel="shortcut icon" href="/logo.svg" />
   </head>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
         <Nav/>
          {children}
        </main>
        </Provider> 
    </body>
  </html>
);

export default RootLayout;