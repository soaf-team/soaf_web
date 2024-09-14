import { RenderFallbackProps } from "./ErrorBoundary";

export const ErrorFallback = ({ error, reset }: RenderFallbackProps) => {
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={reset}>Try again</button>
    </div>
  );
};
