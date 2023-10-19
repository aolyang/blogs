import IconHome from '@/assets/home.svg'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'

import Link from './Link'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
    return (
        <header className='flex items-center gap-10 py-10 justify-center'>
            <Link href='/' aria-label={siteMetadata.headerTitle}>
                <IconHome className='dark:fill-white' />
            </Link>
            {headerNavLinks
                .filter((link) => link.href !== '/')
                .map((link) => (
                    <Link
                        key={link.title}
                        href={link.href}
                        className='hidden sm:block font-medium text-gray-900 dark:text-gray-100'
                    >
                        {link.title}
                    </Link>
                ))}
            <SearchButton />
            <ThemeSwitch />
            <MobileNav />
        </header>
    )
}

export default Header
