'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import CourseOverview from '@/components/CourseOverview';
import CodeDemo from '@/components/CodeDemo';
import Instructor from '@/components/Instructor';

export default function Home() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
			<main>
				<Hero />
				<CourseOverview />
				<CodeDemo />
				{/* <Resources /> */}
				<Instructor />
			</main>
		</div>
	);
}
