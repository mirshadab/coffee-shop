"use client";

import { useEffect, useState } from "react";
import { getAllAgents, createAgentAction, toggleAgentAvailability } from "@/lib/actions/admin";
import { useToast } from "@/lib/context/ToastContext";

type Agent = Awaited<ReturnType<typeof getAllAgents>>[0];

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const { showToast } = useToast();

  const fetchAgents = async () => {
    const data = await getAllAgents();
    setAgents(data);
    setLoading(false);
  };

  useEffect(() => { fetchAgents(); }, []);

  const handleAddAgent = async (formData: FormData) => {
    const result = await createAgentAction(formData);
    if (result.error) {
      showToast(result.error, "error");
    } else {
      showToast("Agent added");
      setShowAdd(false);
      fetchAgents();
    }
  };

  const handleToggle = async (agentId: string) => {
    await toggleAgentAvailability(agentId);
    showToast("Agent status updated");
    fetchAgents();
  };

  if (loading) return <div className="min-h-screen bg-[#F9F2ED] pt-20 text-center text-[#9B9B9B]">Loading...</div>;

  return (
    <div className="bg-[#F9F2ED] min-h-screen">
      <div className="px-7 pt-16 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-semibold text-[#2F2D2C]">Delivery Agents</h1>
          <p className="text-[12px] text-[#9B9B9B] mt-1">{agents.length} agents</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="bg-[#C67C4E] text-white text-[12px] font-semibold px-4 h-[36px] rounded-xl"
        >
          {showAdd ? "Cancel" : "+ Add"}
        </button>
      </div>

      <div className="px-7 pb-4">
        {/* Add Form */}
        {showAdd && (
          <form action={handleAddAgent} className="bg-white rounded-2xl p-4 mb-4 space-y-3">
            <input name="name" placeholder="Agent name" required
              className="w-full h-[42px] border border-[#DEDEDE] rounded-xl px-3 text-[13px] outline-none focus:border-[#C67C4E]" />
            <input name="phone" placeholder="Phone number" required
              className="w-full h-[42px] border border-[#DEDEDE] rounded-xl px-3 text-[13px] outline-none focus:border-[#C67C4E]" />
            <button type="submit" className="w-full bg-[#C67C4E] text-white text-[13px] font-semibold h-[42px] rounded-xl">
              Add Agent
            </button>
          </form>
        )}

        {/* Agents List */}
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
                  agent.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
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
