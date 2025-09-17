import React from 'react';
import { phiPhi2Days1Night } from '../data/tours/phi-phi-2-days-1-night';
import { TourTemplate } from '../components/tours/TourTemplate';

const PhiPhi2Days1Night: React.FC = () => {
  return <TourTemplate tour={phiPhi2Days1Night} />;
};

export default PhiPhi2Days1Night;