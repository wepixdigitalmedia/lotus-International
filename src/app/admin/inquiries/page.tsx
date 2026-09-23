"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Globe,
  Building,
  Mail,
  Phone,
  Calendar,
  X,
  Send,
  Sparkles,
} from "lucide-react";

interface BuyerInquiry {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  country: string;
  garments: string[];
  quantity: string;
  targetMarket: string;
  notes: string;
  status: "New" | "Reviewing" | "Quoted" | "Closed";
  date: string;
}

const SAMPLE_INQUIRIES: BuyerInquiry[] = [
  {
    id: "inq-101",
    companyName: "Nordic Retail Group AS",
    contactName: "Frederik Lindholm",
    email: "frederik.l@nordicretail.se",
    phone: "+46 8 123 4567",
    country: "Sweden",
    garments: ["Men's Classic Pique Polo", "Organic Cotton Hoodie"],
    quantity: "15,000 pcs / quarterly",
    targetMarket: "European Retail & E-commerce",
    notes: "Seeking GOTS certified organic cotton pique with custom engraved corozo buttons and custom interior woven branding labels.",
    status: "New",
    date: "2026-09-14",
  },
  {
    id: "inq-102",
    companyName: "Aura Sportswear USA",
    contactName: "Sarah Jenkins",
    email: "sjenkins@aurasport.com",
    phone: "+1 (415) 555-0198",
    country: "United States",
    garments: ["Heavyweight Oversized Tee", "Nature Polo Club styles"],
    quantity: "25,000 pcs",
    targetMarket: "North America Streetwear / Athleisure",
    notes: "Need heavy 280 GSM combed jersey with vintage wash effect and custom silicone-dipped drawcords.",
    status: "Reviewing",
    date: "2026-09-12",
  },
  {
    id: "inq-103",
    companyName: "Melbourne Apparel Partners",
    contactName: "David O'Connor",
    email: "doconnor@melbourneapparel.au",
    phone: "+61 3 9876 5432",
    country: "Australia",
    garments: ["Kids Cotton Romper & Baby Sets"],
    quantity: "8,000 sets",
    targetMarket: "Australia / New Zealand",
    notes: "Requires GOTS Organic baby-safe certification and nickel-free YKK brass snap buttons.",
    status: "Quoted",
    date: "2026-09-10",
  },
];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<BuyerInquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<BuyerInquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lotus_admin_inquiries");
      if (stored) {
        setInquiries(JSON.parse(stored));
      } else {
        setInquiries(SAMPLE_INQUIRIES);
        localStorage.setItem("lotus_admin_inquiries", JSON.stringify(SAMPLE_INQUIRIES));
      }
    } catch (e) {
      setInquiries(SAMPLE_INQUIRIES);
    }
  }, []);

  const handleUpdateStatus = (id: string, newStatus: BuyerInquiry["status"]) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status: newStatus } : inq
    );
    setInquiries(updated);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
    localStorage.setItem("lotus_admin_inquiries", JSON.stringify(updated));
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Buyer Pipeline
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {filteredInquiries.length} requests
            </span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-slate-900 mt-1">
            Buyer Inquiries & RFQ Pipeline
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review inbound production inquiries, quotation requests, and fabric sample inquiries from international brands.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zoho CRM Synced</span>
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {["All", "New", "Reviewing", "Quoted", "Closed"].map((status) => {
            const count =
              status === "All"
                ? inquiries.length
                : inquiries.filter((i) => i.status === status).length;
            const isActive = statusFilter === status;

            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <span>{status}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-slate-800 text-slate-200" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search company, buyer or country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                <th className="py-3 px-4">Company & Buyer</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Garment Request</th>
                <th className="py-3 px-4">Target Volume</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No buyer inquiries found matching the filter.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{inq.companyName}</p>
                      <p className="text-[11px] text-slate-500">{inq.contactName}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{inq.email}</p>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      <div className="flex items-center space-x-1.5">
                        <Globe className="w-3.5 h-3.5 text-slate-400" />
                        <span>{inq.country}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {inq.garments.map((g, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium truncate"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-medium text-slate-800">
                      {inq.quantity}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          inq.status === "New"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : inq.status === "Reviewing"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : inq.status === "Quoted"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      {inq.date}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-amber-700 bg-slate-100 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  RFQ ID: {selectedInquiry.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedInquiry.companyName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">
                    Buyer Contact
                  </span>
                  <p className="font-semibold text-slate-800">
                    {selectedInquiry.contactName}
                  </p>
                  <p className="text-slate-500 font-mono text-[11px]">
                    {selectedInquiry.email}
                  </p>
                  {selectedInquiry.phone && (
                    <p className="text-slate-500 font-mono text-[11px]">
                      {selectedInquiry.phone}
                    </p>
                  )}
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">
                    Territory / Country
                  </span>
                  <p className="font-semibold text-slate-800">
                    {selectedInquiry.country}
                  </p>
                  <p className="text-slate-500">{selectedInquiry.targetMarket}</p>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono mb-1">
                  Requested Garments & Volume
                </span>
                <p className="font-semibold text-slate-900 text-sm">
                  Volume: {selectedInquiry.quantity}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {selectedInquiry.garments.map((g, i) => (
                    <span
                      key={i}
                      className="bg-amber-50 text-amber-900 font-medium px-2.5 py-1 rounded-md border border-amber-200"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono mb-1">
                  Buyer Notes & Specifications
                </span>
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-700 leading-relaxed">
                  {selectedInquiry.notes}
                </div>
              </div>

              {/* Status Update Buttons */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-mono mb-2">
                  Update Lead Status
                </span>
                <div className="flex flex-wrap gap-2">
                  {(["New", "Reviewing", "Quoted", "Closed"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedInquiry.id, st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        selectedInquiry.status === st
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
