
import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types';
import { Icons } from '../constants';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-lebanese-bronze/10 hover:shadow-xl transition-all group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="bg-lebanese-green text-white text-xs font-bold px-3 py-1 rounded shadow-md">
            {property.category === 'sale' ? 'للبيع' : 'للايجار'}
          </span>
          {property.featured && (
            <span className="bg-lebanese-bronze text-white text-xs font-bold px-3 py-1 rounded shadow-md">
              مميز
            </span>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded text-lebanese-green font-extrabold text-lg shadow-sm">
            ${property.price.toLocaleString()}
            {property.category === 'rent' && <span className="text-sm font-normal"> / شهرياً</span>}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-1 text-lebanese-bronze mb-2">
          <Icons.Location />
          <span className="text-xs font-bold">{property.location}</span>
        </div>
        <h3 className="text-xl font-bold text-lebanese-green mb-3 line-clamp-1">
          {property.title}
        </h3>
        
        <div className="flex items-center justify-between text-gray-500 text-sm py-4 border-y border-gray-100 mb-4">
          {property.bedrooms && (
            <div className="flex items-center gap-1.5">
              <Icons.Bed />
              <span>{property.bedrooms} غرف</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1.5">
              <Icons.Bath />
              <span>{property.bathrooms} حمام</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Icons.Area />
            <span>{property.area} م²</span>
          </div>
        </div>

        <Link
          to={`/property/${property.id}`}
          className="block w-full text-center py-3 border-2 border-lebanese-green text-lebanese-green font-bold rounded hover:bg-lebanese-green hover:text-white transition-all"
        >
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
