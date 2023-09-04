import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // 1- to redirect

export const Login = () => {
    const navigate = useNavigate();  // 2- to redirect

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate('/'); // 3- to redirect

    };

    return <div>
        <p>Sign In with Google to Continue</p>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
}