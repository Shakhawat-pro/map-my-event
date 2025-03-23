import React from "react";
import Map from "../../components/Map";

const Events = [
  {
    id: 1,
    name: "Nice room in a new house with clean kitchen",
    price: 550,
    rating: 4,
    category: "POPULAR",
    image: "https://via.placeholder.com/100",
    guests: 1,
    bedrooms: 1,
    bathrooms: 2,
  },
  {
    id: 2,
    name: "Clean Room, Central Location in Manhattan",
    price: 250,
    rating: 4,
    category: "PREMIUM",
    image: "https://via.placeholder.com/100",
    guests: 1,
    bedrooms: 1,
    bathrooms: 2,
  },
  {
    id: 3,
    name: "Modern Room 20 Minutes to Times Square",
    price: 150,
    rating: 4,
    category: "BEST PRICE",
    image: "https://via.placeholder.com/100",
    guests: 1,
    bedrooms: 1,
    bathrooms: 2,
  },
];

function MapPage() {
  return (
    <div className="bg-background min-h-screen p-6 flex h-screen">
      {/* Left Section - Event Listings */}
      <div className="w-1/2 bg-white p-6 rounded-lg shadow-lg">
        {/* Search Bar */}
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search Events..."
            className="input input-bordered w-full"
          />
          <button className="btn bg-primary text-white">Search</button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Events <span className="text-textGray">(242 results)</span>
        </h2>

        {/* Event Listings */}
        <div className="space-y-4">
          {Events.map((Event) => (
            <div key={Event.id} className="flex bg-gray-50 p-4 rounded-lg shadow">
              <img className="w-24 h-24 rounded-lg object-cover" src={Event.image} alt="Event" />
              <div className="ml-4">
                <div className={`badge ${Event.category === "POPULAR" ? "bg-purple-500 text-white" : "bg-yellow-500 text-white"}`}>
                  {Event.category}
                </div>
                <h3 className="font-semibold">{Event.name}</h3>
                <p className="text-gray-600 text-sm">
                  {Event.guests} guest · {Event.bedrooms} bedroom · {Event.bathrooms} bathroom
                </p>
                <div className="rating my-1">
                  {[...Array(Event.rating)].map((_, i) => (
                    <input key={i} type="radio" name={`rating-${Event.id}`} className="mask mask-star-2 bg-yellow-400" checked />
                  ))}
                </div>
                <p className="text-lg font-bold">${Event.price} / night</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Static Map */}
      <div className="w-1/2 p-4">
        <Map></Map>
      </div>
    </div>
  );
}

export default MapPage;
