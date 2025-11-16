export function HomeReel() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source
            src="https://ik.imagekit.io/qcvroy8xpd/envato_video_gen_Nov_10_2025_15_35_41.mp4?updatedAt=1762789151468"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      <div className="relative h-full min-h-screen flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-5xl mx-auto space-y-8 animate-fade-in">
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white/90 leading-[1.5]">
            People don't only want to connect with brands anymore, they connect with the people behind them.
          </p>
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-white/70 leading-[1.6]">
            At H2H we help companies show up online with a voice that feels real, relatable, and worth listening to.
          </p>
          <div className="pt-4 space-y-6 md:block hidden">
            <p className="text-lg md:text-xl lg:text-2xl font-light text-white/80 leading-[1.7]">
              In today's crowded digital world, connection is currency. Your audience wants honesty, personality, and purpose.
            </p>
            <p className="text-base md:text-lg lg:text-xl font-light text-white/70 leading-[1.7]">
              Whether you're a startup or a global brand, we'll help you cut through the noise and build a social presence that connects on a human level.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
