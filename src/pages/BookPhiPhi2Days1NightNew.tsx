import React from 'react';
import { phiPhi2Days1Night } from '../data/tours/phi-phi-2-days-1-night';
import { BookingTemplate } from '../components/tours/BookingTemplate';

const BookPhiPhi2Days1NightNew: React.FC = () => {
  return <BookingTemplate tour={phiPhi2Days1Night} />;
};

export default BookPhiPhi2Days1NightNew;