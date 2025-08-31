
import React from 'react'
import RegisterForm from './register-form'

export default function page() {
  return (
    <div className='container flex flex-col items-center justify-center min-h-screen p-4'>
      <h1 className='text-2xl font-mono text-red-400'>Dang Ky</h1>
      <RegisterForm />
    </div>
  )
}

