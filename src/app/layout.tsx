import './globals.css';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" style={{ margin: 0, padding: 0, backgroundColor: '#fffaf0' }}>
      <body style={{ backgroundColor: '#fffaf0', minHeight: '100vh', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
