import { RestauranteProvider } from '../context/RestauranteProvider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<RestauranteProvider>
			<Component {...pageProps} />;
		</RestauranteProvider>
	);
}

export default MyApp;
