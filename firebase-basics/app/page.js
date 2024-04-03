"use client";
import styles from "./page.module.css";
import { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase.config";
import { Button } from "@mui/material";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("Breakpoint101 userstate is logged ", uid, user);
      setLoggedIn(true);
    } else {
      // User is signed out
      console.log("Breakpoint101 userstate is logged out");
      setLoggedIn(false);
    }
  });

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <main className={styles.main}>
      {loggedIn ? "User is Logged In" : "User Is Looged out"}

      <Button variant="contained" color="error" onClick={() => handleLogout()}>
        Log out
      </Button>
    </main>
  );
}
