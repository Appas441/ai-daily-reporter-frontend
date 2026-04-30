import { useState } from "react";
import Header from "../../components/Header/Header";
import LogForm from "../../components/LogForm/LogForm";
import Buttons from "../../components/Buttons/Buttons";
import "./Dashboard.css";

const Dashboard = () => {
  const [text, setText] = useState("");

  return (
    <div className="dashboard">
      <Header />
      <LogForm text={text} setText={setText} />
      <Buttons text={text} setText={setText} />
    </div>
  );
};

export default Dashboard;