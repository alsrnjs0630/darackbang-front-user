import { Button, Input, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
	return (
		<form className='w-full min-h-[100vh] flex flex-col items-center justify-center space-y-5 md:px-auto px-6'>
			<Typography className='text-2xl font-bold font-poppins mb-4'>
				Login
			</Typography>

			<div className='md:w-[70%] w-full'>
				<label>Username</label>
				<Input label='Username' />
			</div>
			<div className='md:w-[70%] w-full'>
				<label>Password</label>
				<Input label='Password' type='password' />
			</div>
			<div className='md:w-[70%] w-full flex items-center justify-center'>
				<Button size='lg' color='purple' className='w-[50%]'>
					Sign In
				</Button>
			</div>
			<Typography className='font-poppins'>
				Don't have an account?{" "}
				<Link to='/register' className='hover:text-purple-400'>
					Create one
				</Link>
			</Typography>
		</form>
	);
};

export default Login;
