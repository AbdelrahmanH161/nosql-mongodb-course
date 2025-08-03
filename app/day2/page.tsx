'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Hourglass } from 'lucide-react';
import Loading from '@/components/Loading';

export default function Day2Page() {
	const [mounted, setMounted] = useState(false);
	const [countdown, setCountdown] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		setMounted(true);

		// Set target date (you can adjust this)
		const targetDate = new Date('2025-08-05T10:00:00');

		const timer = setInterval(() => {
			const now = new Date().getTime();
			const distance = targetDate.getTime() - now;

			if (distance > 0) {
				setCountdown({
					days: Math.floor(distance / (1000 * 60 * 60 * 24)),
					hours: Math.floor(
						(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
					),
					minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
					seconds: Math.floor((distance % (1000 * 60)) / 1000),
				});
			}
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
			<main>
        <Suspense fallback={<Loading />}>
				{/* Hero Section */}
				<section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
					{/* Background Pattern */}
					<div className='absolute inset-0 opacity-10'>
						<div className='absolute top-20 left-20 w-72 h-72 bg-[#13AA52] rounded-full mix-blend-multiply filter blur-xl animate-pulse'></div>
						<div className='absolute top-40 right-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000'></div>
						<div className='absolute -bottom-8 left-40 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000'></div>
					</div>

					<div className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}>
							{/* Coming Soon Badge */}
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className='inline-flex items-center gap-2 bg-gradient-to-r from-[#13AA52] to-blue-500 text-white px-6 py-3 rounded-full font-semibold text-lg mb-8 shadow-lg'>
								<Hourglass className='w-5 h-5' />
								Coming Soon
							</motion.div>

							<h1 className='text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6'>
								Day 2
							</h1>
							<h2 className='text-3xl md:text-5xl font-bold text-[#13AA52] mb-8'>
								Advanced MongoDB & Real-World Applications
							</h2>
							<p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
								Take your MongoDB skills to the next level with advanced
								queries, aggregation pipelines, performance optimization, and
								building real-world applications.
							</p>

							{/* Countdown Timer */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.4 }}
								className='mb-12'>
								<h3 className='text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6'>
									Launching in:
								</h3>
								<div className='flex justify-center gap-4 md:gap-8'>
									{Object.entries(countdown).map(([unit, value]) => (
										<motion.div
											key={unit}
											initial={{ opacity: 0, scale: 0.8 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{
												duration: 0.5,
												delay: 0.6 + Object.keys(countdown).indexOf(unit) * 0.1,
											}}
											className='text-center'>
											<div className='bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 min-w-[80px] md:min-w-[100px]'>
												<div className='text-3xl md:text-4xl font-bold text-[#13AA52]'>
													{value.toString().padStart(2, '0')}
												</div>
												<div className='text-sm text-gray-500 dark:text-gray-400 capitalize'>
													{unit}
												</div>
											</div>
										</motion.div>
									))}
								</div>
							</motion.div>
						</motion.div>
					</div>

					{/* Scroll Indicator */}
					<motion.div
						className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
						animate={{ y: [0, 10, 0] }}
						transition={{ duration: 2, repeat: Infinity }}>
						<ChevronDown className='w-6 h-6 text-gray-400' />
						</motion.div>
					</section>
				</Suspense>
			</main>
		</div>
	);
}
