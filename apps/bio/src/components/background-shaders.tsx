import { MeshGradient } from "@paper-design/shaders-react";

const SPEED = 1;

export function BackgroundShaders({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen bg-blue-950 relative overflow-hidden">
      <MeshGradient
        className="w-full h-full absolute inset-0"
        // colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
        colors={["#162455", "#1C398E", "#193CB8", "#ffffff"]}
        speed={SPEED}
      />

      {/* Lighting overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-32 h-32 bg-gray-800/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: `${3 / SPEED}s` }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/2 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: `${2 / SPEED}s`, animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-20 h-20 bg-gray-900/3 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: `${4 / SPEED}s`, animationDelay: "0.5s" }}
        />
      </div>

      <div className="absolute inset-0 grid place-items-center overflow-scroll md:p-4">
        {children}
      </div>
    </div>
  );
}
