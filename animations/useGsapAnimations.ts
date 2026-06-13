import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Observer, ScrollTrigger);

const EASE = "power2.out";

type UseGsapAnimationsOptions = {
  slideRef: RefObject<HTMLElement | null>;
  scrollAreaRef?: RefObject<HTMLElement | null>;
  currentSlide: number;
  onNext: () => void;
  onPrev: () => void;
  detailOpen: boolean;
  enabled?: boolean;
};

export function useGsapAnimations({
  slideRef,
  scrollAreaRef,
  currentSlide,
  onNext,
  onPrev,
  detailOpen,
  enabled = true,
}: UseGsapAnimationsOptions) {
  const wheelLock = useRef(false);
  const onNextRef = useRef(onNext);
  const onPrevRef = useRef(onPrev);

  useEffect(() => {
    onNextRef.current = onNext;
    onPrevRef.current = onPrev;
  }, [onNext, onPrev]);

  useEffect(() => {
    if (!enabled || !slideRef.current) return;

    const ctx = gsap.context(() => {
      const slide = slideRef.current;
      if (!slide) return;

      const tl = gsap.timeline({ defaults: { ease: EASE, overwrite: "auto" } });

      tl.fromTo(slide, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7 });

      const heroes = slide.querySelectorAll("[data-reveal='hero']");
      if (heroes.length) {
        tl.fromTo(heroes, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.1 }, "-=0.4");
      }

      const items = slide.querySelectorAll("[data-reveal='item']");
      if (items.length) {
        tl.fromTo(items, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.07 }, "-=0.45");
      }

      const images = slide.querySelectorAll<HTMLElement>("[data-reveal='image']");
      images.forEach((img) => {
        tl.fromTo(img, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.9, ease: EASE }, "-=0.6");
      });

      slide.querySelectorAll<HTMLElement>("[data-progress]").forEach((bar, i) => {
        const target = Number.parseFloat(bar.dataset.progress ?? "0");
        gsap.fromTo(bar, { width: "0%" }, { width: `${target}%`, duration: 1, ease: EASE, delay: 0.25 + i * 0.1 });
      });

      slide.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
        const raw = el.dataset.counter ?? "0";
        const suffix = el.dataset.suffix ?? "";
        const target = Number.parseFloat(raw);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.1,
          ease: EASE,
          delay: 0.2,
          onUpdate: () => {
            const display = raw.includes(".") ? obj.val.toFixed(1) : Math.round(obj.val).toString();
            el.textContent = `${display}${suffix}`;
          },
        });
      });

      const scrollItems = slide.querySelectorAll("[data-reveal='scroll']");
      if (scrollItems.length) {
        tl.fromTo(scrollItems, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.06 }, "-=0.35");
      }

      if (scrollAreaRef?.current) {
        ScrollTrigger.batch("[data-reveal='scroll']", {
          scroller: scrollAreaRef.current,
          start: "top 90%",
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(batch, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: EASE });
          },
        });
      }
    }, slideRef);

    return () => ctx.revert();
  }, [currentSlide, enabled, slideRef, scrollAreaRef]);

  useEffect(() => {
    if (!enabled || detailOpen) return;

    const unlock = () => {
      wheelLock.current = false;
    };

    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 52,
      preventDefault: true,
      onDown: () => {
        if (wheelLock.current) return;
        wheelLock.current = true;
        onNextRef.current();
        gsap.delayedCall(0.7, unlock);
      },
      onUp: () => {
        if (wheelLock.current) return;
        wheelLock.current = true;
        onPrevRef.current();
        gsap.delayedCall(0.7, unlock);
      },
    });

    return () => observer.kill();
  }, [enabled, detailOpen]);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-hover='card']");
    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const onEnter = () => {
        gsap.to(card, {
          y: -3,
          scale: 1.01,
          boxShadow: "0 12px 32px rgba(0,0,0,0.22)",
          duration: 0.32,
          ease: EASE,
          overwrite: "auto",
        });
      };
      const onLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          duration: 0.35,
          ease: EASE,
          overwrite: "auto",
        });
      };
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [currentSlide, enabled]);

  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLElement>("[data-hover='btn']");
    const cleanups: Array<() => void> = [];

    buttons.forEach((btn) => {
      const onEnter = () => gsap.to(btn, { scale: 1.03, duration: 0.22, ease: EASE, overwrite: "auto" });
      const onLeave = () => gsap.to(btn, { scale: 1, duration: 0.26, ease: EASE, overwrite: "auto" });
      btn.addEventListener("mouseenter", onEnter);
      btn.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        btn.removeEventListener("mouseenter", onEnter);
        btn.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [currentSlide, enabled]);
}

export function animateTheoryPanel(panelRef: RefObject<HTMLElement | null>) {
  if (!panelRef.current) return;
  gsap.fromTo(panelRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: EASE });
}

export function animateFilterCount(el: HTMLElement | null) {
  if (!el) return;
  gsap.fromTo(el, { opacity: 0.5, y: 6 }, { opacity: 1, y: 0, duration: 0.4, ease: EASE });
}

export function animateDetailOpen(backdropRef: HTMLElement | null, panelRef: HTMLElement | null) {
  if (!backdropRef || !panelRef) return;
  gsap.fromTo(backdropRef, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: EASE });
  gsap.fromTo(panelRef, { opacity: 0, y: 20, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: EASE });
}

export function animateDetailClose(backdropRef: HTMLElement | null, panelRef: HTMLElement | null, onDone: () => void) {
  if (!backdropRef || !panelRef) {
    onDone();
    return;
  }
  const tl = gsap.timeline({ onComplete: onDone });
  tl.to(panelRef, { opacity: 0, y: 12, scale: 0.99, duration: 0.28, ease: EASE });
  tl.to(backdropRef, { opacity: 0, duration: 0.22, ease: EASE }, "-=0.12");
}

export function useImageParallax(imageRef: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled || !imageRef.current) return;
    const el = imageRef.current;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 5;
      gsap.to(el, { x, y, duration: 0.9, ease: EASE, overwrite: "auto" });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [imageRef, enabled]);
}
