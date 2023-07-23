import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { UserContext } from "../UserContext";
import PlacesPage from "./PlacesPage";

function ProfilePage() {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const logout = async () => {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  };
  if (!ready) {
    return "Loading....";
  }
  if (ready && !user && !redirect) return <Navigate to={"/login"} />;

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Loggend in as {user.name} ({user.email})<br />
          <button
            className="primary max-w-sm mt-2"
            onClick={logout}
            type="button"
          >
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
