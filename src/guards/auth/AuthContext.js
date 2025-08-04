'use client';
import { createContext, useEffect, useReducer } from 'react';
import { firebase } from 'src/guards/firebase/Firebase';
import { supabase } from 'src/guards/supabase/supabaseClient';
import { setSession } from 'src/guards/jwt/Jwt';

import useSWRMutation from 'swr/mutation';

// Initial state
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  platform: 'Firebase',   //platform: 'Firebase' | 'Supabase' | 'JWT' | null;
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_STATE_CHANGED':
      return { ...state, ...action.payload, isInitialized: true };
    case 'SET_PLATFORM':
      return { ...state, platform: action.payload };
    default:
      return state;
  }
};

// Create context
export const AuthContext = createContext({
  ...initialState,
  signup: () => Promise.resolve(),
  signin: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setPlatform: () => { },
  loginWithProvider: () => Promise.resolve(),
  loginWithSupabase: () => Promise.resolve(),
  loginWithFirebase: () => Promise.resolve(),
  loginWithJWT: () => Promise.resolve(),
});

// Authentication fetch helper
const authFetch = async (url, options = {}) => {
  const accessToken = localStorage.getItem('accessToken');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
};

// POST request fetcher for SWR
const postfetcher = (url, { arg }) =>
  authFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  }).then((res) => res);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { trigger } = useSWRMutation('/api/account/login', postfetcher);

  const setPlatform = (platform) => {
    dispatch({ type: 'SET_PLATFORM', payload: platform });
  };

  useEffect(() => {
    if (state.platform === 'JWT') {
      const jwtUser = localStorage.getItem('jwtUser');
      const user = jwtUser ? JSON.parse(jwtUser) : null;

      if (user) {
        const fullName = user.displayName;

        dispatch({
          type: 'AUTH_STATE_CHANGED',
          payload: {
            isAuthenticated: true,
            user: {
              id: user.uid,
              email: user.email,
              displayName: fullName,
            },
            platform: 'JWT',
          },
        });
      } else {
        dispatch({
          type: 'AUTH_STATE_CHANGED',
          payload: { isAuthenticated: false, user: null, platform: 'JWT' },
        });
      }
    }
    if (state.platform === 'Firebase') {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const fullName = user.displayName;
          console.log(fullName);

          dispatch({
            type: 'AUTH_STATE_CHANGED',
            payload: {
              isAuthenticated: true,
              user: {
                id: user.uid,
                email: user.email,
                displayName: fullName,
              },
              platform: 'Firebase',
            },
          });
        } else {
          dispatch({
            type: 'AUTH_STATE_CHANGED',
            payload: { isAuthenticated: false, user: null, platform: 'Firebase' },
          });
        }
      });

      return () => unsubscribe();
    }

    if (state.platform === 'Supabase') {
      const { data } = supabase.auth.getSession();

      if (data?.user) {
        const fullName = data.user.user_metadata?.full_name || data.user.email;

        dispatch({
          type: 'AUTH_STATE_CHANGED',
          payload: {
            isAuthenticated: true,
            user: {
              id: data.user.id,
              email: data.user.email,
              displayName: fullName,
            },
            platform: 'Supabase',
          },
        });
      } else {
        dispatch({
          type: 'AUTH_STATE_CHANGED',
          payload: {
            isAuthenticated: false,
            user: null,
            platform: 'Supabase',
          },
        });
      }

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const fullName = session.user.user_metadata?.full_name || session.user.email;

          dispatch({
            type: 'AUTH_STATE_CHANGED',
            payload: {
              isAuthenticated: true,
              user: {
                id: session.user.id,
                avatar: session.user.user_metadata?.avatar || '',
                email: session.user.email,
                displayName: fullName,
              },
              platform: 'Supabase',
            },
          });
        } else {
          dispatch({
            type: 'AUTH_STATE_CHANGED',
            payload: {
              isAuthenticated: false,
              user: null,
              platform: 'Supabase',
            },
          });
        }
      });

      return () => {
        authListener?.subscription?.unsubscribe();
      };
    }
  }, [state.platform]);

  const loginWithProvider = async (provider) => {
    if (state.platform === 'Firebase') {
      let providerInstance;
      switch (provider) {
        case 'google':
          providerInstance = new firebase.auth.GoogleAuthProvider();
          break;
        case 'github':
          providerInstance = new firebase.auth.GithubAuthProvider();
          break;
        default:
          throw new Error('Provider not supported');
      }
      return firebase.auth().signInWithPopup(providerInstance);
    } else if (state.platform === 'Supabase') {
      return supabase.auth.signInWithOAuth({
        provider,
      });
    }
  };

  const signin = async (email, password) => {
    if (state.platform === 'JWT') {
      try {
        const data = await trigger({ email, password });
        let user = data[1].user;
        if (user) {
          dispatch({
            type: 'AUTH_STATE_CHANGED',
            payload: {
              isAuthenticated: true,
              user: {
                id: user.id,
                email: user.email,
                displayName: user.displayName,
              },
              platform: 'JWT',
            },
          });
          localStorage.setItem('jwtUser', JSON.stringify(user));
        } else {
          dispatch({
            type: 'AUTH_STATE_CHANGED',
            payload: {
              isAuthenticated: false,
              user: null,
              platform: 'JWT',
            },
          });
        }
      } catch (error) {
        console.log(error, 'Jwt Authentication failed');
      }
    } else if (state.platform === 'Firebase') {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    } else if (state.platform === 'Supabase') {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  };

  const signup = async (email, password, userName) => {
    if (state.platform === 'Firebase') {


      try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        if (user) {

          await user.updateProfile({
            displayName: userName,
          });


          await user.reload();


          const updatedUser = firebase.auth().currentUser;


          dispatch({
            type: 'AUTH_STATE_CHANGED',
            payload: {
              isAuthenticated: true,
              user: {
                id: updatedUser?.uid,
                email: updatedUser?.email,
                displayName: updatedUser?.displayName,
              },
              platform: 'Firebase',
            },
          });
        }
      } catch (error) {
        console.error('Error signing up with Firebase:', error);
        throw new Error(error.message);
      }
    } else if (state.platform === 'Supabase') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: userName },
        },
      });

      if (error) {
        throw error;
      }
    }
  };

  const logout = async () => {
    if (state.platform === 'JWT') {
      setSession(null);
      dispatch({
        type: 'AUTH_STATE_CHANGED',
        payload: { isAuthenticated: false, user: null, platform: 'JWT' },
      });
      localStorage.removeItem('jwtUser');
    } else if (state.platform === 'Firebase') {
      await firebase.auth().signOut();
    } else if (state.platform === 'Supabase') {
      await supabase.auth.signOut();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setPlatform,
        signin,
        signup,
        logout,
        loginWithProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
