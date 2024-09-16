import { useEffect, useState } from 'react';
import { ProviderGroup } from './providers';
import { Stack } from './stackflow';
import { worker } from './mocks/browser';

if (import.meta.env.MODE === 'production') {
	console.log = () => {};
}

function App() {
	const [workerReady, setWorkerReady] = useState(false);

	useEffect(() => {
		worker.start().then(() => setWorkerReady(true));
	}, []);

	useEffect(() => {
		const modalDiv = document.getElementById('modal');
		if (!modalDiv) {
			const div = document.createElement('div');
			div.id = 'modal';
			document.body.appendChild(div);
		}
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
