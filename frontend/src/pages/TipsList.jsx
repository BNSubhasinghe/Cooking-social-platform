import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TipsList = ({ onTipsFetched }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axios.get('/api/tips'); // Adjust the endpoint as needed
        console.log('API response:', response.data); // Debugging log for API response
        const tipsData = Array.isArray(response.data) ? response.data : [];
        console.log('Processed tips data:', tipsData); // Debugging log for processed data
        setTips(tipsData);
        if (onTipsFetched) {
          onTipsFetched(tipsData);
        }
      } catch (error) {
        console.error('Error fetching tips:', error);
      }
    };

    fetchTips();
  }, [onTipsFetched]);

  const categories = ['all', 'Storage', 'Prep', 'Substitutes'];

  const filteredTips = tips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  console.log('Filtered tips:', filteredTips); // Debugging log for filtered tips

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search tips..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTips.map(tip => (
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
            <div className="mt-4 flex justify-end space-x-2">
              <button className="text-blue-500 hover:text-blue-700">Rate</button>
              <button className="text-green-500 hover:text-green-700">Save</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Tip Button */}
      <div className="text-center mt-8">
        <Link
          to="/tips/add"
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          Add New Tip
        </Link>
      </div>
    </div>
  );
};

export default TipsList;