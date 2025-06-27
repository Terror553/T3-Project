"use client";

import Link from "next/link";

type HeaderStatusProps = {
  type: "minecraft" | "discord";
};

export const HeaderStatus = ({ type }: HeaderStatusProps) => {
  if (type === "minecraft") {
    return (
      <Link
        href="#"
        className="header-status header-status-left"
        id="status-minecraft"
        data-ip="MelonenMC.de"
      >
        <div className="header-status-icon">
          <i className="fas fa-cube"></i>
        </div>
        <div className="header-status-content">
          <div className="header-status-title">
            <span id="ip-minecraftServer">MelonenMC.de</span>
          </div>
          <div className="header-status-description">
            <span id="count-minecraftServerPlayers">??</span> players online
          </div>
        </div>
      </Link>
    );
  }
  
  return (
    <Link
      href="https://coldfiredzn.com/discord"
      className="header-status header-status-right"
    >
      <div className="header-status-icon">
        <i className="fab fa-discord"></i>
      </div>
      <div className="header-status-content">
        <div className="header-status-title">Join Our Discord Server</div>
        <div className="header-status-description">
          <span id="count-discordServerUsers">??</span> users online
        </div>
      </div>
    </Link>
  );
};