import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ref, onValue, remove } from 'firebase/database';
import { db } from '@/lib/firebase';
import Link from 'next/link';

type Memory = {
  title: string;
  description: string;
  date: string;
  imageUri?: string;
  lat?: number;
  lng?: number;
};

export default function MemoryDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [memory, setMemory] = useState<Memory | null>(null);

  useEffect(() => {
    if (!id) return;

    const memoryRef = ref(db, `memories/${id}`);
    const unsubscribe = onValue(memoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMemory(data);
      } else {
        setMemory(null);
      }
    });

    return () => unsubscribe();
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Bu anıyı silmek istediğine emin misin?");
    if (confirm && id) {
      await remove(ref(db, `memories/${id}`));
      alert("Anı silindi!");
      router.push('/');
    }
  };

  if (!memory) {
    return (
      <div
        style={{
          backgroundColor: '#fffaf0',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.2rem',
        }}
      >
        Anı yükleniyor...
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#fffaf0',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
        }}
      >
        <Link
          href="/"
          style={{
            color: '#f4a261',
            textDecoration: 'none',
            fontWeight: '600',
            display: 'inline-block',
            marginBottom: '1rem',
          }}
        >
          ← Geri
        </Link>




        {memory.imageUri && (
          <img
            src={memory.imageUri}
            alt={memory.title}
            style={{
              width: '100%',
              maxHeight: '300px',
              objectFit: 'cover',
              borderRadius: '12px',
              marginBottom: '1rem',
            }}
          />
        )}

        <h1 style={{ color: '#333', marginTop: '0.5rem' }}>{memory.title}</h1>

        <p style={{ color: '#888', fontSize: '0.9rem' }}>{memory.date}</p>

        <p
          style={{
            marginTop: '1rem',
            fontSize: '1rem',
            lineHeight: 1.5,
            color: '#444',
          }}
        >
          {memory.description}
        </p>

        <button
          onClick={handleDelete}
          style={{
            marginTop: '2rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#ffb4b4',
            color: '#333',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          🗑️ Sil
        </button>
                <Link
  href={`/memory/${id}/edit`}
  style={{
    marginLeft: '1rem',
    backgroundColor: '#ffb4b4',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontWeight: 'bold',
    color: '#333',
    textDecoration: 'none',
  }}
>
  ✏️ Düzenle
</Link>
      </div>
    </div>
  );
}
