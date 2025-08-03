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
				time: '9:00 AM - 10:30 AM',
				title: 'Introduction to NoSQL',
				type: 'theory',
				topics: [
					'What is NoSQL and why use it?',
					'NoSQL vs SQL databases',
					'Types of NoSQL databases',
					'CAP theorem and ACID properties',
				],
			},
			{
				time: '10:30 AM - 11:00 AM',
				title: 'NoSQL Types & CAP Theorem',
				type: 'theory',
				topics: [
					'Key-Value databases (Redis, DynamoDB)',
					'Document databases (MongoDB, CouchDB)',
					'Column-family databases (Cassandra, HBase)',
					'Graph databases (Neo4j, ArangoDB)',
					'CAP Theorem explained',
				],
				detailedContent: {
					nosqlTypes: {
						title: 'The Four Types of NoSQL Databases',
						description:
							'NoSQL databases are categorized into four main types, each designed for specific use cases:',
						types: [
							{
								name: 'Key-Value Stores',
								icon: '🔑',
								description:
									'Simplest NoSQL database type that stores data as key-value pairs.',
								examples: ['Redis', 'DynamoDB', 'Memcached'],
								useCases: ['Caching', 'Session storage', 'Real-time analytics'],
								code: `// Redis Example
SET user:123 "John Doe"
GET user:123
// Returns: "John Doe"`,
								pros: [
									'Fastest performance',
									'Simple to use',
									'Highly scalable',
								],
								cons: [
									'Limited query capabilities',
									'No complex relationships',
								],
							},
							{
								name: 'Document Databases',
								icon: '📄',
								description:
									'Store data in flexible, JSON-like documents with nested structures.',
								examples: ['MongoDB', 'CouchDB', 'Firebase Firestore'],
								useCases: [
									'Content management',
									'E-commerce catalogs',
									'User profiles',
								],
								code: `// MongoDB Example
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York"
  },
  "hobbies": ["reading", "gaming"]
}`,
								pros: [
									'Flexible schema',
									'Rich queries',
									'Natural data modeling',
								],
								cons: ['Complex transactions', 'Larger storage overhead'],
							},
							{
								name: 'Column-Family Stores',
								icon: '📊',
								description:
									'Store data in columns rather than rows, optimized for analytical queries.',
								examples: ['Cassandra', 'HBase', 'ScyllaDB'],
								useCases: [
									'Time-series data',
									'IoT applications',
									'Big data analytics',
								],
								code: `// Cassandra Example
CREATE TABLE sensor_data (
  sensor_id text,
  timestamp timestamp,
  temperature float,
  humidity float,
  PRIMARY KEY (sensor_id, timestamp)
);`,
								pros: [
									'Excellent for analytics',
									'Highly scalable',
									'Fast writes',
								],
								cons: ['Complex setup', 'Limited ACID support'],
							},
							{
								name: 'Graph Databases',
								icon: '🕸️',
								description:
									'Store data as nodes and relationships, perfect for complex connections.',
								examples: ['Neo4j', 'ArangoDB', 'Amazon Neptune'],
								useCases: [
									'Social networks',
									'Recommendation engines',
									'Fraud detection',
								],
								code: `// Neo4j Example
CREATE (john:Person {name: "John"})
CREATE (jane:Person {name: "Jane"})
CREATE (john)-[:FRIENDS_WITH]->(jane)
MATCH (a:Person)-[:FRIENDS_WITH]->(b:Person)
RETURN a.name, b.name`,
								pros: [
									'Excellent for relationships',
									'Complex queries',
									'Natural for networks',
								],
								cons: ['Slower for simple queries', 'Higher complexity'],
							},
						],
					},
					capTheorem: {
						title: 'CAP Theorem Explained',
						description:
							'The CAP theorem is a fundamental concept in distributed systems that states a distributed database can only guarantee two out of three properties:',
						overview:
							'🟢 Think of it as a triangle where you can only choose two corners.',
						properties: [
							{
								name: 'Consistency (C)',
								icon: '🔄',
								description: 'All nodes see the same data at the same time',
								detailed:
									'When you write data to one node, all other nodes immediately see the updated data. Like having synchronized clocks across all servers.',
								example:
									'Banking systems where account balance must be consistent across all branches.',
							},
							{
								name: 'Availability (A)',
								icon: '⚡',
								description: 'Every request receives a response',
								detailed:
									'The system continues to operate and respond to requests even when some nodes are down or unreachable.',
								example:
									'Social media platforms that continue working even if some servers fail.',
							},
							{
								name: 'Partition Tolerance (P)',
								icon: '🌐',
								description:
									'System continues to operate despite network failures',
								detailed:
									'The system can handle network partitions (communication failures between nodes) and continue functioning.',
								example:
									'Global applications that work even when internet connections between data centers are interrupted.',
							},
						],
						combinations: [
							{
								name: 'CP (Consistency + Partition Tolerance)',
								description:
									'Sacrifices availability for consistency and partition tolerance',
								example:
									'Traditional relational databases in distributed setups',
							},
							{
								name: 'AP (Availability + Partition Tolerance)',
								description:
									'Sacrifices consistency for availability and partition tolerance',
								example: 'MongoDB, Cassandra, DynamoDB',
							},
							{
								name: 'CA (Consistency + Availability)',
								description:
									'Sacrifices partition tolerance for consistency and availability',
								example: 'Single-node databases, traditional RDBMS',
							},
						],
					},
				},
			},
			{
				time: '11:00 AM - 11:30 AM',
				title: 'MongoDB Installation & Setup',
				type: 'hands-on',
				topics: [
					'Installing MongoDB Community Server',
					'MongoDB Compass setup',
					'Basic MongoDB shell commands',
					'Understanding MongoDB architecture',
				],
			},
			{
				time: '11:15 AM - 11:45 AM',
				title: 'Documents & Collections',
				type: 'theory',
				topics: [
					'BSON vs JSON',
					'Document structure and validation',
					'Collection design patterns',
					'Data modeling best practices',
				],
			},
			{
				time: '11:45 AM - 12:30 PM',
				title: 'Basic CRUD Operations',
				type: 'hands-on',
				topics: [
					'Insert operations (insertOne, insertMany)',
					'Find operations and query selectors',
					'Update operations (updateOne, updateMany)',
					'Delete operations and bulk writes',
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

													{/* Detailed Content for Session 2 */}
													{session.detailedContent && (
														<div className='space-y-6'>
															{/* NoSQL Types */}
															{session.detailedContent.nosqlTypes && (
																<div className='bg-white dark:bg-gray-600 rounded-lg p-4'>
																	<h6 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
																		{session.detailedContent.nosqlTypes.title}
																	</h6>
																	<p className='text-gray-600 dark:text-gray-300 mb-4'>
																		{
																			session.detailedContent.nosqlTypes
																				.description
																		}
																	</p>

																	<div className='grid md:grid-cols-2 gap-4'>
																		{session.detailedContent.nosqlTypes.types.map(
																			(type, typeIndex) => (
																				<div
																					key={typeIndex}
																					className='border border-gray-200 dark:border-gray-500 rounded-lg p-3'>
																					<div className='flex items-center gap-2 mb-2'>
																						<span className='text-xl'>
																							{type.icon}
																						</span>
																						<h6 className='text-[#13AA52] font-semibold text-sm'>
																							{type.name}
																						</h6>
																					</div>
																					<p className='text-gray-600 dark:text-gray-300 text-xs mb-2'>
																						{type.description}
																					</p>

																					<div className='mb-2'>
																						<h6 className='text-blue-600 dark:text-blue-400 font-semibold text-xs mb-1'>
																							Examples:
																						</h6>
																						<p className='text-gray-600 dark:text-gray-300 text-xs'>
																							{type.examples.join(', ')}
																						</p>
																					</div>

																					<div className='mb-2'>
																						<h6 className='text-blue-600 dark:text-blue-400 font-semibold text-xs mb-1'>
																							Use Cases:
																						</h6>
																						<p className='text-gray-600 dark:text-gray-300 text-xs'>
																							{type.useCases.join(', ')}
																						</p>
																					</div>

																					<SyntaxHighlighter
																						language='javascript'
																						style={tomorrow}
																						customStyle={{
																							background: 'transparent',
																							fontSize: '10px',
																							borderRadius: '4px',
																							margin: '8px 0',
																						}}>
																						{type.code}
																					</SyntaxHighlighter>

																					<div className='grid grid-cols-2 gap-2'>
																						<div>
																							<h6 className='text-green-600 dark:text-green-400 font-semibold text-xs mb-1'>
																								Pros:
																							</h6>
																							<ul className='text-gray-600 dark:text-gray-300 text-xs space-y-1'>
																								{type.pros.map(
																									(pro, proIndex) => (
																										<li key={proIndex}>
																											• {pro}
																										</li>
																									)
																								)}
																							</ul>
																						</div>
																						<div>
																							<h6 className='text-red-600 dark:text-red-400 font-semibold text-xs mb-1'>
																								Cons:
																							</h6>
																							<ul className='text-gray-600 dark:text-gray-300 text-xs space-y-1'>
																								{type.cons.map(
																									(con, conIndex) => (
																										<li key={conIndex}>
																											• {con}
																										</li>
																									)
																								)}
																							</ul>
																						</div>
																					</div>
																				</div>
																			)
																		)}
																	</div>
																</div>
															)}

															{/* CAP Theorem */}
															{session.detailedContent.capTheorem && (
																<div className='bg-white dark:bg-gray-600 rounded-lg p-4'>
																	<h6 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
																		{session.detailedContent.capTheorem.title}
																	</h6>
																	<p className='text-gray-600 dark:text-gray-300 mb-2'>
																		{
																			session.detailedContent.capTheorem
																				.description
																		}
																	</p>
																	<p className='text-gray-600 dark:text-gray-300 mb-4 italic'>
																		{
																			session.detailedContent.capTheorem
																				.overview
																		}
																	</p>

																	<div className='grid md:grid-cols-3 gap-3 mb-4'>
																		{session.detailedContent.capTheorem.properties.map(
																			(prop, propIndex) => (
																				<div
																					key={propIndex}
																					className='border border-gray-200 dark:border-gray-500 rounded p-3'>
																					<div className='flex items-center gap-2 mb-2'>
																						<span className='text-lg'>
																							{prop.icon}
																						</span>
																						<h6 className='text-[#13AA52] font-semibold text-sm'>
																							{prop.name}
																						</h6>
																					</div>
																					<p className='text-gray-600 dark:text-gray-300 text-xs mb-1'>
																						{prop.description}
																					</p>
																					<p className='text-gray-600 dark:text-gray-300 text-xs mb-2'>
																						{prop.detailed}
																					</p>
																					<p className='text-blue-600 dark:text-blue-400 text-xs italic'>
																						Example: {prop.example}
																					</p>
																				</div>
																			)
																		)}
																	</div>

																	<div className='bg-gray-50 dark:bg-gray-500 rounded p-3'>
																		<h6 className='text-blue-600 dark:text-blue-400 font-semibold text-sm mb-2'>
																			CAP Combinations:
																		</h6>
																		<div className='grid md:grid-cols-3 gap-2'>
																			{session.detailedContent.capTheorem.combinations.map(
																				(combo, comboIndex) => (
																					<div
																						key={comboIndex}
																						className='border border-gray-200 dark:border-gray-400 rounded p-2'>
																						<h6 className='text-[#13AA52] font-semibold text-xs mb-1'>
																							{combo.name}
																						</h6>
																						<p className='text-gray-600 dark:text-gray-300 text-xs mb-1'>
																							{combo.description}
																						</p>
																						<p className='text-blue-600 dark:text-blue-400 text-xs'>
																							Example: {combo.example}
																						</p>
																					</div>
																				)
																			)}
																		</div>
																	</div>
																</div>
															)}
														</div>
													)}
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
