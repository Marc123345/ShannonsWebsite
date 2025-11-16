import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const scrollTriggerConfig = {
  smooth: {
    scrub: 1.5,
    ease: 'power2.out',
  },
  fast: {
    scrub: 0.5,
    ease: 'power3.out',
  },
  slow: {
    scrub: 3,
    ease: 'power1.out',
  },
};

export function killScrollTrigger(element: HTMLElement | null) {
  if (!element) return;

  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.trigger === element) {
      trigger.kill();
    }
  });
}

export function createScrollFade(
  element: HTMLElement,
  options: {
    start?: string;
    end?: string;
    scrub?: number | boolean;
    delay?: number;
  } = {}
) {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 100,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power4.out',
      delay: options.delay || 0,
      scrollTrigger: {
        trigger: element,
        start: options.start || 'top 85%',
        end: options.end || 'top 30%',
        scrub: options.scrub !== undefined ? options.scrub : false,
        toggleActions: 'play none none reverse',
      },
    }
  );
}

export function createParallax(
  element: HTMLElement,
  distance: number = -100,
  options: {
    start?: string;
    end?: string;
    scrub?: number;
  } = {}
) {
  return gsap.to(element, {
    y: distance,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: options.start || 'top bottom',
      end: options.end || 'bottom top',
      scrub: options.scrub || 1,
    },
  });
}

export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}

export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

export function batchScrollTriggers(
  elements: Element[],
  options: {
    start?: string;
    end?: string;
    onEnter?: (batch: Element[]) => void;
    onLeave?: (batch: Element[]) => void;
  } = {}
) {
  return ScrollTrigger.batch(elements, {
    start: options.start || 'top 80%',
    end: options.end || 'top 20%',
    onEnter: (batch) => {
      gsap.from(batch, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
      });
      if (options.onEnter) options.onEnter(batch);
    },
    onLeave: options.onLeave,
  });
}
