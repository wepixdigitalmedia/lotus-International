import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import RFQForm from "@/components/RFQForm";
import { Mail, Phone, Clock, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="page-transition min-h-screen pb-20">
      {/* Page Header */}
      <section className="bg-brand-ink text-brand-bg py-20 md:py-24 relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] shadow-lg">
        {/* Background Hero Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/heroes/contact.jpg"
            alt="Tirupur Garment Export Merchandising Desk"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <span className="text-xs font-bold tracking-widest text-brand-accent uppercase mb-3 block">
              Direct Desk Inquiry
            </span>
            <h1 className="font-serif-heading text-3xl md:text-5xl font-bold max-w-3xl leading-tight">
              Request a Quote & Sourcing Parameters
            </h1>
            <p className="text-sm md:text-base text-brand-bg/75 mt-4 max-w-2xl font-medium">
              Submit your program details, target quantities, and fabric requirements. Our merchandising desk in Tirupur responds with formal estimates within 24 hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Layout */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact details (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <ScrollReveal>
                <h2 className="font-serif-heading text-2xl md:text-3xl font-bold text-brand-ink mb-4">
                  Get in Touch Directly
                </h2>
                <p className="text-xs md:text-sm text-brand-grey leading-relaxed">
                  Have a quick question about our capacity, certifications, or custom fabrics? Speak directly with our client coordinators.
                </p>
              </ScrollReveal>

              <div className="space-y-6">
                {/* Contact Card 1 */}
                <ScrollReveal delay={0.05} className="flex gap-4 p-5 bg-brand-bg border border-brand-light-grey rounded-xl">
                  <Mail className="w-5 h-5 text-brand-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif-heading text-base font-bold text-brand-ink mb-1">Corporate Inquiries</h4>
                    <a href="mailto:info@thelotus-international.com" className="text-xs text-brand-grey font-medium hover:text-brand-accent transition-colors block">
                      info@thelotus-international.com
                    </a>
                  </div>
                </ScrollReveal>

                {/* Contact Card 2 */}
                <ScrollReveal delay={0.1} className="flex gap-4 p-5 bg-brand-bg border border-brand-light-grey rounded-xl">
                  <Phone className="w-5 h-5 text-brand-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif-heading text-base font-bold text-brand-ink mb-1">Call Our Tirupur Office</h4>
                    <a href="tel:+914212224444" className="text-xs text-brand-grey font-medium hover:text-brand-accent transition-colors block">
                      +91 (421) 222-4444
                    </a>
                  </div>
                </ScrollReveal>

                {/* Contact Card 3 */}
                <ScrollReveal delay={0.15} className="flex gap-4 p-5 bg-brand-bg border border-brand-light-grey rounded-xl">
                  <Clock className="w-5 h-5 text-brand-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif-heading text-base font-bold text-brand-ink mb-1">Response Time Guarantee</h4>
                    <p className="text-xs text-brand-grey font-medium">
                      All RFQ submissions and emails are processed and answered within 1 business day.
                    </p>
                  </div>
                </ScrollReveal>

                {/* WhatsApp Click-to-Chat */}
                <ScrollReveal delay={0.2} className="pt-2">
                  <a
                    href="https://wa.me/914212224444"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-xl border border-[#25D366] hover:bg-[#25D366]/5 text-[#25D366] font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Chat on WhatsApp Business</span>
                  </a>
                </ScrollReveal>
              </div>

              {/* Google Map Address & Iframe */}
              <ScrollReveal delay={0.25} className="border-t border-brand-light-grey pt-8 space-y-4">
                <div className="flex gap-3 text-xs text-brand-grey font-medium">
                  <MapPin className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-brand-ink block mb-0.5 font-bold">Lotus Factory Address:</strong>
                    No.255/1, Pudhupalayam Village, Avinashi, Tirupur – 641654, Tamil Nadu, India.
                  </span>
                </div>

                {/* Iframe Maps placeholder */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-brand-light-grey shadow-inner bg-brand-bg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.682649033324!2d77.29177267591873!3d11.200388751025552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9067b55555555%3A0x6b1070ff99999999!2sAvinashi%2C%20Tamil%20Nadu%20641654!5e0!3m2!1sen!2sin!4v1719280000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="The Lotus International Factory Map"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: RFQ Form (7 cols) */}
            <div className="lg:col-span-7">
              <ScrollReveal delay={0.1}>
                <RFQForm />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
