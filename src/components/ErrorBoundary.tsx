import React from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Здесь можно отправлять ошибки в мониторинг
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return <>{this.props.fallback}</>;
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2 text-red-600">Что-то пошло не так</h2>
          <p className="text-gray-600 mb-4">Эта страница временно недоступна. Попробуйте обновить или вернитесь назад.</p>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={() => window.location.reload()}>Обновить</button>
            <button className="px-4 py-2 rounded border" onClick={() => window.history.back()}>Назад</button>
            <button className="px-4 py-2 rounded border" onClick={this.handleReset}>Сброс</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
