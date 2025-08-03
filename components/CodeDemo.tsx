'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
	oneDark,
	oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from './ThemeProvider';
import { Database, Copy, Play, Terminal } from 'lucide-react';

const demoQueries = [
	{
		title: 'Insert Document',
		description: 'Create a new user document',
		code: `db.users.insertOne({
  name: "Alice Johnson",
  email: "alice@example.com",
  age: 28,
  skills: ["JavaScript", "Python", "MongoDB"],
  createdAt: new Date()
})`,
		result: `{
  "acknowledged": true,
  "insertedId": ObjectId("60d5ec49f1b2c72b2c123456")
}`,
	},
	{
		title: 'Find with Filters',
		description: 'Query users by age and skills',
		code: `db.users.find({
  age: { $gte: 25 },
  skills: { $in: ["MongoDB", "JavaScript"] }
}).pretty()`,
		result: `[
  {
    "_id": ObjectId("60d5ec49f1b2c72b2c123456"),
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "age": 28,
    "skills": ["JavaScript", "Python", "MongoDB"],
    "createdAt": ISODate("2021-06-25T10:30:00Z")
  }
]`,
	},
	{
		title: 'Aggregation Pipeline',
		description: 'Group users by age and count skills',
		code: `db.users.aggregate([
  {
    $group: {
      _id: "$age",
      totalUsers: { $sum: 1 },
      avgSkills: { $avg: { $size: "$skills" } }
    }
  },
  {
    $sort: { _id: 1 }
  }
])`,
		result: `[
  { "_id": 25, "totalUsers": 2, "avgSkills": 3 },
  { "_id": 28, "totalUsers": 1, "avgSkills": 3 },
  { "_id": 30, "totalUsers": 1, "avgSkills": 4 }
]`,
	},
	{
		title: 'Update with Array Operations',
		description: 'Add new skills to a user',
		code: `db.users.updateOne(
  { email: "alice@example.com" },
  {
    $addToSet: { 
      skills: { $each: ["React", "Node.js"] }
    },
    $set: { updatedAt: new Date() }
  }
)`,
		result: `{
  "acknowledged": true,
  "matchedCount": 1,
  "modifiedCount": 1
}`,
	},
];

export default function CodeDemo() {
	const [activeQuery, setActiveQuery] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const { theme } = useTheme();

	const runQuery = () => {
		setIsRunning(true);
		setTimeout(() => setIsRunning(false), 1500);
	};

	const copyCode = () => {
		navigator.clipboard.writeText(demoQueries[activeQuery].code);
	};

	return (
		<section
			id='demo'
			className='py-24 bg-gray-50 dark:bg-gray-800'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className='text-center mb-16'>
					<h2 className='text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
						Interactive MongoDB Demo
					</h2>
					<p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
						Try out real MongoDB queries and see the results in action
					</p>
				</motion.div>

				<div className='max-w-6xl mx-auto'>
					<div className='grid lg:grid-cols-2 gap-8'>
						{/* Query Selector */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className='space-y-4'>
							<h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
								Choose a Query
							</h3>
							{demoQueries.map((query, index) => (
								<motion.button
									key={index}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => setActiveQuery(index)}
									className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
										activeQuery === index
											? 'border-[#13AA52] bg-[#13AA52]/5 dark:bg-[#13AA52]/10'
											: 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-[#13AA52]/50'
									}`}>
									<h4 className='font-semibold text-gray-900 dark:text-white mb-1'>
										{query.title}
									</h4>
									<p className='text-sm text-gray-600 dark:text-gray-400'>
										{query.description}
									</p>
								</motion.button>
							))}
						</motion.div>

						{/* Code Editor */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className='space-y-6'>
							{/* Terminal Header */}
							<div className='bg-gray-900 dark:bg-gray-950 rounded-t-xl'>
								<div className='flex items-center justify-between px-4 py-3 border-b border-gray-700'>
									<div className='flex items-center space-x-3'>
										<div className='flex space-x-2'>
											<div className='w-3 h-3 bg-red-500 rounded-full' />
											<div className='w-3 h-3 bg-yellow-500 rounded-full' />
											<div className='w-3 h-3 bg-green-500 rounded-full' />
										</div>
										<div className='flex items-center space-x-2 text-gray-300'>
											<Terminal className='w-4 h-4' />
											<span className='text-sm font-mono'>MongoDB Shell</span>
										</div>
									</div>
									<div className='flex items-center space-x-2'>
										<button
											onClick={copyCode}
											className='p-1 hover:bg-gray-700 rounded transition-colors'>
											<Copy className='w-4 h-4 text-gray-400' />
										</button>
										<button
											onClick={runQuery}
											disabled={isRunning}
											className='flex items-center space-x-1 px-3 py-1 bg-[#13AA52] hover:bg-[#0F8A42] rounded text-white text-sm font-medium transition-colors disabled:opacity-50'>
											<Play className='w-3 h-3' />
											<span>{isRunning ? 'Running...' : 'Run'}</span>
										</button>
									</div>
								</div>
							</div>

							{/* Code */}
							<div className='bg-gray-900 dark:bg-gray-950 rounded-b-xl overflow-hidden'>
								<SyntaxHighlighter
									language='javascript'
									style={theme === 'dark' ? oneDark : oneDark}
									customStyle={{
										margin: 0,
										padding: '1.5rem',
										background: 'transparent',
										fontSize: '14px',
									}}>
									{demoQueries[activeQuery].code}
								</SyntaxHighlighter>
							</div>

							{/* Result */}
							<motion.div
								key={activeQuery}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								className='bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden'>
								<div className='flex items-center space-x-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
									<Database className='w-4 h-4 text-[#13AA52]' />
									<span className='text-sm font-medium text-gray-700 dark:text-gray-300'>
										Result
									</span>
									{isRunning && (
										<motion.div
											animate={{ rotate: 360 }}
											transition={{
												duration: 1,
												repeat: Infinity,
												ease: 'linear',
											}}
											className='w-4 h-4 border-2 border-[#13AA52] border-t-transparent rounded-full'
										/>
									)}
								</div>
								<SyntaxHighlighter
									language='json'
									style={theme === 'dark' ? oneDark : oneLight}
									customStyle={{
										margin: 0,
										padding: '1.5rem',
										background: 'transparent',
										fontSize: '14px',
									}}>
									{demoQueries[activeQuery].result}
								</SyntaxHighlighter>
							</motion.div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
