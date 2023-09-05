import '../../App.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
// addDoc is to add a document(it is like a row in the collection) to out database
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../resources/path';

interface CreateFormData {
    title: string;
    description: string;
}


export const CreateForm = () => {

    // user is an updatable state that is the same as 'auth.currentUser'
    const [user] = useAuthState(auth);
    const navigate = useNavigate();


    const schema = yup.object().shape({
        title: yup.string().required("You must add a title."),
        description: yup.string().required("You must add a description."),
    });


    const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    const postsRef = collection(db, 'posts');
    const onCreatePost = async (data: CreateFormData) => {
        // first we pass the reference to the collection and next we pass the data we want to add
        await addDoc(postsRef, {
            ...data, // because the data has the same name as the keys, 
            //we use this syntax that means all what is inside data plus the others {username and userId},
            // it is the same as the next syntax:
            // tittle: data.title,
            // description: data.description, 
            username: user?.displayName,
            userId: user?.uid,
        });
        navigate(Path.home);
    };



    return (
        <form className='create-form' onSubmit={handleSubmit(onCreatePost)}>
            <h1 className='create-post-header'>Create Post</h1>
            <input className='create-title' type='text' placeholder='Title...' {...register('title')} />
            <p style={{ color: 'red' }}>{errors.title?.message}</p>
            <textarea className='create-description' placeholder='Decription...' {...register('description')} />
            <p style={{ color: 'red' }}>{errors.description?.message}</p>
            <input className='submit-post' type='submit' />
        </form>
    );
};