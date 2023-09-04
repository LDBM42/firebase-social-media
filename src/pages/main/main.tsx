import { getDocs, collection } from 'firebase/firestore'; // collection is to defind which collection we are going to refer to.
import { db } from '../../config/firebase';
import { useState, useEffect } from 'react';
import { Post } from './post';

export interface Post {
    id: string;
    title: string;
    userId: string;
    username: string;
    description: string;
}


export const Main = () => {
    const [postsList, setPostsList] = useState<Post[] | null>(null);
    const postsRef = collection(db, 'posts');

    // firestore operations always require an await 
    const getPosts = async () => {
        const data = await getDocs(postsRef);
        setPostsList(
            // if the compiler doesn't know what the data is, we can specify the type this way: as Post[]
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
        );
        // console.log(
        //     data.docs.map((doc) => ({...doc.data(), id: doc.id }))
        //     // // these 2 are the same
        //     // (doc) => ({...doc.data(), id: doc.id })
        //     // (doc) => {return { ...doc.data(), id: doc.id }}
        // );
    };

    // to update everytime the components appears
    useEffect(() => {
        getPosts();
    }, []);

    return <div>
        {postsList?.map((post) => <Post key={post.id} post={post} /> )}
    </div>
}