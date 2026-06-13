import { useCallback, useMemo, useState } from "react";
import { stats, slides, type DetailContent } from "../data/presentationData";

export function usePresentationState() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [filterTarget, setFilterTarget] = useState(false);
  const [filterDeepfake, setFilterDeepfake] = useState(false);
  const [activeTheory, setActiveTheory] = useState(0);
  const [activeDetail, setActiveDetail] = useState<DetailContent | null>(null);

  const filteredSample = useMemo(() => {
    let count = stats.rawSample;
    if (filterTarget) count -= 39;
    if (filterDeepfake) count -= 12;
    return count;
  }, [filterTarget, filterDeepfake]);

  const nextSlide = useCallback(() => {
    setActiveDetail(null);
    setCurrentSlide((s) => (s + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveDetail(null);
    setCurrentSlide((s) => (s - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setActiveDetail(null);
    setCurrentSlide(index);
  }, []);

  const openDetail = useCallback((detail: DetailContent) => {
    setActiveDetail(detail);
  }, []);

  const closeDetail = useCallback(() => {
    setActiveDetail(null);
  }, []);

  const toggleAutoPlay = useCallback(() => setAutoPlay((v) => !v), []);

  return {
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
  };
}
