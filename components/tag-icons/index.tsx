import { Javascript, NextJS, Rust, TailwindCSS, Typescript } from '@/components/tag-icons/icons'

const components = {
    'next-js': NextJS,
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
