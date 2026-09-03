import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "transparent",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
        >
          <defs>
            <linearGradient
              id="topGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#2bb189" />
              <stop offset="100%" stopColor="#3ddc97" />
            </linearGradient>
            <linearGradient
              id="bottomGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#0a2a22" />
              <stop offset="100%" stopColor="#125142" />
            </linearGradient>
          </defs>
          <g
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          >
            <polyline
              points="24,35 50,20 76,35"
              stroke="url(#topGradient)"
              stroke-width="4.5"
            />
            <polyline
              points="24,65 50,80 76,65 50,50"
              stroke="url(#bottomGradient)"
              stroke-width="4.5"
            />
          </g>
          <g stroke-width="4.5" fill="none">
            <circle cx="24" cy="35" r="6" stroke="url(#topGradient)" />
            <circle cx="50" cy="20" r="6" stroke="url(#topGradient)" />
            <circle cx="76" cy="35" r="6" stroke="url(#topGradient)" />
            <circle cx="24" cy="65" r="6" stroke="url(#bottomGradient)" />
            <circle cx="50" cy="80" r="6" stroke="url(#bottomGradient)" />
            <circle cx="76" cy="65" r="6" stroke="url(#bottomGradient)" />
            <circle cx="50" cy="50" r="6" stroke="url(#bottomGradient)" />
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
