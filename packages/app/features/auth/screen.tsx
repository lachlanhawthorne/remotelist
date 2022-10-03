import React, { useEffect } from "react";
import { Authentication } from "@remotelist/ui";
import { withPageAuth, getUser } from '@supabase/auth-helpers-nextjs';

import { useRouter } from "next/router";

export function AuthScreen() {
  const router = useRouter();

  return (
    <Authentication method={router.route.replace('/', '')} />
  )
}

export const getServerSideProps = withPageAuth({
  authRequired: false,
  async getServerSideProps(ctx) {
    // Access the user object
    const { user, accessToken } = await getUser(ctx);

    console.log('user', user)

    if(user) {
      return {
        redirect: {
          destination: '/account',
          permanent: false,
        }
      }
    }
    // return { props: { email: user?.email } };


    return { props: { } };
  }
});