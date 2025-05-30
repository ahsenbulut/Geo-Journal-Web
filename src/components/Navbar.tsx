import Link from 'next/link';
import React from 'react';

export default function Navbar() {
return (
    <nav style={{
      backgroundColor: '#fffaf0',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: '700',
      fontSize: '1rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <div>Geo Journal</div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <Link href="/">Anılar</Link>
        <Link href="/new" style={{ color: '#f4a261' /* pastel turuncu */ }}>Yeni Anı</Link>
        <Link href="/map">Harita</Link>
        <Link href="/profile">Profil</Link>
      </div>
    </nav>
  );
}


const styles: Record<string, React.CSSProperties> = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#fffaf0',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontWeight: '700',
    fontSize: '1.5rem',
    color: '#333',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    gap: '1.8rem',
    margin: 0,
    padding: 0,
  },
  link: {
    color: '#333',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '1rem',
    transition: 'color 0.3s ease',
  },
};
