import {
  WhatsAppOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

import { stringify } from "querystring";
import { Button, Card } from "antd";
import { memo } from "react";

interface ShareTargetConfiguration {
  shareTargetName: string;
  shareTargetIcon: typeof WhatsAppOutlined;
  shareTargetColor: string;
  shareTargetLink: (text: string, url: string) => string;
}

interface LinkProps {
  text: string;
  url: string;
}

interface ShareButtonProps {
  shareTargetConfiguration: ShareTargetConfiguration;
  linkProps: LinkProps;
}

const FacebookBaseLink = "https://www.facebook.com/sharer/sharer.php?";
const TwitterBaseLink = "https://twitter.com/share?";
const WhatsAppBaseLink = "https://api.whatsapp.com/send?";

const configs: ShareTargetConfiguration[] = [
  {
    shareTargetName: "Facebook",
    shareTargetIcon: FacebookOutlined,
    shareTargetColor: "#3b5998",
    shareTargetLink: (text, url) => {
      return (
        FacebookBaseLink +
        stringify({
          u: url,
        })
      );
    },
  },

  {
    shareTargetName: "Twitter",
    shareTargetIcon: TwitterOutlined,
    shareTargetColor: "#1DA1F2",
    shareTargetLink: (text, url) => {
      return (
        TwitterBaseLink +
        stringify({
          text,
          url,
        })
      );
    },
  },

  {
    shareTargetName: "WhatsApp",
    shareTargetIcon: WhatsAppOutlined,
    shareTargetColor: "#25D366",
    shareTargetLink: (text, url) => {
      return WhatsAppBaseLink + stringify({ text: text + " " + url });
    },
  },
];

function ShareButton(props: ShareButtonProps) {
  const { shareTargetConfiguration, linkProps } = props;

  const link = shareTargetConfiguration.shareTargetLink(
    linkProps.text,
    linkProps.url
  );

  const { shareTargetColor } = shareTargetConfiguration;

  return (
    <Button
      className={
        "share-button share-button-" +
        shareTargetConfiguration.shareTargetName.toLowerCase()
      }
      color={shareTargetColor}
      style={{ color: shareTargetColor }}
      type="link"
      href={link}
      icon={<shareTargetConfiguration.shareTargetIcon />}
    >
      {shareTargetConfiguration.shareTargetName}
    </Button>
  );
}

function Share(props: LinkProps) {
  return (
    <div className="share-card" style={{ margin: "10px auto" }}>
      {configs.map((config, i) => (
        <ShareButton
          key={i}
          shareTargetConfiguration={config}
          linkProps={props}
        />
      ))}
    </div>
  );
}

export default Share;
