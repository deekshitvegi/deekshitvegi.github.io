import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-800 p-8">
          <div className="max-w-2xl w-full bg-white shadow-xl rounded-lg p-8 border border-slate-200">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <p className="text-lg mb-6">The application encountered a critical error and cannot load.</p>
            
            <div className="bg-slate-100 p-4 rounded-md overflow-auto max-h-64 mb-6 border border-slate-300">
              <p className="font-mono text-sm text-red-800 font-semibold">
                {this.state.error && this.state.error.toString()}
              </p>
              {this.state.errorInfo && (
                <pre className="font-mono text-xs mt-2 text-slate-600 whitespace-pre-wrap">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </div>

            <button 
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="px-6 py-3 bg-slate-800 text-white rounded-md font-semibold hover:bg-slate-700 transition-colors"
            >
              Clear Cache & Reload
            </button>
             <p className="text-xs text-slate-500 mt-4">If clearing cache does not help, please check the console for more details.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;