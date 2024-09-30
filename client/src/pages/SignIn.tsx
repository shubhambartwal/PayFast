import { redirect} from 'react-router-dom'
const SignIn = () => {
  return (
    <div className=' flex  justify-center items-center h-[100vh]'>
      <div className='bg-slate-500 p-5 rounded-xl text-white' >
      <h1 className='text-center font-bold' >Sign In</h1>
      <p className='p-1 m-1'>Enter the credentials to access your account</p>
      <div className='p-1 '>Email </div>
      <input className='p-1  w-full' type='email' />
      <div className='p-1 '>Password</div>
      <input className='p-1  w-full' type='password' />

<div className='flex justify-center ' ><button className='bg-slate-900 py-2 my-2 w-full rounded-xl'>Sign Up</button></div>
<p>Dont have an account
<button onClick={()=>redirect('/signup')}>Sign Up</button>
  </p>
      </div>
    </div>
  )
}

export default SignIn