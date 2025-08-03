'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X, Calendar } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import Link from 'next/link';

const navItems = [
	{ id: 'hero', label: 'Home' },
	{ id: 'instructor', label: 'Instructor' },
];

export default function Navbar() {
	const [activeSection, setActiveSection] = useState('hero');
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { theme, setTheme } = useTheme();

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

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
		setIsMobileMenuOpen(false);
	};

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
					<motion.div
						whileHover={{ scale: 1.05 }}
						className='flex items-center space-x-2'>
						<div className='w-8 h-8 bg-[#13AA52] rounded-lg flex items-center justify-center'>
							<span className='text-white font-bold text-sm'>M</span>
						</div>
						<span className='text-xl font-bold text-gray-900 dark:text-white'>
							MongoDB Course
						</span>
					</motion.div>

					{/* Desktop Navigation
					<div className='hidden md:flex items-center space-x-8'>
						{navItems.map((item) => (
							<button
								key={item.id}
								onClick={() => scrollToSection(item.id)}
								className={`relative px-3 py-2 text-sm font-medium transition-colors ${
									activeSection === item.id
										? 'text-[#13AA52] dark:text-[#13AA52]'
										: 'text-gray-700 dark:text-gray-300 hover:text-[#13AA52] dark:hover:text-[#13AA52]'
								}`}>
								{item.label}
								{activeSection === item.id && (
									<motion.div
										layoutId='activeTab'
										className='absolute bottom-0 left-0 right-0 h-0.5 bg-[#13AA52]'
									/>
								)}
							</button>
						))}
					</div> */}

					<div className='flex items-center space-x-4'>
						<Link href='/day1'>
							<motion.button
								whileHover={{ scale: 1.05 }}
								className='px-4 py-2 bg-[#13AA52] text-white rounded-lg font-medium text-sm hover:bg-[#0F8A42] transition-colors flex items-center gap-2'>
								<Calendar className='w-4 h-4' />
								Day 1
							</motion.button>
						</Link>
						<Link href='/day2'>
							<motion.button
								whileHover={{ scale: 1.05 }}
								className='px-4 py-2 bg-[#13AA52] text-white rounded-lg font-medium text-sm hover:bg-[#0F8A42] transition-colors flex items-center gap-2'>
								<Calendar className='w-4 h-4' />
								Day 2
							</motion.button>
						</Link>

						<button
							onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
							className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
							{theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
						</button>

						{/* Mobile menu button */}
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className='md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800'>
							{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className='md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800'>
						<div className='py-4 space-y-2'>
							{navItems.map((item) => (
								<button
									key={item.id}
									onClick={() => scrollToSection(item.id)}
									className='block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#13AA52] dark:hover:text-[#13AA52] hover:bg-gray-50 dark:hover:bg-gray-800'>
									{item.label}
								</button>
							))}
							<Link href='/day1'>
								<button className='w-full text-left px-4 py-2 text-sm font-medium text-[#13AA52] hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2'>
									<Calendar className='w-4 h-4' />
									Day 1 Content
								</button>
							</Link>
						</div>
					</motion.div>
				)}
			</div>
		</motion.nav>
	);
}
