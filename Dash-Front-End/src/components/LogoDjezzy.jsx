import "../styles/LogoDjezzy.css";
import { useState } from "react";
export default function LogoDjezzy({rotating}) {
  
  return (
    <div className="LogoWithName" >
      <img
        className={`logo ${rotating ? "rotate" : ""}`}
        src="/assets/logo_djezzy.svg"
        alt="logo_djezzy"
      />
      <div className="Nom">
        <h2>DJEZZY DASH</h2>
        <h2 id="arabe">جازي داش</h2>
      </div>
    </div>
  );
}