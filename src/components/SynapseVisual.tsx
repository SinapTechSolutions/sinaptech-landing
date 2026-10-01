"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

/** Rotas percorridas pelos pulsos de sinal (menos ruído que uma por aresta). */
const ROUTES: number[][] = [
  [1, 2, 5, 9, 12, 15],
  [1, 3, 6, 10, 14, 15],
  [3, 8, 10, 13, 14],
];

/** Arestas com fluxo contínuo — selecionadas para equilibrar a composição. */
const FLOW_EDGES: SynapseEdge[] = [
  { from: 1, to: 2 },
  { from: 4, to: 7 },
  { from: 6, to: 10 },
  { from: 9, to: 12 },
  { from: 13, to: 14 },
];

/** Só os nós centrais emitem ondulações, para não poluir a leitura. */
const RIPPLE_NODES = [1, 7, 10, 15];

/* A paleta vem de CSS custom properties (ver globals.css) para que o servidor
   e o cliente renderizem exatamente o mesmo HTML — evitando o aviso de
   hydration mismatch — sem nenhum "piscar" de tema após a hidratação. */
const palette = {
  line: "var(--synapse-line)",
  lineOpacity: "var(--synapse-line-opacity)",
  gridOpacity: "var(--synapse-grid-opacity)",
  ringOpacity: "var(--synapse-ring-opacity)",
  particleA: "var(--synapse-particle-a)",
  particleB: "var(--synapse-particle-b)",
  haloInner: "var(--synapse-halo-inner)",
  haloOuter: "var(--synapse-halo-outer)",
  nodeFill: "var(--synapse-node)",
} as const;

const GRID_STROKE = 0.6;
const EDGE_STROKE = 1.3;
const FLOW_STROKE = 2;
const NODE_RADIUS = 4.5;
const NODE_RING_RADIUS = 9;
const PULSE_RADIUS = 3.2;

const SPAN = 640;
const DRAW_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function nodePosition(id: number): { x: number; y: number } {
  const node = NODES.find((n) => n.id === id);
  return node ?? { x: 0, y: 0 };
}

/** Onda de entrada: o traçado "acende" da esquerda/topo para a direita/base. */
function wave(value: number): number {
  return Math.min(Math.max(value / SPAN, 0), 1);
}

/**
 * Converte uma rota em keyframes de `cx`/`cy`/`opacity` com tempos
 * proporcionais ao comprimento de cada trecho — assim o pulso mantém
 * velocidade constante em vez de acelerar/desacelerar a cada nó.
 */
function routeFrames(route: number[]) {
  const points = route.map(nodePosition);
  const segments: number[] = [];
  for (let i = 1; i < points.length; i += 1) {
    segments.push(
      Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y)
    );
  }
  const total = segments.reduce((sum, length) => sum + length, 0) || 1;

  const FADE_IN = 0.1;
  const FADE_OUT = 0.1;
  const times = [0];
  const cx = [points[0].x];
  const cy = [points[0].y];
  const opacity = [0];

  times.push(FADE_IN);
  cx.push(points[0].x);
  cy.push(points[0].y);
  opacity.push(1);

  let travelled = 0;
  segments.forEach((length, index) => {
    travelled += length;
    times.push(FADE_IN + (travelled / total) * (1 - FADE_IN - FADE_OUT));
    cx.push(points[index + 1].x);
    cy.push(points[index + 1].y);
    opacity.push(1);
  });

  const last = points[points.length - 1];
  times.push(1);
  cx.push(last.x);
  cy.push(last.y);
  opacity.push(0);

  return { cx, cy, opacity, times };
}

