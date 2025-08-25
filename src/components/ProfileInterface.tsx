import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Phone, Mail, Smartphone, User } from "lucide-react";
import { ProfileData } from "../types/ProfileData";
import { initialPatrollers } from "../data/patrollers1";

const ProfileInterface: React.FC = () => {
  const { id } = useParams();
  const patroller = initialPatrollers.find((p) => String(p.id) === String(id));

  const [profileData] = useState<ProfileData>(
    patroller || initialPatrollers[0]
  );

  const InfoRow: React.FC<{
    label: string;
    value: string;
    isStatus?: boolean;
    isLink?: boolean;
  }> = ({ label, value, isStatus = false, isLink = false }) => (
    <div className="flex py-1">
      <div className="w-32 text-sm font-medium text-gray-700">{label}</div>
      <div
        className={`text-sm ${
          isStatus
            ? "text-green-600"
            : isLink
            ? "text-blue-600 underline cursor-pointer"
            : "text-gray-900"
        }`}
      >
        {value}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg">
      {/* Header */}
      <div className="bg-blue-50 px-6 py-3 border-b flex items-center">
        <User className="w-5 h-5 text-blue-600 mr-2" />
        <h1 className="text-lg font-semibold text-gray-800">
          Profile of {profileData.name}
        </h1>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <InfoRow label="Type" value={profileData.type} />
          <InfoRow label="Manager" value={profileData.manager} />
          <InfoRow label="Department" value={profileData.department} />
          <InfoRow label="Center" value={profileData.center} />
          <InfoRow label="Calendar Until" value={profileData.calendarUntil} />
          <InfoRow label="Last Sync" value={profileData.lastSync} />
          <InfoRow
            label="Current Status"
            value={profileData.currentStatus}
            isStatus={true}
          />
          <InfoRow
            label="Current Free Capacity"
            value={profileData.currentFreeCapacity}
          />
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <h3 className="text-blue-600 font-medium mb-3 underline">
            Contact Information
          </h3>
          <div className="flex items-center py-1">
            <Phone className="w-4 h-4 text-gray-500 mr-2" />
            <div className="w-28 text-sm font-medium text-gray-700">Phone</div>
            <div className="text-sm text-gray-900">{profileData.phone}</div>
          </div>
          <div className="flex items-center py-1">
            <Mail className="w-4 h-4 text-gray-500 mr-2" />
            <div className="w-28 text-sm font-medium text-gray-700">Email</div>
            <div className="text-sm text-blue-600 underline cursor-pointer">
              {profileData.email}
            </div>
          </div>
          <div className="flex items-center py-1">
            <Smartphone className="w-4 h-4 text-gray-500 mr-2" />
            <div className="w-28 text-sm font-medium text-gray-700">
              Mobile Phone
            </div>
            <div className="text-sm text-gray-900">{profileData.mobilePhone}</div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h3 className="text-blue-600 font-medium mb-3 underline">Skills</h3>
          <div className="text-sm text-gray-900 mb-2">
            {profileData.skills.join(", ")}
          </div>
          <button className="text-blue-600 underline text-sm hover:text-blue-800">
            Update Skills
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInterface;
