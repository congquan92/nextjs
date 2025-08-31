import React from 'react'
import { ModeToggle } from './toggle-theme'
import Link from 'next/link'

export default function Header() {
  return (
    <div>
    <ModeToggle />
      
        <ul>
            <li>
                <Link href="/login">Login</Link>
            </li>
            <li>
                <Link href="/register">Register</Link>
            </li>
        </ul>
 
    </div>
  )
}
