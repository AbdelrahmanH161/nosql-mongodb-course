'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Database, Code, Zap, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
	const scrollToOverview = () => {
		document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<section
			id='hero'
			className='min-h-screen flex items-center justify-center relative overflow-hidden'>
			{/* Background Animation */}
			<div className='absolute inset-0 bg-gradient-to-br from-[#13AA52]/5 via-transparent to-[#13AA52]/10' />

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='space-y-8'>
					{/* Floating Icons */}
					<div className='flex justify-center space-x-8 mb-8'>
						<motion.div
							animate={{ y: [-10, 10, -10] }}
							transition={{ duration: 3, repeat: Infinity }}
							className='p-4 bg-[#13AA52]/10 rounded-full'>
							<Database className='w-8 h-8 text-[#13AA52]' />
						</motion.div>
						<motion.div
							animate={{ y: [10, -10, 10] }}
							transition={{ duration: 3, repeat: Infinity, delay: 1 }}
							className='p-4 bg-[#13AA52]/10 rounded-full'>
							<Code className='w-8 h-8 text-[#13AA52]' />
						</motion.div>
						<motion.div
							animate={{ y: [-10, 10, -10] }}
							transition={{ duration: 3, repeat: Infinity, delay: 2 }}
							className='p-4 bg-[#13AA52]/10 rounded-full'>
							<Zap className='w-8 h-8 text-[#13AA52]' />
						</motion.div>
					</div>

					<h1 className='text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight'>
						Learn{' '}
						<span className='text-[#13AA52] relative'>
							NoSQL
							<motion.div
								initial={{ width: 0 }}
								animate={{ width: '100%' }}
								transition={{ duration: 1, delay: 1 }}
								className='absolute bottom-2 left-0 h-1 bg-[#13AA52]/30 rounded'
							/>
						</span>{' '}
						& <span className='text-[#13AA52]'>MongoDB</span>
						<br />
						<span className='text-gray-600 dark:text-gray-300'>in 2 Days</span>
					</h1>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
						className='text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed'>
						Master the fundamentals of NoSQL databases and become proficient in
						MongoDB through hands-on projects, real-world scenarios, and expert
						guidance.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8 }}
						className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={scrollToOverview}
							className='px-8 py-4 bg-[#13AA52] text-white rounded-xl font-semibold text-lg shadow-lg hover:bg-[#0F8A42] transition-colors flex items-center space-x-2'>
							<span>Start Learning</span>
							<ChevronDown className='w-5 h-5' />
						</motion.button>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.2 }}
							className='flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400'>
							<div className='flex items-center space-x-2'>
								<div className='w-2 h-2 bg-[#13AA52] rounded-full' />
								<span>2 Days Intensive</span>
							</div>
							<div className='flex items-center space-x-2'>
								<div className='w-2 h-2 bg-[#13AA52] rounded-full' />
								<span>Hands-on Projects</span>
							</div>
							<div className='flex items-center space-x-2'>
								<div className='w-2 h-2 bg-[#13AA52] rounded-full' />
								<span>Expert Instructor</span>
							</div>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>

			{/* Animated scroll indicator */}
			<motion.div
				animate={{ y: [0, 10, 0] }}
				transition={{ duration: 2, repeat: Infinity }}
				className='absolute bottom-8 left-1/2 transform -translate-x-1/2'>
				<ChevronDown className='w-6 h-6 text-gray-400' />
			</motion.div>
		</section>
	);
}
