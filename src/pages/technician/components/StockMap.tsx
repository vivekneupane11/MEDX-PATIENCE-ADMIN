import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function StockMap() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Configuration de l'icône par défaut
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    // Position actuelle (Paris)
    const currentPosition: [number, number] = [48.8566, 2.3522];

    // Création de la carte
    const map = L.map(mapContainerRef.current).setView(currentPosition, 13);
    mapRef.current = map;

    // Ajout du fond de carte
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Ajout de la zone de couverture
    L.circle(currentPosition, {
      radius: 2000,
      color: '#8B5CF6',
      fillColor: '#8B5CF6',
      fillOpacity: 0.1
    }).addTo(map);

    // Ajout du marqueur de position actuelle
    L.marker(currentPosition)
      .bindPopup(`
        <div class="p-2">
          <p class="font-medium">Ma position</p>
          <p class="text-sm text-gray-600">Véhicule de service</p>
        </div>
      `)
      .addTo(map);

    // Ajout des autres techniciens
    const technicianPositions = [
      {
        id: 1,
        name: 'Pierre Martin',
        position: [48.8606, 2.3376],
        stock: ['2 CPAP', '5 masques'],
        distance: '1.5 km'
      },
      {
        id: 2,
        name: 'Marie Lambert',
        position: [48.8496, 2.3482],
        stock: ['1 BiPAP', '3 filtres'],
        distance: '2.1 km'
      }
    ];

    technicianPositions.forEach((tech) => {
      L.marker(tech.position as [number, number])
        .bindPopup(`
          <div class="p-2">
            <p class="font-medium">${tech.name}</p>
            <p class="text-sm text-gray-600">Distance: ${tech.distance}</p>
            <div class="mt-2">
              <p class="text-sm font-medium">Stock disponible:</p>
              <ul class="text-sm text-gray-600">
                ${tech.stock.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
        `)
        .addTo(map);
    });

    // Nettoyage
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={mapContainerRef} className="h-full w-full" />;
}