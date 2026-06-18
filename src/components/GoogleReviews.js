import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import api from '../utils/api';


const AVATAR_COLORS = [
  'bg-emerald-600',
  'bg-amber-600',
  'bg-rose-600',
  'bg-violet-600',
  'bg-sky-600',
  'bg-teal-600',
  'bg-orange-600',
  'bg-indigo-600',
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-4 w-4 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
      />
    ))}
  </div>
);

const Avatar = ({ name, photo, colorClass }) => {
  if (photo) {
    return <img src={photo} alt={name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />;
  }
  const initials = name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div className={`w-9 h-9 rounded-full ${colorClass} flex items-center justify-center text-white font-semibold text-xs flex-shrink-0`}>
      {initials}
    </div>
  );
};

const ReviewCard = ({ review, index }) => {
  const colorClass = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100 break-inside-avoid mb-4">
      <StarRating rating={review.rating} />
      <p className="mt-3 text-stone-700 text-sm leading-relaxed">
        "{review.text}"
      </p>
      <div className="flex items-center gap-2.5 mt-4">
        <Avatar name={review.author} photo={review.author_photo} colorClass={colorClass} />
        <div>
          <p className="font-semibold text-stone-800 text-sm">{review.author}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
            <span className="text-xs text-stone-400">Google review</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [overallRating, setOverallRating] = useState(null);
  const [totalRatings, setTotalRatings] = useState(null);

  useEffect(() => {
    api.get('/reviews')
      .then(res => {
        if (res.data.reviews && res.data.reviews.length > 0) {
          setReviews(res.data.reviews);
        }
        if (res.data.rating) setOverallRating(res.data.rating);
        if (res.data.total_ratings) setTotalRatings(res.data.total_ratings);
      })
      .catch(() => {});
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="py-16 px-6 bg-blue-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white border border-stone-200 rounded-full px-4 py-1.5 mb-4 shadow-sm">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
            <span className="text-stone-500 font-medium text-sm">Google Reviews</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <span className="text-5xl font-bold text-white">{overallRating ? Number(overallRating).toFixed(1) : ''}</span>
            <div className="text-left">
              <StarRating rating={Math.round(overallRating)} />
              <p className="text-sm text-blue-200 mt-1">
                {totalRatings ? `${totalRatings.toLocaleString()} verified reviews` : 'Verified reviews'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} index={i} />
          ))}
        </div>

        <div className="text-center mt-6">
          <a
            href="https://www.google.com/maps/place/Laundry+Express+Colchester/@51.8903086,0.867185,17z/data=!3m1!4b1!4m6!3m5!1s0x6743fcc25328aef:0x331b874e5e06d252!8m2!3d51.8903053!4d0.8697599!16s%2Fg%2F11xlfw4k2h"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white font-medium text-sm transition-colors"
          >
            <img src="https://www.google.com/favicon.ico" alt="" className="w-4 h-4" />
            See all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};
