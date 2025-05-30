import { useState } from 'react';
import { useRouter } from 'next/router';
import { ref, push } from 'firebase/database';
import { db } from '@/lib/firebase';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SearchControl from '@/components/SearchControl';
import Navbar from '@/components/Navbar';

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationPicker({ onSelect }: { onSelect: (coords: { lat: number; lng: number }) => void }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });
  return null;
}

export default function NewMemoryPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<string>('');

  const handleSave = async () => {
    if (!title || !description || !selectedCoords) {
      alert('Lütfen tüm alanları doldurun ve konum seçin!');
      return;
    }

    await push(ref(db, 'memories/'), {
      title,
      description,
      lat: selectedCoords.lat,
      lng: selectedCoords.lng,
      imageUri: imageData,
      date: new Date().toISOString().split('T')[0],
    });

    alert('Anı başarıyla eklendi!');
    setTitle('');
    setDescription('');
    setSelectedCoords(null);
    setFile(null);
    setImageData('');
    router.push('/');
  };

  return (
    <div
      style={{
        backgroundColor: '#fffaf0',
        minHeight: '100vh',
        padding: '2rem 1rem',
      }}
    >
      <Navbar />
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '2rem',
        }}
      >
        <button
          onClick={() => router.push('/')}
          style={{
            backgroundColor: '#f0f0f0',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginBottom: '1rem',
          }}
        >
          ← Geri
        </button>

        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          ✨ Yeni Anı Ekle
        </h1>

        <input
          type="text"
          placeholder="Anı başlığı..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
          }}
        />

        <textarea
          placeholder="Bugün neler yaşadın? 🌿"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            minHeight: '100px',
          }}
        />

        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="file-upload"
            style={{
              display: 'inline-block',
              backgroundColor: '#d9c9f2',
              color: '#333',
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            📷 Fotoğraf Seç
          </label>
          <span style={{ marginLeft: '0.5rem' }}>{file?.name || 'Dosya seçilmedi'}</span>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              const selected = e.target.files?.[0];
              setFile(selected || null);

              if (selected) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64 = reader.result?.toString() || '';
                  setImageData(base64);
                };
                reader.readAsDataURL(selected);
              }
            }}
          />
        </div>

        {imageData && (
          <img
            src={imageData}
            alt="Önizleme"
            style={{
              width: '100%',
              maxHeight: '200px',
              objectFit: 'cover',
              marginBottom: '1rem',
              borderRadius: '10px',
            }}
          />
        )}

        <div style={{ height: '300px', marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden' }}>
          <MapContainer
            center={[39.925533, 32.866287]}
            zoom={6}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <SearchControl onSelect={(coords) => setSelectedCoords(coords)} />
            <LocationPicker onSelect={(coords) => setSelectedCoords(coords)} />
            {selectedCoords && <Marker position={selectedCoords} icon={defaultIcon} />}
          </MapContainer>
        </div>

        <button
          onClick={handleSave}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#b6e9cc',
            color: '#222',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          💾 Kaydet
        </button>
      </div>
    </div>
  );
}
