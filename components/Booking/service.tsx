import React, { useState } from "react";

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
}

interface ServicesMenuProps {
  serviceData: Service[];
  onSelectionChange: (selectedServices: Service[]) => void;
}

const ServicesMenu: React.FC<ServicesMenuProps> = ({
  serviceData,
  onSelectionChange,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleServiceSelection = (serviceId: string) => {
    let updatedSelectedIds = [];
    if (selectedIds.includes(serviceId)) {
      updatedSelectedIds = selectedIds.filter((id) => id !== serviceId);
    } else {
      updatedSelectedIds = [...selectedIds, serviceId];
    }
    setSelectedIds(updatedSelectedIds);
    onSelectionChange(
      serviceData.filter((service) => updatedSelectedIds.includes(service.id))
    );
  };

  const Rupiah = (price: string) => {
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) return price;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(parsedPrice);
  };

  return (
    <div className="">
      {serviceData.map((service) => (
        <div key={service.id} className="p-2 rounded mb-2 bg-gray-800 text-custom-green">
          <label className="block p-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedIds.includes(service.id)}
              onChange={() => handleServiceSelection(service.id)}
              className="mr-2"
            />
            {service.name} - {Rupiah(service.price)}
            {service.duration && ` (${service.duration} minutes)`}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ServicesMenu;
