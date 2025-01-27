import React from 'react'

const CardAnimationSection = () => {
  return (
    <div className='flex justify-between items-center'>
        <div id="next-section" className="relative w-full h-[400px] mt-8">
        <p className="text-lg font-semibold">This is the next section</p>
        </div>
        <div id='cutom-append'>
        {/* <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 flex items-center space-x-2">
          <span className="text-blue-500">📲</span>
          <span>Online Payments</span>
        </h2>
        <p className="text-gray-600 mt-4 text-sm md:text-base">
          <strong>Online payments, minus the friction</strong>
        </p>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Collect online payments, make payouts, onboard customers, and offer embedded finance solutions through an
          intuitive dashboard and easy-to-integrate APIs.
        </p>
        <button className="mt-6 bg-lime-500 text-white font-medium py-2 px-4 md:px-6 md:py-3 rounded-lg shadow hover:bg-lime-600 transition">
          Make Payments
        </button> */}
        </div>
    </div>

  )
}

export default CardAnimationSection