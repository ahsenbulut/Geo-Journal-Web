import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: '#fffaf0',
        padding: '0.8rem 1.5rem',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#2e2e2e' }}>
        Geo Journal
      </h1>

      <div style={{ display: 'flex', gap: '1.2rem' }}>
        {[
          { href: '/', label: 'Anılar' },
          { href: '/new', label: 'Yeni Anı' },
          { href: '/favorites', label: 'Favoriler' },
          { href: '/map', label: 'Harita' },
          { href: '/profile', label: 'Profil' },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              color: '#6c3483',           // pastel mor tonu
              fontWeight: 500,
              fontSize: '1.05rem',       // biraz büyüttük
              textDecoration: 'none',
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'all 0.2s ease-in-out',
            }}
            onMouseOver={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#f2e1ff';
              (e.target as HTMLElement).style.color = '#512e7e';
            }}
            onMouseOut={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'transparent';
              (e.target as HTMLElement).style.color = '#6c3483';
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
