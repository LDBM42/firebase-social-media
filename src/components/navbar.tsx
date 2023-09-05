import { Link } from 'react-router-dom';
import { Path } from '../resources/path';
import { auth } from '../config/firebase'; // this contains all the logged user info
import { useAuthState } from 'react-firebase-hooks/auth'; // this is like a useState for Auths
import { signOut } from 'firebase/auth';

export const Navbar = () => {

    // user is an updatable state that is the same as 'auth.currentUser'
    const [user] = useAuthState(auth);

    const signUserOut = async () => {
        await signOut(auth);
    }

    return (
        <div className='navbar'>
            <div className='links'>
                <Link to={Path.home}> Home </Link>

                {/* if there is no user show Login, otherwise show Create Post */}
                {!user ?
                    <Link to={Path.login}> Login </Link> :
                    <Link to={Path.createpost}> Create Post </Link>}
            </div>
            <div className='user'>
                {user && (
                    <>
                        {/* this shows the name of the current user */}
                        <p>{user?.displayName}</p>
                        {/* checks if the user object exists and has a truthy photoURL property. 
                        If it does, the photoURL value is assigned to the src attribute. 
                        Otherwise, an empty string is assigned as the src attribute value. */}
                        <img className='photo' src={user?.photoURL || ''} />
                        <button onClick={signUserOut}> Log Out </button>
                    </>
                )}
            </div>
        </div>
    )
}