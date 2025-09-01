import React from 'react'
import FormLogin from './login-form'
export default function LoginPage() {
  return (
    <div className='container flex flex-col items-center justify-center min-h-screen p-4'>
      <h1 className='text-2xl font-mono text-red-400'>Đăng Nhập</h1>
      <FormLogin />
    </div>
  )
}
