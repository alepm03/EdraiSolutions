import React, { Suspense, lazy } from 'react';

// Runtime de Spline (~1MB): lazy para que no entre en el bundle inicial.
const Spline = lazy(() => import('@splinetool/react-spline'));

// Robot 3D interactivo que sigue el cursor (escena pública de Spline).
const ROBOT_SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

const SplineRobot: React.FC<{ className?: string }> = ({ className }) => (
  <Suspense
    fallback={
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 animate-pulse flex items-center justify-center">
          <span className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
        </div>
      </div>
    }
  >
    <Spline scene={ROBOT_SCENE} className={className} />
  </Suspense>
);

export default SplineRobot;
