// Import bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// Import globals
import '../styles/helpers.scss';

// Toast in the toaster
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function MyApp({ Component, pageProps }) {
  return <div>
    <ToastContainer />
    <Component {...pageProps} />
  </div>
}

export default MyApp
