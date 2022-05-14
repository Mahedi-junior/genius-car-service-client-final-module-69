import React from 'react';
import './SocialLogin.css'
import google2 from '../../../images/Social/google3.png';
import facebook from '../../../images/Social/facebook5.png'
import github from '../../../images/Social/github.png'
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import useToken from '../../../hooks/useToken';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);

    const [token] = useToken(user || user1);

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    let errorElement;
    if (loading || loading1) {
        return <Loading></Loading>
    }
    if (error || error1) {
        errorElement =
            <p className='text-danger'>Error: {error?.message} {error1?.message}</p>
    }

    if (token) {
        navigate(from, { replace: true });
    }


    return (
        <div>
            <div className='container d-flex align-items-center'>
                <div style={{ height: '1px' }} className='bg-secondary w-50'></div>
                <p className='mt-2 px-3'>or</p>
                <div style={{ height: '1px' }} className='bg-secondary w-50'></div>
            </div>

            {errorElement}

            <div className='container '>
                <button onClick={() => signInWithGoogle()} className='sign-in btn btn-info  mx-auto d-block my-3'>
                    <img className='px-3' height='35px' src={google2} alt="" />
                    Google Sign In
                </button>

                <button className='btn btn-info sign-in mx-auto d-block my-3'>
                    <img className='px-3' height='35px' src={facebook} alt="" />
                    Facebook Sign In
                </button>

                <button onClick={() => signInWithGithub()} className='btn btn-info sign-in mx-auto d-block'>
                    <img className='px-3' height='35px' src={github} alt="" />
                    Github Sign In
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;