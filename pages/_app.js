import '../styles/globals.css'
import {useEffect} from "react";
import ErrorBoundary from "../components/ErrorBoundary"
import { SessionProvider } from "next-auth/react";
import Router from 'next/router';
import AppProvider from "../ContextApi";
import { store } from '../store';
import { Provider } from 'react-redux'
import Nav from "../components/navbar/Nav"
import Footer from "../components/Footer";
import AOS from "aos"
import nprogress from 'nprogress';
import "aos/dist/aos.css";
import "nprogress/nprogress.css"

  Router.events.on("routeChangeStart",()=> nprogress.start());
  Router.events.on("routeChangeComplete",()=> nprogress.done());
  Router.events.on("routeChangeError",()=> nprogress.done());


function MyApp({ Component, pageProps:{
  session,...pageProps
} }) {

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      offset: 50,
      duration:1000
    });
  }, []);

    return <SessionProvider session={session}>
      <Provider store={store}>
      <AppProvider>
        <Nav />
        <ErrorBoundary >
        <Component {...pageProps} />
        </ErrorBoundary>
        <Footer />
      </AppProvider>
      </Provider>
    </SessionProvider>
    
}

export default MyApp
