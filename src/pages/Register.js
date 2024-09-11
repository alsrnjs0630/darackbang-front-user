import React from "react";
import { Typography, Button, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Register = () => {
	return (
		<form className='w-full min-h-[100vh] flex flex-col items-center justify-center space-y-5 md:px-auto px-6'>
			<Typography className='text-2xl font-bold font-poppins mb-4'>
				Register
			</Typography>

			<div className='md:w-[70%] w-full'>
				<label>Email Address</label>
				<Input label='Email' type='email' />
			</div>
			<div className='md:w-[70%] w-full'>
				<label>Password</label>
				<Input label='Password' type='password' />
			</div>
			<div className='md:w-[70%] w-full'>
				<label>Confirm Password</label>
				<Input label='Password' type='password' />
			</div>
			<div className='md:w-[70%] w-full flex items-center justify-center'>
				<Button size='lg' color='purple' className='w-[50%]'>
					Register
				</Button>
			</div>
			<Typography className='font-poppins'>
				Already have an account?{" "}
				<Link to='/login' className='hover:text-purple-400'>
					Sign in
				</Link>
			</Typography>
		</form>
	);
};

export default Register;
