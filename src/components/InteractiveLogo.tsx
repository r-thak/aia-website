import React from 'react';
import { throttle } from 'react-bits/lib/util/throttle';

type Props = {
  src: string;
  alt: string;
};

export default function InteractiveLogo({ src, alt }: Props) {
  const SPIN_SENSITIVITY = 0.9;
  const MAX_ROTATION = 75;

  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStateRef = React.useRef({
    pointerId: -1,
    startX: 0,
    startY: 0,
    originRotX: 0,
    originRotY: 0,
  });

  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

  const throttledMove = React.useMemo(
    () =>
      throttle((nextRotX: number, nextRotY: number) => {
        setRotation({
          x: clamp(nextRotX, -MAX_ROTATION, MAX_ROTATION),
          y: clamp(nextRotY, -MAX_ROTATION, MAX_ROTATION),
        });
      }, 16),
    []
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.classList.add('logo-spin-active');
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originRotX: rotation.x,
      originRotY: rotation.y,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || event.pointerId !== dragStateRef.current.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragStateRef.current.startX;
    const deltaY = event.clientY - dragStateRef.current.startY;
    throttledMove(
      dragStateRef.current.originRotX - deltaY * SPIN_SENSITIVITY,
      dragStateRef.current.originRotY + deltaX * SPIN_SENSITIVITY
    );
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerId !== dragStateRef.current.pointerId) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    event.currentTarget.classList.remove('logo-spin-active');
    setIsDragging(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className={`logo-spin-wrapper logo-draggable relative ${isDragging ? 'logo-dragging' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <img
        src={src}
        alt={alt}
        className="logo-spin h-15 w-15 object-contain transition-transform duration-500 ease-out"
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
        draggable={false}
      />
      <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 bg-[#FF5F05]/20 blur-xl logo-glow"></div>
    </div>
  );
}
