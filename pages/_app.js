import Head from 'next/head';
import Layout from '../components/layout/layout';
import '../styles/globals.css';
import Notification from './../components/ui/notification';
import { NotificationContextProvider } from './../store/notification-context';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Nextjs Event</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
        <Notification
          title="Title"
          message="This is notification"
          status="success"
        />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
