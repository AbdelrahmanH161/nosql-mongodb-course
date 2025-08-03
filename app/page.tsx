import { Suspense } from 'react';
import Hero from '@/components/Hero';
import CourseOverview from '@/components/CourseOverview';
import CodeDemo from '@/components/CodeDemo';
import Instructor from '@/components/Instructor';
import Loading from '@/components/Loading';

export default function Home() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
			<main>
				<Suspense fallback={<Loading />}>
					<Hero />
					<CourseOverview />
					<CodeDemo />
					{/* <Resources /> */}
					<Instructor />
				</Suspense>
			</main>
		</div>
	);
}
