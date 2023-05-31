import axios from 'axios';
import { useState} from 'react';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const url = 'http://142.93.208.119:8000/account/weblogin';

const Login = () => {

    const { register, handleSubmit, reset } = useForm();
    const [data, setData] = useState("");
    const navigate = useNavigate();

    function submitData(data) {
        axios.post(url, data).then((res) => {
            console.log(res.data.status)
            if(res.data.status){
                toast.success(res.data.message)
                navigate('/dashboard', {state: res.data})
            }else{
                toast.error(res.data.message)
            }
        }).catch((err) => {
            toast.error(err.message)
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
                    <input {...register("empId")} placeholder="employee Id" className='mb-4 p-2 rounded' />
                    <input {...register("password")} type='password' placeholder="Password" className='mb-4 p-2 rounded' />
                    <input type="submit" className='bg-orange-600 text-white p-2 rounded cursor-pointer' />
                </form>
            </div>
            <Toaster position='top-right' />
        </div>
    )
}

export default Login