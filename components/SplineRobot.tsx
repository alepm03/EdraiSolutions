import React, { Suspense, lazy, useRef, useState } from 'react';
import type { Application } from '@splinetool/runtime';

// Runtime de Spline (~1MB): lazy para que no entre en el bundle inicial.
const Spline = lazy(() => import('@splinetool/react-spline'));

// Robot 3D interactivo que sigue el cursor (escena pública de Spline).
const ROBOT_SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

// Zoom calibrado empíricamente: con el canvas a 567x740 px el robot llena el
// alto con los pies en el borde inferior (alineado con el fin de la hero).
// Se escala en proporción al tamaño real del canvas para otros viewports.
const ZOOM_PER_HEIGHT = 0.43 / 740;
const ZOOM_PER_WIDTH = 0.43 / 567;

const SplineRobot: React.FC<{ className?: string }> = ({ className }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  const handleLoad = (app: Application) => {
    const el = wrapperRef.current;
    if (el) {
      const zoom = Math.min(el.clientHeight * ZOOM_PER_HEIGHT, el.clientWidth * ZOOM_PER_WIDTH);
      app.setZoom(Math.max(0.25, Math.min(zoom, 0.55)));
    }
    if (import.meta.env.DEV) {
      (window as unknown as { __splineApp?: Application }).__splineApp = app;
    }
    // El canvas entra con fade una vez encuadrado, para que no se vea el
    // zoom inicial de la escena (que delata el recorte rectangular).
    setLoaded(true);
  };

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}
    >
      <Suspense fallback={null}>
        <Spline scene={ROBOT_SCENE} className="w-full h-full" onLoad={handleLoad} />
      </Suspense>
    </div>
  );
};

export default SplineRobot;
