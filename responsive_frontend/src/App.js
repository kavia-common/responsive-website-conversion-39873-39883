import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useParams } from 'react-router-dom';
import './App.css';

/**
 * Lightweight iframe wrapper for rendering an asset HTML file alongside its CSS/JS.
 * We do NOT move or rename any assets. We simply point the iframe to the HTML file under /assets/.
 */
// PUBLIC_INTERFACE
function AssetScreen() {
  /** Render an iframe pointing to the requested screen's HTML file in /assets. */
  const { slug } = useParams();
  // Basic allow-list mapping for friendly paths to exact asset html names
  const map = useMemo(
    () => ({
      cover: 'cover-900-737.html',
      introduction: 'introduction-1-20.html',
      overview: 'overview-3-3111.html',
      overviewMobile: 'overview-mobile-14-1.html',
      colors: 'colors-2-220.html',
      typography: 'typography-2-135.html',
      fonts: 'fonts-35-738.html',
      heroicons: 'heroicons-4-2561.html',
      buttons: 'buttons-11-32.html',
      badges: 'badges-11-31.html',
      spacers: 'spacers-2-596.html',
      sidebarsTopbars: 'sidebars-topbars-3-65.html',
      footers: 'footers-11-33.html',
      support: 'support-1-74.html',
      license: 'license-1-78.html',
      howToUse: 'how-to-use-1-70.html',
      notFound: '404-3-4143.html',
      notFoundMobile: '404mobile-15-803.html',
      tablet: 'tablet-18-778.html',
      mobile: 'mobile-18-808.html',
      illustrations: 'illustrations-903-0.html',
    }),
    []
  );

  const htmlFile = map[slug];

  if (!htmlFile) {
    return <Navigate to="/screens" replace />;
  }

  const src = `/assets/${htmlFile}`;

  return (
    <div className="App" style={{ minHeight: '100vh' }}>
      <header className="App-header" style={{ minHeight: 'auto', padding: '12px 16px' }}>
        <nav aria-label="Breadcrumbs" style={{ width: '100%', maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link className="App-link" to="/screens">← Back to Screens Index</Link>
          <span style={{ color: 'var(--text-primary)', opacity: 0.6 }}>/</span>
          <span style={{ color: 'var(--text-primary)' }}>{slug}</span>
        </nav>
      </header>
      <main style={{ width: '100%', maxWidth: 1600, margin: '0 auto', padding: '8px 0 24px' }}>
        <div style={{ border: '1px solid var(--border-color)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-secondary)' }}>
          <iframe
            title={`asset-${slug}`}
            src={src}
            style={{ width: '100%', height: '85vh', border: '0', background: '#fff' }}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </main>
    </div>
  );
}

/**
 * Index of all screens with human-friendly names mapped to routes.
 */
// PUBLIC_INTERFACE
function ScreensIndex() {
  const screens = [
    { label: 'Cover', to: '/screens/cover' },
    { label: 'Introduction', to: '/screens/introduction' },
    { label: 'Overview (Desktop)', to: '/screens/overview' },
    { label: 'Overview (Mobile)', to: '/screens/overviewMobile' },
    { label: 'Colors', to: '/screens/colors' },
    { label: 'Typography', to: '/screens/typography' },
    { label: 'Fonts', to: '/screens/fonts' },
    { label: 'Heroicons', to: '/screens/heroicons' },
    { label: 'Buttons', to: '/screens/buttons' },
    { label: 'Badges', to: '/screens/badges' },
    { label: 'Spacers', to: '/screens/spacers' },
    { label: 'Sidebars & Topbars', to: '/screens/sidebarsTopbars' },
    { label: 'Footers', to: '/screens/footers' },
    { label: 'Support', to: '/screens/support' },
    { label: 'License', to: '/screens/license' },
    { label: 'How to use', to: '/screens/howToUse' },
    { label: '404', to: '/screens/notFound' },
    { label: '404 (Mobile)', to: '/screens/notFoundMobile' },
    { label: 'Tablet', to: '/screens/tablet' },
    { label: 'Mobile', to: '/screens/mobile' },
    { label: 'Illustrations', to: '/screens/illustrations' },
  ];

  return (
    <div className="App">
      <header className="App-header" style={{ paddingTop: 48, paddingBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Assets Screens Index</h1>
        <p className="App-link" style={{ marginTop: 8 }}>
          These routes render the exact asset HTML/CSS/JS via iframe from /assets, preserving all paths (including /assets/figmaimages).
        </p>
      </header>

      <main style={{ width: '100%', maxWidth: 900, margin: '0 auto', padding: '0 16px 48px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {screens.map((s) => (
            <li key={s.to} style={{ border: '1px solid var(--border-color)', borderRadius: 10, padding: '12px 14px', background: 'var(--bg-secondary)' }}>
              <Link className="App-link" to={s.to} style={{ textDecoration: 'none' }}>
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

/**
 * Root app: theme toggle + routes.
 */
// PUBLIC_INTERFACE
function App() {
  /** App root with client-side routing for screens index and embedded asset screens. */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return (
    <BrowserRouter>
      <div className="App">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <Routes>
          <Route path="/" element={<Navigate to="/screens" replace />} />
          <Route path="/screens" element={<ScreensIndex />} />
          <Route path="/screens/:slug" element={<AssetScreen />} />
          <Route path="*" element={<Navigate to="/screens" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
