import "./App.css";
// import { useEffect } from 'react';
import { useAuth, useLoginWithRedirect, ContextHolder } from "@frontegg/react";
import { AdminPortal } from "@frontegg/react";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const { user, isAuthenticated } = useAuth();
  const loginWithRedirect = useLoginWithRedirect();
  const [res, setRes] = useState();

  // Uncomment this to redirect to login automatically
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, loginWithRedirect]);

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  const hitDashboard = () => {
    const url = "http://localhost:13000/dashboard";
    const res = axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((response) => {
        console.log(`Response received as ${response.data}`);
        setRes(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    AdminPortal.show();
  };

  const temp = () => {
    console.log(user);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <div>
          <div>
            {/* <h1>{}</h1> */}
            <img src={user?.profilePictureUrl} alt={user?.name} />
          </div>
          <div>
            <span>Logged in as: {user?.name}</span>
          </div>
          <div>
            <button onClick={() => alert(user.accessToken)}>
              What is my access token?
            </button>
          </div>
          <button onClick={temp}>Temp</button>

          <button onClick={hitDashboard}>Hit Dashboard Endpoint</button>

          <div>
            <button onClick={() => logout()}>Click to logout</button>
          </div>
          <div>
            <button onClick={handleClick}>Settings</button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => loginWithRedirect()}>Click me to login</button>
          <button onClick={handleClick}>Settings</button>
        </div>
      )}
    </div>
  );
}

export default App;