function StaticSynapse() {
  return (
    <svg
      viewBox="0 0 400 340"
      className="h-auto w-full"
      role="img"
      aria-label="Rede neural da Sinaptech"
    >
      <g
        aria-hidden="true"
        style={{ opacity: palette.gridOpacity, stroke: palette.line }}
      >
        <path
          d="M0 85 H400 M0 255 H400 M100 0 V340 M300 0 V340"
          strokeWidth={GRID_STROKE}
        />
      </g>
      <g aria-hidden="true" style={{ stroke: palette.line }}>
        {EDGES.map((edge) => {
          const from = nodePosition(edge.from);
          const to = nodePosition(edge.to);
          return (
            <line
              key={`edge-${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              strokeWidth={EDGE_STROKE}
              strokeLinecap="round"
              style={{ strokeOpacity: palette.lineOpacity }}
            />
          );
        })}
      </g>
      <g aria-hidden="true">
        {NODES.map((node) => (
          <g key={`node-${node.id}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r={NODE_RING_RADIUS}
              fill="none"
              strokeWidth="0.7"
              style={{ stroke: palette.line, strokeOpacity: 0.35 }}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={NODE_RADIUS}
              fill={palette.nodeFill}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function SynapseVisual() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  // Lido no efeito (e não na renderização inicial) para que o HTML do servidor
  // e o primeiro render do cliente sejam idênticos — sem hydration mismatch.
  // Em telas de smartphone/tablet a sinapse fica estática: menos custo de
  // render e menos movimento para quem lê em movimento.
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactQuery = window.matchMedia("(max-width: 1023px)");
    const sync = () => {
      setReduceMotion(motionQuery.matches);
      setIsCompact(compactQuery.matches);
    };
    sync();
    motionQuery.addEventListener("change", sync);
    compactQuery.addEventListener("change", sync);
    return () => {
      motionQuery.removeEventListener("change", sync);
      compactQuery.removeEventListener("change", sync);
    };
  }, []);

  if (reduceMotion || isCompact) return <StaticSynapse />;

  return (
    <svg
      viewBox="0 0 400 340"
      className="h-auto w-full"
      role="img"
      aria-label="Rede neural da Sinaptech com sinais trafegando entre os nós"
    >
      <defs>
        <linearGradient id="synapse-particle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: palette.particleA }} />
          <stop offset="100%" style={{ stopColor: palette.particleB }} />
        </linearGradient>
        <filter id="node-glow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="network-halo" cx="50%" cy="50%" r="70%">
          <stop
            offset="0%"
            style={{ stopColor: palette.line, stopOpacity: palette.haloInner }}
          />
          <stop
            offset="55%"
            style={{ stopColor: palette.line, stopOpacity: palette.haloOuter }}
          />
          <stop offset="100%" style={{ stopColor: palette.line, stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      <motion.circle
        cx="200"
        cy="170"
        r="180"
        fill="url(#network-halo)"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />

      <motion.g
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
        style={{ stroke: palette.line }}
      >
        <g style={{ opacity: palette.gridOpacity }}>
          <path
            d="M0 85 H400 M0 255 H400 M100 0 V340 M300 0 V340"
            strokeWidth={GRID_STROKE}
          />
        </g>
      </motion.g>

      <motion.g
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: "easeOut" }}
        style={{ stroke: palette.line }}
      >
        <g style={{ opacity: palette.ringOpacity }}>
          <motion.circle
            cx="200"
            cy="170"
            r="150"
            fill="none"
            strokeWidth="0.8"
            strokeDasharray="2 12"
            animate={{ rotate: 360 }}
            transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="200"
            cy="170"
            r="178"
            fill="none"
            strokeWidth="0.6"
            strokeDasharray="16 34"
            animate={{ rotate: -360 }}
            transition={{ duration: 190, repeat: Infinity, ease: "linear" }}
          />
        </g>
      </motion.g>

      <g aria-hidden="true">
        {EDGES.map((edge) => {
          const from = nodePosition(edge.from);
          const to = nodePosition(edge.to);
          const delay =
            0.15 + wave((from.x + from.y + to.x + to.y) / 4) * 0.75;
          return (
            <motion.line
              key={`edge-${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              strokeWidth={EDGE_STROKE}
              strokeLinecap="round"
              style={{
                stroke: palette.line,
                strokeOpacity: palette.lineOpacity,
              }}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay, ease: DRAW_EASE }}
            />
          );
        })}
      </g>

      <g aria-hidden="true">
        {NODES.map((node) => {
          const delay = 0.45 + wave(node.x + node.y) * 0.9;
          const rippleIndex = RIPPLE_NODES.indexOf(node.id);
          return (
            <motion.g
              key={`node-${node.id}`}
              initial={{ opacity: 0, scale: 0.55 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay, ease: DRAW_EASE }}
            >
              {rippleIndex === -1 ? (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={NODE_RING_RADIUS}
                  fill="none"
                  strokeWidth="0.7"
                  style={{ stroke: palette.line, strokeOpacity: 0.35 }}
                />
              ) : (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={NODE_RING_RADIUS}
                  fill="none"
                  strokeWidth="0.8"
                  style={{ stroke: palette.line }}
                  animate={{ r: [NODE_RING_RADIUS, 22], opacity: [0.5, 0] }}
                  transition={{
                    duration: 3.4,
                    delay: 2 + rippleIndex * 0.85,
                    repeat: Infinity,
                    repeatDelay: 3.6,
                    ease: "easeOut",
                  }}
                />
              )}

              <circle
                cx={node.x}
                cy={node.y}
                r={NODE_RADIUS}
                fill={palette.nodeFill}
                filter="url(#node-glow)"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={1.5}
                fill="#ffffff"
                fillOpacity="0.85"
              />
            </motion.g>
          );
        })}
      </g>

      <motion.g
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
      >
        {FLOW_EDGES.map((edge, index) => {
          const from = nodePosition(edge.from);
          const to = nodePosition(edge.to);
          return (
            <motion.line
              key={`flow-${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="url(#synapse-particle)"
              strokeWidth={FLOW_STROKE}
              strokeLinecap="round"
              strokeDasharray="7 45"
              animate={{
                opacity: [0.05, 0.6, 0.6, 0.05],
                strokeDashoffset: [0, -104],
              }}
              transition={{
                duration: 9,
                delay: index * 0.7,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "linear",
                times: [0, 0.25, 0.75, 1],
              }}
            />
          );
        })}
      </motion.g>

      <motion.g
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
      >
        {ROUTES.map((route, index) => {
          const frames = routeFrames(route);
          return (
            <motion.circle
              key={`pulse-${index}`}
              r={PULSE_RADIUS}
              fill="url(#synapse-particle)"
              filter="url(#node-glow)"
              initial={{
                cx: frames.cx[0],
                cy: frames.cy[0],
                opacity: 0,
              }}
              animate={{
                cx: frames.cx,
                cy: frames.cy,
                opacity: frames.opacity,
              }}
              transition={{
                duration: 7.5,
                times: frames.times,
                delay: index * 1.9,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </motion.g>
    </svg>
  );
}
