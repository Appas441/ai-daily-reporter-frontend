import { useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import "./Buttons.css";

const Buttons = ({ text, setText }) => {
  const [loading, setLoading] = useState("");

  const handleAction = async (type) => {
    // ✅ prevent multiple clicks
    if (loading) return;

    try {
      setLoading(type);

      // ✅ START DAY
      if (type === "start") {
        if (!text.trim()) {
          toast.error("Please enter message ⚠️");
          return;
        }

        await API.post("/start-day", { text });

        toast.success("Start Day Email Sent ✅");
        setText("");
      }

      // ✅ SAVE LOG
      if (type === "save") {
        if (!text.trim()) {
          toast.error("Please enter work log ⚠️");
          return;
        }

        await API.post("/log", { text });

        toast.success("Log Saved 💾");
        setText("");
      }

      // ✅ END DAY
      if (type === "end") {
        if (!text.trim()) {
          toast.error("Please enter message ⚠️");
          return;
        }

        await API.post("/end-day", { text });

        toast.success("End Day Email Sent 📧");
        setText("");
      }

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ❌");
    } finally {
      setLoading(""); // ✅ reset loading
    }
  };

  return (
    <div className="button-group">
      {/* START */}
      <button
        className="btn btn-primary"
        onClick={() => handleAction("start")}
        disabled={loading === "start"}
      >
        {loading === "start" ? "Sending..." : "Start Day"}
      </button>

      {/* SAVE */}
      <button
        className="btn btn-success"
        onClick={() => handleAction("save")}
        disabled={loading === "save"}
      >
        {loading === "save" ? "Saving..." : "Save Log"}
      </button>

      {/* END */}
      <button
        className="btn btn-danger"
        onClick={() => handleAction("end")}
        disabled={loading === "end"}
      >
        {loading === "end" ? "Sending..." : "End Day"}
      </button>
    </div>
  );
};

export default Buttons;