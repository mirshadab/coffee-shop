"use client";

import { useState } from "react";
import { useToast } from "@/lib/context/ToastContext";
import { mockAgents } from "@/lib/mock-data";

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState(mockAgents.map((a) => ({ ...a })));
  const { showToast } = useToast();

  const handleToggle = (id: string) => {
    setAgents((prev) => prev.map((a) => a.id === id ? { ...a, available: !a.available } : a));
    showToast("Agent status updated");
  };

  return (
    <div className="bg-[#F9F2ED] min-h-screen">
      <div className="px-7 pt-16 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-semibold text-[#2F2D2C]">Delivery Agents</h1>
          <p className="text-[12px] text-[#9B9B9B] mt-1">{agents.length} agents</p>
        </div>
      </div>

      <div className="px-7 pb-4">
        <div className="space-y-3">
          {agents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-2xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#C67C4E] to-[#EDD6C8] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[16px] font-bold">
                  {agent.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-semibold text-[#2F2D2C]">{agent.name}</p>
                <p className="text-[12px] text-[#9B9B9B]">{agent.phone}</p>
              </div>
              <button
                onClick={() => handleToggle(agent.id)}
                className={`text-[11px] font-semibold px-3 py-1.5 rounded-full ${
                  agent.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {agent.available ? "Available" : "Offline"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
