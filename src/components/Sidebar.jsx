import { auth } from "../firebaseConfig";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { useUser } from "../hooks/useUser";
import "../styles/Sidebar.css";

const provider = new GoogleAuthProvider();

export default function Sidebar() {
  const {user} = useUser();

  const signin = async () => {
    await signInWithPopup(auth, provider);
  }

  const signout = async () => {
    await signOut(auth);
  }

  return (
    <div className="sidebar">
      <a href="/" className="sidebar-link">
        <h1>Connect 4</h1>
      </a> 
      <div>
        {user ?
          <button onClick={signout} className="btn">Sign Out</button> :
          <button onClick={signin} className="btn">Sign In</button>
        }
      </div>
    </div>      
  )
}