import { atom } from "jotai";
import { supabase } from "./supabase";

import type { User, Session } from "@supabase/supabase-js";

export const authErrorAtom = atom<string | null>(null);
export const regigsterSuccessAtom = atom<boolean>(false);

export const userAtom = atom<User | null>(supabase.auth.user());
export const sessionAtom = atom<Session | null>(supabase.auth.session());

sessionAtom.onMount = setSession => {
  const { data: subscription } = supabase.auth.onAuthStateChange(
    (_event, session) => setSession(session),
  )

  return subscription?.unsubscribe
}

export const signInAtom = atom(
  () => {}, 
  ( get, set, 
    { email, password } : { email: string; password: string; } 
  ) => {
    set(authErrorAtom, null)

    supabase.auth.signIn({ email, password })
      .then(({ user, session, error }) => {
        if (error) set(authErrorAtom, error.message)
        else {
          set(userAtom, user)
          set(sessionAtom, session)
        }
      });
  }
)

export const signOutAtom = atom(
  () => {},
  ( get, set ) => {
    supabase.auth.signOut()
      .then(() => {
        set(userAtom, null)
        set(sessionAtom, null)
      }
    );
  }
)

export const registerUserAtom = atom(
  () => {},
  ( get, set,
    { name, email, password } : { name: string; email: string; password: string; }
  ) => {
    supabase.auth.signUp({ email, password }, { data: { name } })
      .then(({ user, session, error }) => {
        if (error) set(authErrorAtom, error.message)
        if (user) set(regigsterSuccessAtom, true)
        // maybe ??
        // set(userAtom, user)
        // set(sessionAtom, session)
      }
    );
  }
)

export const resetAuthAttemptAtom = atom(
  () => {},
  ( get, set ) => {
    set(authErrorAtom, null)
    set(regigsterSuccessAtom, false)
  }
)
