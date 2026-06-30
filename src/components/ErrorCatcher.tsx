import { ReactNode, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import StyledButton from "./styled/Button";

type FallbackProps = {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
};

// Transient errors that are safe to auto-recover from silently.
// #185 = Maximum update depth exceeded (loop re-render, resolves on reset).
const AUTO_RESET_PATTERNS = [/Minified React error #185/];

function isAutoResetError(error: Error): boolean {
  return AUTO_RESET_PATTERNS.some((p) => p.test(error.message));
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  useEffect(() => {
    if (isAutoResetError(error)) {
      resetErrorBoundary();
    }
  }, [error, resetErrorBoundary]);

  if (isAutoResetError(error)) {
    return null;
  }

  return (
    <div role="alert" className="text-lg text-red-600">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <StyledButton className="mini" onClick={resetErrorBoundary}>
        Try again
      </StyledButton>
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
