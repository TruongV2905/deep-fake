import { useCallback, useEffect, useRef } from "react";
import { CinematicBackground } from "./components/CinematicBackground";
import { DetailPanel } from "./components/DetailPanel";
import { SlideContent } from "./components/SlideContent";
import { DeckFooter } from "./components/layout/DeckFooter";
import { DeckHeader } from "./components/layout/DeckHeader";
import {
  animateFilterCount,
  useImageParallax,
  animateTheoryPanel,
  useGsapAnimations,
} from "./animations/useGsapAnimations";
import { usePresentationState } from "./hooks/usePresentationState";

export default function DeepfakePresentation() {
  const {
    currentSlide,
    autoPlay,
    isFullscreen,
    setIsFullscreen,
    filterTarget,
    setFilterTarget,
    filterDeepfake,
    setFilterDeepfake,
    activeTheory,
    setActiveTheory,
    activeDetail,
    filteredSample,
    nextSlide,
    prevSlide,
    goToSlide,
    openDetail,
    closeDetail,
    toggleAutoPlay,
  } = usePresentationState();

  const deckRef = useRef<HTMLDivElement | null>(null);
  const slideRef = useRef<HTMLElement | null>(null);
  const scrollAreaRef = useRef<HTMLElement | null>(null);
  const theoryPanelRef = useRef<HTMLDivElement | null>(null);
  const filterCountRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLDivElement | null>(null);

  useGsapAnimations({
    slideRef,
    scrollAreaRef,
    currentSlide,
    onNext: nextSlide,
    onPrev: prevSlide,
    detailOpen: Boolean(activeDetail),
  });

  useImageParallax(heroImageRef, currentSlide === 0 && !activeDetail);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement && deckRef.current) {
      await deckRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, [setIsFullscreen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeDetail) {
        if (e.key === "Escape") closeDetail();
        return;
      }
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      }
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key.toLowerCase() === "f") toggleFullscreen();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeDetail, closeDetail, nextSlide, prevSlide, toggleFullscreen]);

  useEffect(() => {
    if (!autoPlay || activeDetail) return;
    const id = window.setInterval(nextSlide, 5000);
    return () => window.clearInterval(id);
  }, [autoPlay, activeDetail, nextSlide]);

  useEffect(() => {
    if (currentSlide === 3) animateTheoryPanel(theoryPanelRef);
  }, [activeTheory, currentSlide]);

  useEffect(() => {
    if (currentSlide === 4) animateFilterCount(filterCountRef.current);
  }, [filteredSample, currentSlide]);

  return (
    <div
      ref={deckRef}
      className="relative min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]"
    >
      <CinematicBackground currentSlide={currentSlide} />

      <DeckHeader
        currentSlide={currentSlide}
        autoPlay={autoPlay}
        isFullscreen={isFullscreen}
        onPrev={prevSlide}
        onNext={nextSlide}
        onToggleAutoPlay={toggleAutoPlay}
        onToggleFullscreen={toggleFullscreen}
      />

      <main
        ref={scrollAreaRef}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center overflow-y-auto px-4 pb-24 pt-20 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8"
      >
        <section
          ref={slideRef}
          key={currentSlide}
          className="w-full py-4 md:py-6"
        >
          <SlideContent
            currentSlide={currentSlide}
            activeTheory={activeTheory}
            onTheorySelect={setActiveTheory}
            filterTarget={filterTarget}
            setFilterTarget={setFilterTarget}
            filterDeepfake={filterDeepfake}
            setFilterDeepfake={setFilterDeepfake}
            filteredSample={filteredSample}
            filterCountRef={filterCountRef}
            theoryPanelRef={theoryPanelRef}
            onOpenDetail={openDetail}
            heroImageRef={heroImageRef}
          />
        </section>
      </main>

      <DeckFooter currentSlide={currentSlide} onGoToSlide={goToSlide} />
      <DetailPanel detail={activeDetail} onClose={closeDetail} />
    </div>
  );
}
