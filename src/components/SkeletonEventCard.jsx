const SkeletonEventCard = () => {
    return (
      <div className="animate-pulse bg-white p-4 rounded-lg shadow">
        <div className="h-4 w-1/2 bg-gray-300 rounded mb-2" />
        <div className="h-3 w-1/3 bg-gray-300 rounded mb-4" />
        <div className="h-40 bg-gray-200 rounded mb-3" />
        <div className="h-3 w-full bg-gray-200 rounded mb-1" />
        <div className="h-3 w-5/6 bg-gray-200 rounded mb-1" />
        <div className="h-3 w-2/3 bg-gray-200 rounded" />
      </div>
    );
  };
  
  export default SkeletonEventCard;
  