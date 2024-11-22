import React from 'react';
import {
    Phone,
    Mail,
    Home,
    User,
    Calendar,
    DollarSign,
    Building
} from 'lucide-react';
import { StatusStepper } from './StatusStepper';


export const ReferralCard = ({
    referral,
    onStatusChange
}) => {
    const handleStatusChange = (newStatus) => {
        onStatusChange(referral.id, newStatus);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{referral.name}</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                            {referral.type}
                        </span>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center justify-end gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(referral.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                <StatusStepper
                    type={referral.type}
                    currentStatus={referral.status}
                    onStatusChange={handleStatusChange}
                />

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            <a href={`mailto:${referral.email}`} className="hover:text-blue-600 text-sm">
                                {referral.email}
                            </a>
                        </div>

                        <div className="flex items-center text-gray-600">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            <a href={`tel:${referral.phone}`} className="hover:text-blue-600 text-sm">
                                {referral.phone}
                            </a>
                        </div>

                        <div className="flex items-center text-gray-600">
                            <User className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="text-sm">Assigned to: {referral.assignedAgent}</span>
                        </div>
                    </div>

                    {referral.propertyDetails && (
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-600">
                                <Home className="w-4 h-4 mr-2 text-gray-400" />
                                <span className="text-sm">{referral.propertyDetails.address}</span>
                            </div>
                            {referral.propertyDetails.price && (
                                <div className="flex items-center text-gray-600">
                                    <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                                    <span className="text-sm">
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        }).format(referral.propertyDetails.price)}
                                    </span>
                                </div>
                            )}
                            {referral.propertyDetails.propertyType && (
                                <div className="flex items-center text-gray-600">
                                    <Building className="w-4 h-4 mr-2 text-gray-400" />
                                    <span className="text-sm">{referral.propertyDetails.propertyType}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {referral.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">{referral.notes}</p>
                    </div>
                )}
            </div>
        </div>
    );
};