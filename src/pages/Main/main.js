import React from "react";
import "./index.css";

export default function Login() {
  const username = localStorage.getItem("user");
  return (
    <main>
      <div className='welcome-box'>
        <h1>Welcome {username}</h1>
      </div>
    </main>
  );
}
