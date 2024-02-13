import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import SecretView from './routes/secret';
import Login from './routes/login';
import Signup from './routes/signup';

import { GoogleOAuthProvider } from '@react-oauth/google';

import { AuthService } from "@genezio/auth";

AuthService.getInstance().setTokenAndRegion("0-ceofjz54pxa2vg6ve3rsi6pe640vxteq", "us-east-1");

const router = createBrowserRouter([
  {
    path: "/",
    element: <SecretView />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <GoogleOAuthProvider clientId="748359029486-pcb528plfi4rno8r815i2u04fa0doma1.apps.googleusercontent.com">
  <RouterProvider router={router} />
  </GoogleOAuthProvider>
  </React.StrictMode>,
)
