import React from "react";
import Link from "next/link";

type Props = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  date: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string, current: boolean) => void;
};

const MemoryCard: React.FC<Props> = ({
  id,
  title,
  description,
  imageUrl,
  date,
  isFavorite,
  onToggleFavorite,
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // link'e tıklamayı engelle
    onToggleFavorite?.(id, isFavorite ?? false); // props'tan gelen fonksiyonu çalıştır
  };

  return (
    <Link
      href={`/memory/${id}`}
      style={{
        backgroundColor: '#fff',
        borderRadius: '14px',
        boxShadow: '0 3px 8px rgba(0,0,0,0.04)',
        padding: '1rem',
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, boxShadow 0.3s ease',
        minHeight: '300px',
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: '100%',
            height: '150px',
            borderRadius: '10px',
            objectFit: 'cover',
            marginBottom: '0.75rem',
          }}
        />
      )}

      <h2 style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.2rem' }}>
        📍 {title}
      </h2>

      <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem' }}>{date}</p>

      <p
        style={{
          fontSize: '0.9rem',
          flexGrow: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {description}
      </p>

      {/* ⭐ Favori butonu */}
      <button
        onClick={handleFavoriteClick}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          backgroundColor: '#fff',
          border: 'none',
          borderRadius: '50%',
          padding: '0.4rem',
          cursor: 'pointer',
        }}
        title="Favorilere ekle/kaldır"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isFavorite ? '#f4b400' : 'none'}
          stroke={isFavorite ? '#f4b400' : '#ccc'}
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 17.27L18.18 21 16.54 13.97 22 9.24
              14.81 8.63 12 2 9.19 8.63 2 9.24
              7.45 13.97 5.82 21z"
          />
        </svg>
      </button>
    </Link>
  );
};

export default MemoryCard;
