import React from 'react'

const FeatureCard = ({ icon: Icon, title, description, color }) => {
  return (
    <div className="bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-md">
      
      {/* Icon */}
      <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-lg bg-gray-50 mb-5">
        <Icon className={`text-2xl ${color}`} />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-[16px] leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default FeatureCard
