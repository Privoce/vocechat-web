import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import StyledButton from "./styled/Button";

type FallbackProps = {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
};
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
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
