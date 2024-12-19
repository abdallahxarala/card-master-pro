import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { QrCode, Smartphone, Share2 } from 'lucide-react';

const BusinessCard = ({ 
  cardData = {
    name: 'John Doe',
    title: 'Professional Title',
    company: 'Company Name',
    email: 'email@example.com',
    phone: '+1234567890',
    nfcEnabled: true,
    qrCode: true
  },
  isPreview = false 
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="relative bg-white shadow-lg rounded-xl overflow-hidden">
        <CardContent className="p-6">
          {/* Card Header */}
          <div className="mb-4 text-center">
            <h2 className="text-2xl font-bold text-gray-800">{cardData.name}</h2>
            <p className="text-gray-600">{cardData.title}</p>
          </div>

          {/* Card Body */}
          <div className="space-y-3">
            <p className="text-gray-700">{cardData.company}</p>
            <p className="text-gray-600">{cardData.email}</p>
            <p className="text-gray-600">{cardData.phone}</p>
          </div>

          {/* Interactive Features */}
          <div className="mt-6 flex justify-center space-x-4">
            {cardData.nfcEnabled && (
              <div className="flex items-center text-blue-600">
                <Smartphone className="w-5 h-5 mr-1" />
                <span className="text-sm">NFC</span>
              </div>
            )}
            {cardData.qrCode && (
              <div className="flex items-center text-blue-600">
                <QrCode className="w-5 h-5 mr-1" />
                <span className="text-sm">QR</span>
              </div>
            )}
            <div className="flex items-center text-blue-600">
              <Share2 className="w-5 h-5 mr-1" />
              <span className="text-sm">Share</span>
            </div>
          </div>

          {/* Preview Mode Overlay */}
          {isPreview && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">Preview Mode</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessCard;