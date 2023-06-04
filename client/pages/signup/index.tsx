import React, { useState } from 'react';
import { API_URL } from '../../constants';
import { UserInfo } from '../../modules/auth_provider';
import {useRouter} from 'next/router'



const Index = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await res.json()
      if (res.ok) {
        const user: UserInfo = {
          username: data.username,
          id: data.id,
        }

        localStorage.setItem('user_info', JSON.stringify(user))
        return router.push('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  

  return (
    <div className='flex items-center justify-center min-w-full min-h-screen'>
      <form className='flex flex-col md:w-1/5' >
        <div className='text-3xl font-bold text-center'>
          <span className='text-blue'>Kayıt Olun!</span>
        </div>
        <input
          placeholder='kullanıcı adı'
          className='p-3 mt-8 rounded-md border-2 border-grey focus:outline-none focus:border-blue'
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <input
          placeholder='email'
          className='p-3 mt-8 rounded-md border-2 border-grey focus:outline-none focus:border-blue'
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <input
          type='password'
          placeholder='şifre'
          className='p-3 mt-4 rounded-md border-2 border-grey focus:outline-none focus:border-blue'
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        <button
          className='p-3 mt-6 rounded-md bg-blue font-bold text-white'
          type='submit'
          onClick={submitHandler}
        >
          Kaydol
        </button>
      </form>
    </div>
  );
};

export default Index;