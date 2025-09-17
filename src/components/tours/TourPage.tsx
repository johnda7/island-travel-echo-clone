import React from 'react';
import { useParams } from 'react-router-dom';
import { getTourBySlug } from '../../data/tours';
import { TourTemplate } from './TourTemplate';
import NotFound from '../../pages/NotFound';

interface TourPageProps {
  tourSlug?: string;
}

export const TourPage: React.FC<TourPageProps> = ({ tourSlug }) => {
  const params = useParams();
  const slug = tourSlug || params.slug;
  
  if (!slug) {
    return <NotFound />;
  }
  
  const tour = getTourBySlug(slug);
  
  if (!tour) {
    return <NotFound />;
  }
  
  return <TourTemplate tour={tour} />;
};

export default TourPage;