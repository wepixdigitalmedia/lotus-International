"use client";

import React from "react";

export default function FloatingWhatsApp() {
  const whatsappUrl =
    "https://wa.me/919944495167?text=Hello%20The%20Lotus%20International%2C%20I%20would%20like%20to%20inquire%20about%20custom%20garment%20manufacturing";

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-[88px] right-[15px] z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp (+91 99444 95167)"
        aria-label="Chat on WhatsApp (+91 99444 95167)"
        className="block w-[52px] h-[52px] rounded-full transition-all duration-300 hover:scale-110 active:scale-95 drop-shadow-md hover:drop-shadow-xl"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/whatsapp.png"
          alt="WhatsApp Chat"
          className="w-full h-full object-contain pointer-events-none"
        />
      </a>
    </aside>
  );
}
