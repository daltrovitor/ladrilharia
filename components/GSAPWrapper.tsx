"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GSAPWrapper() {
  useEffect(() => {
    // Only execute on browser
    gsap.registerPlugin(ScrollTrigger);

    // 1. Initial Hero Entry Animation (runs on mount after loader)
    const heroTl = gsap.timeline();
    heroTl.to(".hero-anim-item", {
      y: 0,
      opacity: 1,
      duration: 1.4,
      ease: "power4.out",
      stagger: 0.15,
      delay: 1.2,
    });

    // 2. Scroll Triggered Fade Up Animations (Sections)
    const fadeUpItems = document.querySelectorAll(".scroll-fade-up");
    fadeUpItems.forEach((item) => {
      gsap.fromTo(
        item,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // 3. Scroll Parallax on Images
    const parallaxImages = document.querySelectorAll(".parallax-img-wrapper img");
    parallaxImages.forEach((img) => {
      gsap.to(img, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // 4. Parallax Text/Blocks (Speed layers)
    const speedLayers = document.querySelectorAll("[data-parallax-speed]");
    speedLayers.forEach((layer) => {
      const speed = parseFloat(layer.getAttribute("data-parallax-speed") || "0");
      gsap.to(layer, {
        y: () => window.innerHeight * speed * 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: layer,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // 5. Horizontal Scroll Section (Direction Change for Photos)
    const track = document.querySelector(".horizontal-gallery-track");
    const container = document.querySelector("#galeria-horizontal");
    if (track && container) {
      // Delay slightly to ensure layout calculation is accurate
      const setupHorizontalScroll = () => {
        const scrollWidth = track.scrollWidth - window.innerWidth;
        if (scrollWidth <= 0) return; // No scroll needed if content fits
        
        gsap.to(track, {
          x: -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            invalidateOnRefresh: true,
          },
        });
      };
      
      // Run setup
      setTimeout(setupHorizontalScroll, 100);
    }

    // 6. Card Stacking / Bento items hover reveals
    const bentoCards = document.querySelectorAll(".bento-card");
    bentoCards.forEach((card) => {
      gsap.fromTo(
        card,
        { scale: 0.95, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
