import { addDoc, getDocs, collection, query, where, doc, deleteDoc } from 'firebase/firestore';
import { Post as IPost } from './main'
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

interface Props {
    post: IPost;
}

interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {
    const [likes, setlikes] = useState<Like[] | null>(null);
    const { post } = props; // get the post from the props object
    const [user] = useAuthState(auth); // user is an updatable state that is the same as 'auth.currentUser'

    const likesRef = collection(db, 'likes');
    const likesDoc = query(likesRef, where('postId', '==', post.id));
    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setlikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })))

    }
    const addLike = async () => {
        // control the api crash with try catch
        try {
            // first we pass the reference to the collection and next we pass the data we want to add
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id
            });
            // set the data to the same previous value plus the new object { userId: user?.uid, likeId: newDoc.id }
            // if there is no user then just add this one
            if (user) {
                setlikes((prev) => prev ?
                    [...prev, { userId: user?.uid, likeId: newDoc.id }] :
                    [{ userId: user?.uid, likeId: newDoc.id }])
            }
        } catch (err) {
            console.log(err);
        }
    };

    // find if there is any userId that has already liked it
    const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

    const removeLike = async () => {
        // control the api crash with try catch
        try {
            // query the like that has the same post id and the same user id
            const likeToDeleteQuery = query(
                likesRef,
                where("postId", "==", post.id),
                where("userId", "==", user?.uid)
            );

            //getting the docs or rows from the previous query
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id; // getting the like Id
            //put the id of the found like in the doc function to get the doc
            const likeToDelete = doc(db, "likes", likeId);
            // delete the doc found
            await deleteDoc(likeToDelete);

            // if there is an user, add from the previous state only those likes with likeId diferent from this one 
            if (user) {
                setlikes((prev) => prev && // if prev is not null
                    (prev.filter((like) => like.likeId !== likeId)))
            }

        } catch (err) {
            console.log(err);
        }
    };

    // [] means that this is going to be excecuted only when the component is mounted
    useEffect(() => {
        getLikes()
    }, []);

    return (
        <div className='post-background'>
            <div className='post'>
                <h2 className='title'>{post.title}</h2>
                <p className='description'>{post.description}</p>
                <div className='footer'>
                    <p>@{post.username}</p>
                    <button className='like' onClick={hasUserLiked ? removeLike : addLike}>
                        {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
                    </button>
                    {likes !== null && <p> Likes: {likes.length} </p>}
                </div>
            </div>
        </div>
    )
}