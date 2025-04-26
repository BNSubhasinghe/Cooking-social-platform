import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TipsList from './TipsList';

const TipHome = () => {
  const [allTips, setAllTips] = useState([]);

  const handleTipsFetched = (tips) => {
    setAllTips(tips);
  };

  const tipOfTheDay = allTips.length > 0 ? allTips[0] : null;
  const featuredTips = allTips.slice(1, 4);

  return (
    <div className="space-y-8">
      {/* Tip of the Day Section */}
      {tipOfTheDay && (
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tip of the Day</h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">{tipOfTheDay.title}</h3>
            <p className="text-gray-600 mt-2">{tipOfTheDay.content}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">Category: {tipOfTheDay.category}</span>
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-gray-600">{tipOfTheDay.rating}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Tips Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredTips.map((tip) => (
            <div key={tip.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800">{tip.title}</h3>
              <p className="text-gray-600 mt-2">{tip.content}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">Category: {tip.category}</span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-gray-600">{tip.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips List Component */}
      <TipsList onTipsFetched={handleTipsFetched} />

      {/* Call to Action */}
      <div className="text-center">
        <Link 
          to="/tips/add" 
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          Add New Cooking Tip
        </Link>
      </div>
    </div>
  );
};

export default TipHome;