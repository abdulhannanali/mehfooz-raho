import { Space, Typography } from "antd";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
      <div>
        <Link to="/">
          <Typography.Title level={3} style={{
            textAlign: 'center',
          }}>
            <span style={{backgroundColor: 'green', color: 'white'}}>Mehfooz</span>
            <span> </span>
            <span style={{backgroundColor: 'white', color: 'green'}}>Raho!</span>
          </Typography.Title>
        </Link>
      </div>
  );
}
