// Add the "use client" directive at the top of your file
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "../../firebase"; // Import your Firebase setup
import { signOut } from "firebase/auth"; // Import the signOut function

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div>
      <nav
        className="navbar bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container">
          <Link href={"/"} className="navbar-brand">
            My Recipes
          </Link>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          {user ? (
            <button className="btn btn-outline-success" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <Link
              id="signinBtn"
              href={"/signin"}
              className="btn btn-outline-success"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
