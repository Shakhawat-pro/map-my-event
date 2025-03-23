import { Star } from "lucide-react";

const HotelCard = ({ title, price, image, tag }) => {
  return (
    <div className="flex bg-white p-4 rounded-xl shadow-lg">
      <img className="w-24 h-24 rounded-lg object-cover" src={image} alt={title} />
      <div className="ml-4">
        <h3 className="font-semibold">{title}</h3>
        <div className="flex items-center space-x-1">
          {[...Array(4)].map((_, i) => (
            <Star key={i} size={14} className="text-yellow-400" />
          ))}
          <Star size={14} className="text-gray-300" />
        </div>
        <p className="text-lg font-bold mt-2">${price} / night {tag}</p>
      </div>
    </div>
  );
};

export default HotelCard;
