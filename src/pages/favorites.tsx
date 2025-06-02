import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import MemoryCard from '@/components/MemoryCard';
import Link from "next/link";

type Memory = {
  id: string;
  title: string;
  description: string;
  imageUri?: string;
  date: string;
  isFavorite?: boolean;
};

export default function FavoritesPage() {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await get(ref(db, 'memories/'));
      const data = snapshot.val();

      const list: Memory[] = data
        ? Object.entries(data)
            .map(([id, value]: any) => ({
              id,
              ...value,
            }))
            .filter((memory) => memory.isFavorite)
        : [];

      setMemories(list);
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#fffaf0',
        minHeight: '100vh',
        padding: '2rem 1rem',
      }}
    >
      <Navbar />

    <Link
  href="/"
  style={{
    backgroundColor: '#f0f0f0',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'inline-block',
    color: '#0a0a0a',
    textDecoration: 'none',
    fontWeight: '600',
    margin: '1rem 0 0 1rem',
  }}
>
  ← Geri
</Link>


      <main
        style={{
          maxWidth: '1200px',
          margin: '2rem auto 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          boxSizing: 'border-box',
        }}
      >
        {memories.length === 0 ? (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#555' }}>
            Henüz favori anınız yok.
          </p>
        ) : (
          memories.map((memory) => (
            <MemoryCard
              key={memory.id}
              id={memory.id}
              title={memory.title}
              description={memory.description}
              imageUrl={memory.imageUri}
              date={memory.date}
              isFavorite={memory.isFavorite}
            />
          ))
        )}
      </main>
    </div>
  );
}
