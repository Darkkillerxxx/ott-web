import { AppTextBold } from "./AppTextBold";
import { AppText } from "./AppText";

const ScreenHeader = ({ label }) => {
  return (
    <div
      style={{
        width: "100%",
        padding: "1rem",
        borderBottom: "2px solid #e0e0e0",
        marginBottom: "1rem",
      }}
    >
      <AppText
        style={{
          fontSize: "1.5rem",
          color: "#333",
          marginBottom: "0.5rem",
        }}
      >
        {label}
      </AppText>
    </div>
  );
};

export default ScreenHeader;
