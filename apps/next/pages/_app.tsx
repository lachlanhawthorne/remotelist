import { useEffect } from "react";
import App from "next/app";
import NextNProgress from "nextjs-progressbar";

import { supabaseClient, supabaseServerClient } from "@supabase/supabase-auth-helpers/nextjs";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";

import { Layout } from "@remotelist/app/layout";

import "../styles/globals.css"

import type { AppProps } from "next/app";
import type { User } from "@supabase/supabase-js";

interface AppPropsWithUser extends AppProps {
  initialUserData: User;
}

function MyApp({ Component, pageProps, initialUserData }: AppPropsWithUser) {
  return (
    <UserProvider 
      supabaseClient={supabaseClient} 
      // initialUserData={initialUserData}
    >
      <Layout>
        <NextNProgress
          color="#FFF"
          startPosition={0.3}
          stopDelayMs={200}
          height={2}
          options={{
            showSpinner: false
          }}
        />
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  )
}



// MyApp.getInitialProps = async (appContext: any) => {
//   // calls page"s `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//   const user = supabaseClient.auth.user()

//   console.log('getInitialProps user', user)

//   return { 
//     ...appProps, 
//     initialUserData: user ?? {},
//   }
// }

export default MyApp
