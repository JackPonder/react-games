import { auth } from "../firebaseConfig";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

export default function Sidebar({ user }) {
  const signin = async () => {
    await signInWithPopup(auth, provider);
  }

  const signout = async () => {
    await signOut(auth);
  }

  return (
    <div className="sidebar">
      <h1>Connect 4</h1>
      <div>
        {user ?
          <button onClick={signout} className="btn">Sign Out</button> :
          <button onClick={signin} className="btn">Sign In</button>
        }
      </div>
    </div>      
  )
}