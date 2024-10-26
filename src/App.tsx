import { ProviderGroup } from './providers';
import { Stack } from './stackflow';
import { AsyncBoundary } from './components';
import { useAppBridge } from './hooks';

if (import.meta.env.MODE === 'production') {
	console.log = () => {};
}

function App() {
	const params = new URLSearchParams(window.location.search);
	const paramsObj: Record<string, string> = {};
	Array.from(params.entries()).forEach(([key, value]) => {
		paramsObj[key] = value;
	});
	if (paramsObj.top) {
		localStorage.setItem('topSafeArea', paramsObj.top);
	}

	useAppBridge();

	return (
		<AsyncBoundary>
			<ProviderGroup>
				<div className="relative w-full mx-auto max-w-window">
					<Stack />
				</div>
			</ProviderGroup>
		</AsyncBoundary>
	);
}

export default App;
