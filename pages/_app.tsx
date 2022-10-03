import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { makeServer } from "../mirage"

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" })
} else if (
  process.env.NODE_ENV === "production" ||
  process.env.REACT_APP_DEMO
) {
  makeServer({ environment: "production"}); // For a live demo when deploying to Vercel
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
