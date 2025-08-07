import React from "react";

const models = ["🌟 Gemini", "💬 ChatGPT", "🦙 LLaMA", "🐋 Deepseek"];

const ModelSelector = ({ model, setModel }) => {
  return (
    <select
      value={model}
      onChange={(e) => setModel(e.target.value)}
      style={{
        border: "none",
        background: "#b71c1c",
        color: "white",
        padding: "4px 8px",
        borderRadius: "12px",
      }}
    >
      {models.map((m) => (
        <option key={m} value={m}>
          {m.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default ModelSelector;
