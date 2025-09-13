import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookPhiPhi2Days = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Автоматический редирект на новую страницу бронирования
    navigate('/book/phi-phi-treasure-2d-1n-standard/reserv', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Перенаправление на новую страницу бронирования...</p>
      </div>
    </div>
  );
};

export default BookPhiPhi2Days;