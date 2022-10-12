import "../styles/globals.css";
import "../styles/form.css";

import { Provider } from "react-redux";
import store from "../redux/store";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <>
        <Script
          id="gtag"
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=GTM-WJVZHTB`}
        />

        <Script strategy="lazyOnload" id="gtm-tag">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GTM-WJVZHTB', {
              page_path: window.location.pathname,
            });
                `}
        </Script>

        <Component {...pageProps} />
      </>
    </Provider>
  );
}

export default MyApp;
