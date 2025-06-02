import { useEffect, useState } from "react";
import { ref, get, update } from "firebase/database";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import MemoryCard from "@/components/MemoryCard";

type Memory = {
  id: string;
  title: string;
  description: string;
  imageUri?: string;
  date: string;
  isFavorite?: boolean;
};

export default function HomePage() {
  const [memories, setMemories] = useState<Memory[]>([]);

    const toggleFavorite = async (id: string, current: boolean) => {
    try {
      const memoryRef = ref(db, `memories/${id}`);
      await update(memoryRef, { isFavorite: !current });

      // Local olarak da güncelle
      setMemories(prev =>
        prev.map(mem =>
          mem.id === id ? { ...mem, isFavorite: !current } : mem
        )
      );
    } catch (err) {
      console.error("Favori güncellenemedi:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(db, "memories"));
        const data = snapshot.val();

        if (data) {
          const list: Memory[] = Object.entries(data).map(([id, value]: any) => ({
            id,
            ...value,
          }));
          setMemories(list);
        } else {
          setMemories([]);
        }
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
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
        {memories.map((memory) => (
          <MemoryCard
            key={memory.id}
            id={memory.id}
            title={memory.title}
            description={memory.description}
            imageUrl={memory.imageUri}
            date={memory.date}
            isFavorite={memory.isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </main>
    </div>
  );
}
