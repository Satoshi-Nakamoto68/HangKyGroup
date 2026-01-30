"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            Get Started
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy mt-4 mb-6 text-balance">
            Ready to Build Something Lasting?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">
            Whether you are exploring partnership opportunities, seeking
            investment, or looking to verify our credentials, we are ready to
            connect.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/investment"
              className="group px-8 py-4 bg-navy text-cream font-medium rounded hover:bg-navy-light transition-all duration-300 flex items-center gap-2"
            >
              Explore Investment Focus
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="group px-8 py-4 border border-navy/20 text-navy font-medium rounded hover:bg-navy hover:text-cream transition-all duration-300 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact the Group
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
