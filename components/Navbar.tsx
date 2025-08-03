'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
	{ id: 'hero', label: 'Home', href: '/' },
	{ id: 'day1', label: 'Day 1', href: '/day1' },
	{ id: 'day2', label: 'Day 2', href: '/day2' },
];

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState('hero');
	const { theme, setTheme } = useTheme();
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);

			const sections = navItems.map((item) => document.getElementById(item.id));
			const scrollPosition = window.scrollY + 100;

			for (let i = sections.length - 1; i >= 0; i--) {
				const section = sections[i];
				if (section && section.offsetTop <= scrollPosition) {
					setActiveSection(navItems[i].id);
					break;
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Close mobile menu when screen size changes
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setIsMobileMenuOpen(false);
			}
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<motion.nav
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg'
					: 'bg-transparent'
			}`}>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					{/* Logo */}
					<motion.div
						whileHover={{ scale: 1.05 }}
						className='flex items-center space-x-2'>
						<div className='w-8 h-8 bg-[#13AA52] rounded-lg flex items-center justify-center'>
							<span className='text-white font-bold text-sm'>M</span>
						</div>
						<span className='text-lg sm:text-xl font-bold text-gray-900 dark:text-white'>
							MongoDB Course
						</span>
					</motion.div>

					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center space-x-8'>
						{navItems.map((item) => (
							<Link
								key={item.id}
								href={item.href}
								className={`relative px-3 py-2 text-sm font-medium transition-colors ${
									pathname === item.href
										? 'text-[#13AA52] dark:text-[#13AA52]'
										: 'text-gray-700 dark:text-gray-300 hover:text-[#13AA52] dark:hover:text-[#13AA52]'
								}`}>
								{item.label}
								{pathname === item.href && (
									<motion.div
										layoutId='activeTab'
										className='absolute bottom-0 left-0 right-0 h-0.5 bg-[#13AA52]'
									/>
								)}
							</Link>
						))}
					</div>

					{/* Desktop Action Buttons */}
					<div className='hidden md:flex items-center space-x-3 lg:space-x-4'>
						<button
							onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
							className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
							{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
						</button>
					</div>

					{/* Mobile Action Buttons */}
					<div className='flex md:hidden items-center space-x-2'>
						<button
							onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
							className='p-1.5 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
							{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
						</button>

						{/* Mobile menu button */}
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className='p-1.5 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
							{isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className='md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 overflow-hidden'>
						<div className='py-4 space-y-1'>
							{navItems.map((item) => (
								<Link
									key={item.id}
									href={item.href}
									className={`block w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
										pathname === item.href
											? 'text-[#13AA52] dark:text-[#13AA52] bg-gray-50 dark:bg-gray-800'
											: 'text-gray-700 dark:text-gray-300 hover:text-[#13AA52] dark:hover:text-[#13AA52] hover:bg-gray-50 dark:hover:bg-gray-800'
									}`}>
									{item.label}
								</Link>
							))}
						</div>
					</motion.div>
				)}
			</div>
		</motion.nav>
	);
}
