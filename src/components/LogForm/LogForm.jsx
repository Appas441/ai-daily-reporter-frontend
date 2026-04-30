import "./LogForm.css";

const LogForm = ({ text, setText }) => {
  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Enter your work updates..."
    />
  );
};

export default LogForm;