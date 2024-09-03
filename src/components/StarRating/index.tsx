// StarRating component for displaying dynamic stars based on rating
export function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  return (
    <div className="flex mt-2">
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.176c.969 0 1.371 1.24.588 1.81l-3.386 2.46a1 1 0 00-.364 1.118l1.287 3.975c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.785.57-1.838-.196-1.54-1.118l1.287-3.975a1 1 0 00-.364-1.118L2.055 9.4c-.783-.57-.381-1.81.588-1.81h4.176a1 1 0 00.95-.69l1.286-3.974z" />
        </svg>
      ))}
      {halfStar && (
        <svg
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.176c.969 0 1.371 1.24.588 1.81l-3.386 2.46a1 1 0 00-.364 1.118l1.287 3.975c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.785.57-1.838-.196-1.54-1.118l1.287-3.975a1 1 0 00-.364-1.118L2.055 9.4c-.783-.57-.381-1.81.588-1.81h4.176a1 1 0 00.95-.69l1.286-3.974z" />
        </svg>
      )}
    </div>
  );
}
