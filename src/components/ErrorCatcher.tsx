import React, { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

type FallbackProps = {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
};
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" className="text-lg text-red-600">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
type Props = {
  children: ReactNode;
};

const ErrorCatcher = ({ children }: Props) => {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>;
};

export default ErrorCatcher;
