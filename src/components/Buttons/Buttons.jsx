import { useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import "./Buttons.css";

const Buttons = ({ text, setText }) => {
  const [loading, setLoading] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [toEmail, setToEmail] = useState("");
  const [ccEmail, setCcEmail] = useState("");

  const handleAction = async (type) => {
    if (loading) return;

    try {
      setLoading(type);

      // ✅ VALIDATION
      if (!text.trim()) {
        toast.error("Enter message ⚠️");
        return;
      }

      if ((type === "start" || type === "end") && (!date || !time)) {
        toast.error("Select date & time ⏰");
        return;
      }

      if (!toEmail.trim()) {
        toast.error("Enter valid To Email 📧");
        return;
      }

      // ✅ FINAL PAYLOAD (MATCH BACKEND)
      const payload = {
        text: text.trim(),
        date: date,
        time: time,
        to_email: toEmail.trim(),
        cc_email: ccEmail.trim() || null,
      };

      console.log("✅ Sending:", payload);

      // ✅ API CALLS
      if (type === "start") {
        await API.post("/start-day", payload);
        toast.success("Start scheduled ✅");
      }

      if (type === "end") {
        await API.post("/end-day", payload);
        toast.success("End scheduled 📧");
      }

      if (type === "save") {
        await API.post("/log", { text: text.trim() });
        toast.success("Log saved 💾");
      }

      // ✅ RESET
      setText("");
      setDate("");
      setTime("");
      setToEmail("");
      setCcEmail("");

    } catch (error) {
      console.log("❌ ERROR:", error.response?.data);

      let msg = "Something went wrong ❌";

      if (error.response?.data?.detail) {
        const details = error.response.data.detail;

        if (Array.isArray(details)) {
          msg = details.map((e) => e.msg).join(", ");
        } else {
          msg = details;
        }
      }

      toast.error(msg);
    } finally {
      setLoading("");
    }
  };

  return (
    <div>

      <input
        type="email"
        placeholder="To Email"
        className="input"
        value={toEmail}
        onChange={(e) => setToEmail(e.target.value)}
      />

      <input
        type="email"
        placeholder="CC Email (optional)"
        className="input"
        value={ccEmail}
        onChange={(e) => setCcEmail(e.target.value)}
      />

      <input
        type="date"
        className="input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        type="time"
        className="input"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <div className="button-group">
        <button onClick={() => handleAction("start")} disabled={loading === "start"}>
          {loading === "start" ? "Scheduling..." : "Start Day"}
        </button>

        <button onClick={() => handleAction("save")} disabled={loading === "save"}>
          {loading === "save" ? "Saving..." : "Save Log"}
        </button>

        <button onClick={() => handleAction("end")} disabled={loading === "end"}>
          {loading === "end" ? "Scheduling..." : "End Day"}
        </button>
      </div>
    </div>
  );
};

export default Buttons;