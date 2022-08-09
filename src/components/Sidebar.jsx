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
      <h3>Play a Friend</h3>
      <h3>Play vs. Computer</h3>
      <div style={{marginTop:"auto", marginBottom:"4vmin"}}>
        {auth.currentUser ?
          <button onClick={signout} className="btn">Sign Out</button> :
          <button onClick={signin} className="btn">Sign In</button>
        }
      </div>
    </div>      
  )
}