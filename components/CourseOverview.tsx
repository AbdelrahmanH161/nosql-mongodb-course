'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	ChevronDown,
	BookOpen,
	Terminal,
	Users,
	Trophy,
	Globe,
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const courseData = {
	day1: {
		title: 'Day 1: NoSQL Fundamentals & MongoDB Basics',
		sessions: [
			{
				time: '9:00 AM - 9:30 AM',
				title: 'Introduction to NoSQL',
				type: 'theory',
				topics: [
					'What is NoSQL and why it emerged',
					'Comparison with traditional RDBMS',
					'Real-world use cases and examples',
					'SQL vs NoSQL document structure',
				],
			},
			{
				time: '9:30 AM - 10:20 AM',
				title: 'NoSQL Types & CAP Theorem',
				type: 'theory',
				topics: [
					'Key-Value databases (Redis, DynamoDB)',
					'Document databases (MongoDB, CouchDB)',
					'Column-family databases (Cassandra, HBase)',
					'Graph databases (Neo4j, ArangoDB)',
					'CAP Theorem explained',
				],
			},
			{
				time: '10:20 AM - 10:40 AM',
				title: 'NoSQL Architecture (Sharding & Replica Sets)',
				type: 'theory',
				topics: [
					'Horizontal scaling with sharding',
					'High availability with replica sets',
					'MongoDB cluster architecture',
					'Data distribution strategies',
				],
			},
			{
				time: '10:40 AM - 11:50 AM',
				title: 'MongoDB Basics & First Hands-on',
				type: 'hands-on',
				topics: [
					'Installing MongoDB and Mongo Shell',
					'MongoDB document structure',
					'Database → Collection → Document hierarchy',
					'Basic CRUD operations',
					'Query operators and filters',
				],
			},
		],
	},
	day2: {
		title: 'Day 2: Advanced MongoDB & Real-World Applications',
		sessions: [
			{
				time: '9:00 AM - 10:30 AM',
				title: 'Advanced Querying',
				type: 'hands-on',
				topics: [
					'Complex query operators',
					'Regular expressions in queries',
					'Array and embedded document queries',
					'Geospatial queries',
				],
			},
			{
				time: '11:00 AM - 12:30 PM',
				title: 'Aggregation Framework',
				type: 'theory',
				topics: [
					'Aggregation pipeline concepts',
					'Common aggregation stages',
					'Data transformation techniques',
					'Performance optimization',
				],
			},
			{
				time: '1:30 PM - 3:00 PM',
				title: 'Indexing & Performance',
				type: 'hands-on',
				topics: [
					'Index types and creation',
					'Query optimization',
					'Explain plans and profiling',
					'Compound and partial indexes',
				],
			},
			{
				time: '3:30 PM - 5:00 PM',
				title: 'Real-World Project',
				type: 'project',
				topics: [
					'Building a complete application',
					'Schema design for e-commerce',
					'Implementing user authentication',
					'Deployment and monitoring',
				],
			},
		],
	},
};

export default function CourseOverview() {
	const [activeDay, setActiveDay] = useState<'day1' | 'day2'>('day1');
	const [expandedSession, setExpandedSession] = useState<number | null>(0);

	const getSessionIcon = (type: string) => {
		switch (type) {
			case 'theory':
				return <BookOpen className='w-5 h-5' />;
			case 'hands-on':
				return <Terminal className='w-5 h-5' />;
			case 'project':
				return <Trophy className='w-5 h-5' />;
			default:
				return <Users className='w-5 h-5' />;
		}
	};

	const getSessionColor = (type: string) => {
		switch (type) {
			case 'theory':
				return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
			case 'hands-on':
				return 'bg-[#13AA52]/10 text-[#13AA52]';
			case 'project':
				return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
			default:
				return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
		}
	};

	return (
		<section
			id='overview'
			className='py-24 bg-white dark:bg-gray-900'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
						Course Overview
					</h2>
					<p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
						A comprehensive 2-day journey through NoSQL concepts and MongoDB
						mastery
					</p>
				</motion.div>

				{/* Day Selector */}
				<div className='flex justify-center mb-12'>
					<div className='bg-gray-100 dark:bg-gray-800 p-1 rounded-xl'>
						{Object.entries(courseData).map(([day, data]) => (
							<button
								key={day}
								onClick={() => setActiveDay(day as 'day1' | 'day2')}
								className={`px-6 py-3 rounded-lg font-semibold transition-all ${
									activeDay === day
										? 'bg-[#13AA52] text-white shadow-lg'
										: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
								}`}>
								{day === 'day1' ? 'Day 1' : 'Day 2'}
							</button>
						))}
					</div>
				</div>

				<AnimatePresence mode='wait'>
					<motion.div
						key={activeDay}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
						className='max-w-4xl mx-auto'>
						<div className='bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-8'>
							<h3 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4'>
								{courseData[activeDay].title}
							</h3>
						</div>

						<div className='space-y-4'>
							{courseData[activeDay].sessions.map((session, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700'>
									<button
										onClick={() =>
											setExpandedSession(
												expandedSession === index ? null : index
											)
										}
										className='w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'>
										<div className='flex items-center space-x-4'>
											<div
												className={`p-3 rounded-lg ${getSessionColor(
													session.type
												)}`}>
												{getSessionIcon(session.type)}
											</div>
											<div>
												<h4 className='text-lg font-semibold text-gray-900 dark:text-white'>
													{session.title}
												</h4>
												<p className='text-sm text-gray-500 dark:text-gray-400'>
													{session.time}
												</p>
											</div>
										</div>
										<motion.div
											animate={{ rotate: expandedSession === index ? 180 : 0 }}
											transition={{ duration: 0.2 }}>
											<ChevronDown className='w-5 h-5 text-gray-400' />
										</motion.div>
									</button>

									<AnimatePresence>
										{expandedSession === index && (
											<motion.div
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: 'auto', opacity: 1 }}
												exit={{ height: 0, opacity: 0 }}
												transition={{ duration: 0.3 }}
												className='border-t border-gray-200 dark:border-gray-700'>
												<div className='p-6 bg-gray-50 dark:bg-gray-700/50'>
													<h5 className='font-semibold text-gray-900 dark:text-white mb-3'>
														What you'll learn:
													</h5>
													<ul className='space-y-2 mb-6'>
														{session.topics.map((topic, topicIndex) => (
															<motion.li
																key={topicIndex}
																initial={{ opacity: 0, x: -10 }}
																animate={{ opacity: 1, x: 0 }}
																transition={{ delay: topicIndex * 0.1 }}
																className='flex items-center space-x-3 text-gray-700 dark:text-gray-300'>
																<div className='w-2 h-2 bg-[#13AA52] rounded-full flex-shrink-0' />
																<span>{topic}</span>
															</motion.li>
														))}
													</ul>
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</motion.div>
							))}
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</section>
	);
}
