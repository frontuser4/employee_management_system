import axios from 'axios';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, redirect } from 'react-router-dom';

const url = 'http://142.93.208.119:80/token/'


const Login = () => {

    const { register, handleSubmit, reset } = useForm();
    const [data, setData] = useState("");
    const navigate = useNavigate();

    function submitData(data) {
        axios.post(url, data).then((res) => {
            toast.success(res.data.message)
            setTimeout(()=>{
                navigate('/dashboard', {state: res.data})
            }, 1000)
        }).catch((err) => {
            toast.success(err.message)
            console.log(err)
        })
    }

    return (
        <div className='bg-[#0f172a] w-full h-screen flex items-center justify-center'>
            <div className='bg-[#16a34a] p-4 rounded w-96'>
                <h1 className='text-center mb-4 text-2xl font-bold'>Login</h1>
                <form onSubmit={handleSubmit((data) => {
            setData(JSON.stringify(data))
            submitData(data);
            reset();
        })} className='flex flex-col' >
                    <input {...register("username")} placeholder="Username" className='mb-4 p-2 rounded' />
                    <input {...register("password")} type='password' placeholder="Password" className='mb-4 p-2 rounded' />
                    <input type="submit" className='bg-orange-600 text-white p-2 rounded cursor-pointer' />
                </form>
            </div>
            <Toaster position='top-right' />
        </div>
    )
}

export default Login