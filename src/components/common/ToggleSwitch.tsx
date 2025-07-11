import React from "react";
import "./ToggleSwitch.scss";

interface ToogleProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleSwitch: React.FC<ToogleProps> = ({ isChecked, setIsChecked }) => {

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };



  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleSwitch;

