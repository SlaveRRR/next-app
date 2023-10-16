import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import Header from '@/components/structures/header/header'
import Main from '@/components/structures/main/main'

import '../styles/style.scss'
import ContextProvider from '@/context/provider'
import AuthProvider from '@/context/authProvider'
import { SocketProvider } from '@/context/socketProvider'
import UIContainer from '@/components/screens/UIContainer/UIContainer'



const roboto = Roboto({ subsets:['latin'], weight:['300','400','500']  });

export const metadata: Metadata = {
  title: 'Create Next App',
  description:'Next blog app'
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <html lang="en">
      <body className={roboto.className}>
        <SocketProvider>
        <AuthProvider>
        <ContextProvider>
          <Header />
          <Main>
            {children}
          </Main>
          <UIContainer/>
        </ContextProvider>
        </AuthProvider>
        </SocketProvider>

      </body>

    </html>
  )

}

export default RootLayout;


