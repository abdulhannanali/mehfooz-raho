import { MedicineBoxOutlined, FlagFilled } from "@ant-design/icons";

export default function Logo() {
  return (
    <div className="logo">
      <a href="/">
        <h1 className="logo-text">
          <MedicineBoxOutlined
            twoToneColor="#eb2f96"
            style={{ display: "inline", color: "red" }}
          />
          <span className="text" style={{ margin: "0 10px" }}>
            Health Centres Info PK
          </span>
          <FlagFilled style={{ color: "green" }} />
        </h1>
      </a>
    </div>
  );
}
