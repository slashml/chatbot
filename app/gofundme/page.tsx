import React, { useState } from 'react';

export default function GoFundMePage() {
  const campaign = {
    title: 'Help John Recover After Accident',
    description:
      'John was recently in a serious car accident and needs your help with medical expenses and rehabilitation. Any amount you can contribute will make a huge difference!',
    goal: 10000,
    raised: 3500,
    image: 'https://via.placeholder.com/800x400', // Replace with an actual image URL
  };

  const [donationAmount, setDonationAmount] = useState('');

  const handleInputChange = (event) => {
    setDonationAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `Thank you for your generous donation of $${donationAmount}! (This is a demo)`
    );
    // In a real application, you would process the donation here
  };

  const progress = (campaign.raised / campaign.goal) * 100;

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">
                {campaign.title}
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <img
                  src={campaign.image}
                  alt="Campaign"
                  className="rounded-md mb-4"
                />
                <p>{campaign.description}</p>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div
                      style={{ width: `${progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    ></div>
                  </div>
                  <div className="flex justify-between">
                    <span>Raised: ${campaign.raised}</span>
                    <span>Goal: ${campaign.goal}</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 text-base leading-6 space-y-4 sm:text-lg sm:leading-7">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="donation"
                      className="text-gray-700 font-medium"
                    >
                      Donation Amount:
                    </label>
                    <div className="mt-1">
                      <input
                        type="number"
                        id="donation"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter amount in USD"
                        value={donationAmount}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Donate Now
                    </button>
                  </div>
                </form>
              </div>
              <div className="pt-6 text-base leading-6 space-y-4 sm:text-lg sm:leading-7">
                <h2 className="text-xl font-semibold mb-2">Updates</h2>
                <div className="space-y-2">
                  <p className="text-gray-800">
                    <strong>August 18, 2025:</strong> John is showing signs of
                    improvement! Thank you all for your support.
                  </p>
                  <p className="text-gray-800">
                    <strong>August 15, 2025:</strong> We are overwhelmed by
                    the generosity. Every dollar counts!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}