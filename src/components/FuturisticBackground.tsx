
import React from "react";

// This component renders an animated SVG network as a subtle, fixed background
const NODE_COUNT = 18;
const WIDTH = 1800;
const HEIGHT = 900;

function getRandom(start: number, end: number) {
  return Math.random() * (end - start) + start;
}

const nodes = Array.from({ length: NODE_COUNT }).map((_, i) => ({
  id: i,
  x: getRandom(200, WIDTH-200),
  y: getRandom(100, HEIGHT-100),
}));

const edges = [];
for (let i = 0; i < NODE_COUNT; i++) {
  for (let j = i + 1; j < NODE_COUNT; j++) {
    // random connections for a network-effect
    if (Math.random() > 0.82) {
      edges.push({ from: i, to: j });
    }
  }
}

const FuturisticBackground: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 z-0">
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full h-full"
      style={{
        opacity: 0.23,
        filter: "blur(1px)",
        mixBlendMode: "lighten",
      }}
      width="100%"
      height="100%"
    >
      {/* Edges */}
      {edges.map((edge, i) => {
        const from = nodes[edge.from];
        const to = nodes[edge.to];
        return (
          <line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            opacity="0.55"
          />
        );
      })}
      {/* Nodes */}
      {nodes.map((node, i) => (
        <circle
          key={i}
          cx={node.x}
          cy={node.y}
          r={getRandom(7, 16)}
          fill="url(#nodeGradient)"
        />
      ))}
      <defs>
        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#41b6ff"/>
          <stop offset="100%" stopColor="#0d1f47"/>
        </linearGradient>
        <radialGradient id="nodeGradient">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="60%" stopColor="#3ccfff"/>
          <stop offset="100%" stopColor="#101b3a"/>
        </radialGradient>
      </defs>
    </svg>
  </div>
);

export default FuturisticBackground;
