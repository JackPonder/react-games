import { auth } from "../firebaseInit";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

export default function Sidebar() {
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
        {auth.currentUser ?
          <button onClick={signout} className="btn">Sign Out</button> :
          <button onClick={signin} className="btn">Sign In</button>
        }
      </div>
    </div>      
  )
}