import { useEffect, useRef } from "react";
import gsap from "gsap";
import { slideVisuals } from "../data/slideVisuals";

type CinematicBackgroundProps = {
  currentSlide: number;
};

export function CinematicBackground({ currentSlide }: CinematicBackgroundProps) {
  const imageARef = useRef<HTMLImageElement>(null);
  const imageBRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeLayer = useRef<"a" | "b">("a");

  useEffect(() => {
    const visual = slideVisuals[currentSlide];
    const incoming = activeLayer.current === "a" ? imageBRef.current : imageARef.current;
    const outgoing = activeLayer.current === "a" ? imageARef.current : imageBRef.current;

    if (!incoming || !outgoing) return;

    const isFirst = !outgoing.getAttribute("src");

    incoming.src = visual.image;
    incoming.alt = visual.alt;

    const reveal = () => {
      if (isFirst) {
        gsap.set(incoming, { opacity: 1, scale: 1.03 });
        activeLayer.current = activeLayer.current === "a" ? "b" : "a";
        return;
      }
      gsap.fromTo(incoming, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1.03, duration: 1.1, ease: "power2.inOut" });
      gsap.to(outgoing, { opacity: 0, duration: 0.9, ease: "power2.inOut" });
      activeLayer.current = activeLayer.current === "a" ? "b" : "a";
    };

    if (incoming.complete) reveal();
    else incoming.onload = reveal;

    if (videoRef.current) {
      if (visual.video) {
        videoRef.current.src = visual.video;
        videoRef.current.load();
        void videoRef.current.play().catch(() => undefined);
        gsap.to(videoRef.current, { opacity: 0.18, duration: 0.8 });
      } else {
        gsap.to(videoRef.current, { opacity: 0, duration: 0.5 });
        videoRef.current.pause();
      }
    }
  }, [currentSlide]);

  useEffect(() => {
    const layers = [imageARef.current, imageBRef.current].filter(Boolean) as HTMLImageElement[];
    const tweens = layers.map((layer) =>
      gsap.to(layer, { scale: 1.06, duration: 22, ease: "none", repeat: -1, yoyo: true }),
    );
    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#0c0f14]" aria-hidden>
      <img ref={imageARef} className="absolute inset-0 h-full w-full object-cover opacity-0" alt="" />
      <img ref={imageBRef} className="absolute inset-0 h-full w-full object-cover opacity-0" alt="" />
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-0"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-[#0c0f14]/72" />
      <div className="vignette absolute inset-0" />
    </div>
  );
}
