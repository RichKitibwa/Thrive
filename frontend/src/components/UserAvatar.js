import React from "react";
import "./dashboardNav.css"

function UserAvatar({ user }) {
    console.log(user);
    return (
        <div className="user-avatar">
            {user && user.isGoogleSignUp ? (
                <img
                    src={user.imageUrl}
                    alt={user.name}
                    className="rounded-circle"
                    width="40"
                    height="40"
                />
            ) : (
                <div className="avatar-circle">
                    {user && user.username.charAt(0).toUpperCase()}
                </div>
            )}
        </div>
    );
}

export default UserAvatar;
