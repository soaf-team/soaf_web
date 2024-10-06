import { ProviderGroup } from './providers';
import { Stack } from './stackflow';
import { AsyncBoundary } from './components';
import { useAppBridge } from './hooks';

if (import.meta.env.MODE === 'production') {
	console.log = () => {};
}

function App() {
	useAppBridge();

	return (
		<AsyncBoundary>
			<ProviderGroup>
				<div className="relative w-full mx-auto max-w-window shadow-shadow1">
					<Stack />
				</div>
			</ProviderGroup>
		</AsyncBoundary>
	);
}

export default App;
