import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  return (
    <div className="h-[400px] rounded-lg overflow-hidden">
      <MapContainer 
        center={[48.8566, 2.3522]} 
        zoom={12} 
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[48.8566, 2.3522]}>
          <Popup>
            Intervention en cours
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;