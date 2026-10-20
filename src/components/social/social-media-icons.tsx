"use client";

import { useInView } from "motion/react";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import {
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiFacebook,
  SiTiktok,
  SiWhatsapp,
} from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { config } from "@/data/config";
import Link from "next/link";

const BUTTONS = [
  {
    name: "Github",
    href: config.social.github,
    icon: <SiGithub size={"24"} color={"#fff"} />,
  },
  {
    name: "LinkedIn",
    href: config.social.linkedin,
    icon: <SiLinkedin size={"24"} color={"#fff"} />,
  },
  {
    name: "Facebook",
    href: config.social.facebook,
    icon: <SiFacebook size={"24"} color={"#fff"} />,
  },
  {
    name: "Instagram",
    href: config.social.instagram,
    icon: <SiInstagram size={"24"} color={"#fff"} />,
  },
  {
    name: "TikTok",
    href: config.social.tiktok,
    icon: <SiTiktok size={"24"} color={"#fff"} />,
  },
  {
    name: "WhatsApp",
    href: config.social.whatsapp,
    icon: <SiWhatsapp size={"24"} color={"#fff"} />,
  },
  {
    name: "Email",
    href: config.social.email,
    icon: <MdEmail size={"24"} color={"#fff"} />,
  },
];

const SocialMediaButtons = () => {
  const ref = useRef<HTMLDivElement>(null);
  const show = useInView(ref, { once: true });
  return (
    <div ref={ref} className="z-10 flex flex-wrap items-center gap-1">
      {show &&
        BUTTONS.map((button) =>
          button.href.startsWith("mailto:") ? (
            <a href={button.href} key={button.name} aria-label={button.name}>
              <Button variant={"ghost"}>{button.icon}</Button>
            </a>
          ) : (
            <Link
              href={button.href}
              key={button.name}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Button variant={"ghost"} aria-label={button.name}>
                {button.icon}
              </Button>
            </Link>
          )
        )}
    </div>
  );
};

export default SocialMediaButtons;
