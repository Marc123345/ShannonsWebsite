import { useState } from "react";

export function HeroText() {
  const [showVideo, setShowVideo] = useState(false);

  const closeModal = () => setShowVideo(false);

  return (
    <>
      <div className="max-w-[550px]">
        <h1
          className="
            text-[34px] sm:text-[40px] md:text-[46px] 
            font-semibold leading-tight text-neutral-950 mb-4
          "
        >
          From Business2Business to Human2Human:
          <br />
          Build a Brand People Want to Talk To
        </h1>

        <p className="text-[18px] sm:text-[20px] text-neutral-700 leading-relaxed mb-8">
          People don’t only want to connect with brands anymore — they connect
          with the people <span className="font-medium">behind</span> them.
        </p>

        {/* CTA BUTTON */}
        <button
          onClick={() => setShowVideo(true)}
          className="
            px-8 py-3 rounded-full
            bg-neutral-900 text-white 
            text-sm sm:text-base font-semibold uppercase
            tracking-[0.18em]
            transition-all duration-300
            hover:bg-neutral-800 hover:scale-[1.05]
            active:scale-[0.97]
          "
        >
          Hear Our Story
        </button>
      </div>

      {/* HOLOGRAM VIDEO MODAL */}
      {showVideo && (
        <div
          onClick={closeModal}
          className="
            fixed inset-0 z-[99999]
            flex items-center justify-center
            bg-black/80 backdrop-blur-[6px]
            animate-fadeIn
            cursor-pointer
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative w-[90%] max-w-[900px]
              rounded-xl overflow-hidden 
              shadow-[0_0_40px_rgba(255,255,255,0.15)]
              border border-white/20
              animate-hologramPop
            "
          >
            {/* HOLOGRAM SCANLINE OVERLAY */}
            <div
              className="
                absolute inset-0 pointer-events-none
                bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)]
                bg-[length:100%_3px]
                mix-blend-overlay
                opacity-30
                animate-scanlines
              "
            />

            {/* HOLOGRAM SOFT GLOW EDGES */}
            <div
              className="
                absolute inset-0 rounded-xl pointer-events-none
                ring-1 ring-white/30
                shadow-[0_0_25px_rgba(255,255,255,0.3)]
              "
            />

            {/* CLOSE BUTTON */}
            <button
              onClick={closeModal}
              className="
                absolute top-4 right-4 
                text-white text-2xl font-light
                hover:opacity-80 transition
                z-[20]
              "
            >
              ✕
            </button>

            {/* VIDEO */}
            <video
              src="https://ik.imagekit.io/yourvideo.mp4"
              className="w-full h-full"
              autoPlay
              controls
            />
          </div>
        </div>
      )}

      {/* HOLOGRAM ANIMATION KEYFRAMES */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out forwards;
          }

          @keyframes hologramPop {
            0% { transform: scale(0.85); opacity: 0; filter: blur(6px); }
            60% { transform: scale(1.03); opacity: 1; filter: blur(0); }
            100% { transform: scale(1); }
          }
          .animate-hologramPop {
            animation: hologramPop 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          }

          @keyframes scanlines {
            0% { background-position-y: 0; }
            100% { background-position-y: 100%; }
          }
          .animate-scanlines {
            animation: scanlines 4s linear infinite;
          }
        `}
      </style>
    </>
  );
}
