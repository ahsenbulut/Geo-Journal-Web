import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';

type Memory = {
  isFavorite?: boolean;
};

export default function ProfilePage() {
  const router = useRouter();
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const memoryRef = ref(db, 'memories/');
    const unsubscribe = onValue(memoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.values(data) as Memory[];
        setMemories(list);
      } else {
        setMemories([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const total = memories.length;
  const favorites = memories.filter((m) => m.isFavorite).length;

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
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
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

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#eee',
              display: 'inline-block',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                fontSize: '2rem',
                lineHeight: '80px',
                display: 'block',
              }}
            >
              👤
            </span>
          </div>

          <h2 style={{ marginBottom: '0.5rem', fontSize: '1.3rem', fontWeight: 'bold' }}>
            Geo Kullanıcısı
          </h2>
          <p style={{ color: '#888', marginBottom: '2rem' }}>example@mail.com</p>

          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '2rem' }}>
            <div
              style={{
                backgroundColor: '#b6e9cc',
                borderRadius: '12px',
                padding: '1rem 1.5rem',
                textAlign: 'center',
              }}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{total}</h3>
              <p style={{ fontSize: '0.9rem' }}>Anı</p>
            </div>

            <div
              style={{
                backgroundColor: '#d9c9f2',
                borderRadius: '12px',
                padding: '1rem 1.5rem',
                textAlign: 'center',
              }}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{favorites}</h3>
              <p style={{ fontSize: '0.9rem' }}>Favori</p>
            </div>
          </div>

          <div style={{ textAlign: 'left' }}>
            <p style={{ marginBottom: '0.5rem' }}>🎨 Tema</p>
            <p style={{ marginBottom: '0.5rem' }}>🌐 Dil</p>
            <button
              onClick={() => alert('Çıkış yapılmadı çünkü auth yok :)')}
              style={{
                marginTop: '1rem',
                backgroundColor: '#ffb4b4',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              🚪 Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
