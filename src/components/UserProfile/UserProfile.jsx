import React from "react";

function UserProfile({ userPhoto, onLogout }) {
  return (
    <div className="user-profile">
      <img
        src={userPhoto || "https://via.placeholder.com/40"}
        alt="User"
        className="profile-pic"
      />
      <button onClick={onLogout} className="logout-button">
        Sair
      </button>
    </div>
  );
}

export default UserProfile;