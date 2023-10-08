'use client'

import { useState } from 'react'
import Toggle from '../form/Toggle'
import Profile from './Profile'

function Header() {
    const [isDarkModeOn, setDarkMode] = useState(false)

    const onDarkMode = () => {
        const darkMode = !isDarkModeOn
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        setDarkMode(darkMode)
    }

    return (
        <header className="flex items-center border-b-[1.5px] border-border-color">
            <h1 className="text-lg font-bold p-2 md:w-3/6">Bookstore</h1>
            <div className="md:w-3/6 flex gap-2 items-center justify-end">
                <Toggle on={isDarkModeOn} onClick={onDarkMode} />
                <span> {isDarkModeOn ? 'Dark' : 'Light'} mode</span>
                <Profile />
            </div>
        </header>
    )
}

export default Header
