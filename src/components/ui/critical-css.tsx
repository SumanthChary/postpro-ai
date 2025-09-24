import { useEffect } from 'react';

// Critical CSS that needs to load immediately
const criticalCSS = `
  /* Prevent layout shift and improve loading performance */
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    scroll-behavior: smooth;
  }

  /* Optimize font loading */
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-display: swap;
  }

  /* Prevent flash of unstyled content */
  #root {
    min-height: 100vh;
    contain: layout style paint;
  }

  /* Optimize image loading */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Loading states */
  .loading-skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Optimize scrolling */
  .scrollable {
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(0,0,0,0.2) transparent;
  }

  /* Critical button styles */
  .btn-primary {
    background: hsl(221.2 83.2% 53.3%);
    color: white;
    border: none;
    border-radius: 0.375rem;
    padding: 0.5rem 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .btn-primary:hover {
    background: hsl(221.2 83.2% 47%);
  }

  /* Prevent cumulative layout shift */
  .aspect-square { aspect-ratio: 1; }
  .aspect-video { aspect-ratio: 16 / 9; }
  .aspect-auto { aspect-ratio: auto; }

  /* Performance optimizations */
  .will-change-transform { will-change: transform; }
  .will-change-opacity { will-change: opacity; }
  .contain-layout { contain: layout; }
  .contain-paint { contain: paint; }
  .contain-style { contain: style; }
`;

const CriticalCSS = () => {
  useEffect(() => {
    // Only inject if not already present
    if (!document.querySelector('#critical-css')) {
      const style = document.createElement('style');
      style.id = 'critical-css';
      style.textContent = criticalCSS;
      document.head.insertBefore(style, document.head.firstChild);
    }
  }, []);

  return null;
};

export default CriticalCSS;