'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ref, get } from 'firebase/database';
import { db } from '@/lib/firebase';
import Link from 'next/link';

const defaultIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const favoriteIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Memory = {
  id: string;
  title: string;
  lat: number;
  lng: number;
  isFavorite?: boolean;
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
              isFavorite: value.isFavorite || false,
            }))
            .filter((m) => m.lat && m.lng)
        : [];

      setMemories(list);
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <Link
        href="/"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          padding: '0.5rem 1rem',
          textDecoration: 'none',
          fontWeight: 600,
          color: '#0a0a0a',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        }}
      >
        ← Geri
      </Link>

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
            icon={memory.isFavorite ? favoriteIcon : defaultIcon}
          >
            <Popup>{memory.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
