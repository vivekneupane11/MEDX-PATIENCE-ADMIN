import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export function InterventionMap() {
  const interventions = [
    {
      id: 1,
      patient: 'Jean Martin',
      address: '15 Rue du Commerce, Paris',
      time: '09:00',
      coordinates: [48.8566, 2.3522],
      status: 'upcoming'
    },
    {
      id: 2,
      patient: 'Marie Dubois',
      address: '8 Avenue des Lilas, Paris',
      time: '11:30',
      coordinates: [48.8606, 2.3376],
      status: 'current'
    }
  ];

  return (
    <MapContainer 
      center={[48.8566, 2.3522]} 
      zoom={12} 
      className="h-full w-full rounded-lg"
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {interventions.map((intervention) => (
        <Marker 
          key={intervention.id} 
          position={intervention.coordinates as [number, number]}
        >
          <Popup>
            <div className="p-2">
              <p className="font-medium">{intervention.patient}</p>
              <p className="text-sm text-gray-600">{intervention.address}</p>
              <p className="text-sm text-gray-600">{intervention.time}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}