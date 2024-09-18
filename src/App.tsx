import { useEffect, useState } from 'react';
import { ProviderGroup } from './providers';
import { Stack } from './stackflow';
import { worker } from './mocks/browser';
import { axiosBase } from './apis';
import { log } from './utils';

if (import.meta.env.MODE === 'production') {
	console.log = () => {};
}

// @ts-expect-error
document.addEventListener('message', (event: MessageEvent) => {
	try {
		const data =
			typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
		const accessToken = data?.accessToken;
		if (accessToken) {
			log(accessToken);
			axiosBase.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
		}
	} catch (error: unknown) {
		log(error);
	}
});

function App() {
	const [workerReady, setWorkerReady] = useState(false);

	useEffect(() => {
		worker.start().then(() => setWorkerReady(true));
	}, []);

	if (!workerReady) return null;

	return (
		<ProviderGroup>
			<div className="relative max-w-window mx-auto shadow-shadow1">
				<Stack />
			</div>
		</ProviderGroup>
	);
}

export default App;
