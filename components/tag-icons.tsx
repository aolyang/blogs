import Chrome from '@/assets/tag-icons/chrome.svg'
import Javascript from '@/assets/tag-icons/javascript.svg'
import NextJS from '@/assets/tag-icons/nextjs.svg'
import React from '@/assets/tag-icons/react.svg'
import Rust from '@/assets/tag-icons/rust.svg'
import TailwindCSS from '@/assets/tag-icons/tailwind.svg'
import Typescript from '@/assets/tag-icons/typescript.svg'
import Vite from '@/assets/tag-icons/vite.svg'

const components = {
    'next-js': NextJS,
    'web-ext': Chrome,
    chrome: Chrome,
    browser: Chrome,
    vite: Vite,
    react: React,
    typescript: Typescript,
    javascript: Javascript,
    tailwind: TailwindCSS,
    tailwindcss: TailwindCSS,
    rust: Rust,
}

const tailwind = '#04ada3'

const chips: Record<string, string> = {
    typescript: '#007acc',
    javascript: '#ff9d00',
    vite: '#646cff',
    react: '#61dafb',
    tailwind,
    tailwindcss: tailwind,
    rust: '#e36c0b',
}

export default function getIcon(text: string) {
    return {
        icon: components[text],
        color: chips[text],
    }
}
