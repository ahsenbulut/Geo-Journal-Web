import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ref, onValue, update } from 'firebase/database';
import { db } from '@/lib/firebase';
import Link from 'next/link';

type Memory = {
  title: string;
  description: string;
  date: string;
  imageUri?: string;
};

export default function EditMemoryPage() {
  const router = useRouter();
  const { id } = router.query;

  const [memory, setMemory] = useState<Memory | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageData, setImageData] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!id) return;

    const memoryRef = ref(db, `memories/${id}`);
    const unsubscribe = onValue(memoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMemory(data);
        setTitle(data.title);
        setDescription(data.description);
        setImageData(data.imageUri || '');
      }
    });

    return () => unsubscribe();
  }, [id]);

  const handleSave = async () => {
    if (!title || !description) {
      alert('Tüm alanları doldurun.');
      return;
    }

    let updatedImage = imageData;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        updatedImage = reader.result?.toString() || '';

        await update(ref(db, `memories/${id}`), {
          title,
          description,
          imageUri: updatedImage,
        });

        alert('Anı güncellendi!');
        router.push(`/memory/${id}`);
      };

      reader.readAsDataURL(file);
    } else {
      await update(ref(db, `memories/${id}`), {
        title,
        description,
        imageUri: updatedImage,
      });

      alert('Anı güncellendi!');
      router.push(`/memory/${id}`);
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
          href={`/memory/${id}`}
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

        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          ✏️ Anıyı Düzenle
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
          placeholder="Açıklama..."
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
            📷 Fotoğrafı Değiştir
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
