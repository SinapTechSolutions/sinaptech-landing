"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface SynapseNode {
  id: number;
  x: number;
  y: number;
}

interface SynapseEdge {
  from: number;
  to: number;
}

const NODES: SynapseNode[] = [
  { id: 1, x: 60, y: 40 },
  { id: 2, x: 150, y: 30 },
  { id: 3, x: 95, y: 105 },
  { id: 4, x: 220, y: 65 },
  { id: 5, x: 300, y: 40 },
  { id: 6, x: 165, y: 140 },
  { id: 7, x: 260, y: 135 },
  { id: 8, x: 55, y: 175 },
  { id: 9, x: 320, y: 120 },
  { id: 10, x: 130, y: 220 },
  { id: 11, x: 240, y: 210 },
  { id: 12, x: 340, y: 195 },
  { id: 13, x: 70, y: 280 },
  { id: 14, x: 200, y: 300 },
  { id: 15, x: 320, y: 285 },
];

const EDGES: SynapseEdge[] = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 3, to: 6 },
  { from: 3, to: 8 },
  { from: 4, to: 6 },
  { from: 4, to: 7 },
  { from: 5, to: 7 },
  { from: 5, to: 9 },
  { from: 6, to: 7 },
  { from: 6, to: 10 },
  { from: 7, to: 9 },
  { from: 7, to: 11 },
  { from: 8, to: 10 },
  { from: 9, to: 12 },
  { from: 10, to: 11 },
  { from: 10, to: 13 },
  { from: 11, to: 12 },
  { from: 11, to: 14 },
  { from: 12, to: 15 },
  { from: 13, to: 14 },
  { from: 14, to: 15 },
];

const PULSE_ROUTES: number[][] = [
  [1, 2, 5, 9, 12, 15],
  [1, 3, 6, 10, 14, 15],
  [3, 8, 10, 13, 14],
  [2, 4, 7, 11, 12],
  [5, 9, 11, 14],
];

function nodePosition(id: number): { x: number; y: number } {
  const node = NODES.find((n) => n.id === id);
  return node ?? { x: 0, y: 0 };
}

export default function SynapseVisual() {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const edgeOpacity = isDark ? 0.28 : 0.45;
  const gridOpacity = isDark ? 0.3 : 0.2;
  const ringOpacity = isDark ? 0.35 : 0.25;
  const nodeFill = isDark ? "var(--color-forest-trust)" : "#047857";
  const nodeStroke = isDark ? "var(--color-synaptic-mint)" : "#059669";
  const haloOpacity1 = isDark ? 0.14 : 0.18;
  const haloOpacity2 = isDark ? 0.05 : 0.08;
  return (
    <svg
      viewBox="0 0 400 340"
      className="h-auto w-full"
      role="img"
      aria-label="Rede neural da Sinaptech com nós pulsando e dados trafegando em alta velocidade"
    >
      <defs>
        <linearGradient id="synapse-edge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#34D399" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="synapse-particle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <filter id="node-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="network-halo" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#10B981" stopOpacity={haloOpacity1} />
          <stop offset="55%" stopColor="#10B981" stopOpacity={haloOpacity2} />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle
        cx="200"
        cy="170"
        r="180"
        fill="url(#network-halo)"
        aria-hidden="true"
      />

      <g
        opacity={gridOpacity}
        stroke="var(--color-synaptic-mint)"
        strokeWidth="0.5"
        aria-hidden="true"
      >
        <path d="M0 85 H400 M0 255 H400 M100 0 V340 M300 0 V340" />
      </g>

      <g opacity={ringOpacity} stroke="var(--color-synaptic-mint)" aria-hidden="true">
        <motion.circle
          cx="200"
          cy="170"
          r="150"
          fill="none"
          strokeWidth="0.8"
          strokeDasharray="2 10"
          animate={{ rotate: 360 }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "200px 170px" }}
        />
        <motion.circle
          cx="200"
          cy="170"
          r="178"
          fill="none"
          strokeWidth="0.6"
          strokeDasharray="14 26"
          animate={{ rotate: -360 }}
          transition={{
            duration: 110,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "200px 170px" }}
        />
      </g>

      <g aria-hidden="true">
        {EDGES.map((edge, i) => {
          const from = nodePosition(edge.from);
          const to = nodePosition(edge.to);
          return (
            <motion.line
              key={`edge-${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="var(--color-synaptic-mint)"
              strokeOpacity={edgeOpacity}
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: i * 0.035, ease: "easeOut" }}
            />
          );
        })}
      </g>

      <g aria-hidden="true">
        {EDGES.map((edge, i) => {
          const from = nodePosition(edge.from);
          const to = nodePosition(edge.to);
          if (i % 2 !== 0) return null;
          return (
            <motion.line
              key={`flow-${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="url(#synapse-particle)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray="3 18"
              animate={{ opacity: [0.1, 0.75, 0.75, 0.1], strokeDashoffset: [0, -84] }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}
      </g>

      <g aria-hidden="true">
        {NODES.map((node, i) => {
          const origin = `${node.x}px ${node.y}px`;
          const stagger = (i % 7) * 0.16;
          return (
            <motion.g key={`node-${node.id}`}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="10"
                fill="none"
                stroke={nodeStroke}
                strokeWidth="0.8"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [0.6, 1.45, 0.6], opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 3.6,
                  delay: stagger,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: origin }}
              />
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="4"
                fill={nodeFill}
                stroke={nodeStroke}
                strokeWidth="1.5"
                filter="url(#node-glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [1, 1.18, 1], opacity: 1 }}
                transition={{
                  duration: 3.6,
                  delay: 0.2 + stagger,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: origin }}
              />
            </motion.g>
          );
        })}
      </g>

      <g aria-hidden="true">
        {PULSE_ROUTES.map((route, i) => {
          const segments = route.slice(0, -1).map((id, j) => ({
            from: nodePosition(id),
            to: nodePosition(route[j + 1]),
          }));
          return segments.map((segment, j) => (
            <motion.circle
              key={`pulse-${i}-${j}`}
              r="3"
              fill="url(#synapse-particle)"
              filter="url(#node-glow)"
              initial={{ cx: segment.from.x, cy: segment.from.y, opacity: 0 }}
              animate={{
                cx: [segment.from.x, segment.to.x],
                cy: [segment.from.y, segment.to.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.8,
                times: [0, 0.08, 0.92, 1],
                delay: j * 0.14 + (i % PULSE_ROUTES.length) * 0.3,
                repeat: Infinity,
                repeatDelay: 1.4,
                ease: "easeOut",
              }}
            />
          ));
        })}
      </g>
    </svg>
  );
}