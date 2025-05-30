'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ref, get } from 'firebase/database';
import { db } from '@/lib/firebase';

// 📌 Varsayılan marker ikon ayarı
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Memory = {
  id: string;
  title: string;
  lat: number;
  lng: number;
};

export default function MapClient() {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await get(ref(db, 'memories/'));
      const data = snapshot.val();

      const list: Memory[] = data
        ? Object.entries(data)
            .map(([id, value]: any) => ({
              id,
              title: value.title || 'Başlıksız',
              lat: value.lat,
              lng: value.lng,
            }))
            .filter((m) => m.lat && m.lng)
        : [];

      setMemories(list);
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={[39.925533, 32.866287]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {memories.map((memory) => (
          <Marker
            key={memory.id}
            position={[memory.lat, memory.lng]}
            icon={defaultIcon}
          >
            <Popup>{memory.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
