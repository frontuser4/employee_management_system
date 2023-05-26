import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const {state} = useLocation();
  return (
    <div className='bg-[#be185d] w-full h-screen flex justify-center'>
      <div className='flex flex-col'>
      <p className='text-2xl text-white'>Email : {state.email}</p>
      <p className='text-2xl text-white'>Username : {state.username}</p>
      </div>
    </div>
  )
}

export default Dashboard