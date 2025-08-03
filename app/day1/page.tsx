'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
	ChevronDown,
	Database,
	Server,
	Code,
	Play,
	ArrowRight,
	CheckCircle,
	Clock,
	Globe,
	Coffee,
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Day1Page() {
	const [mounted, setMounted] = useState(false);
	const [activeSession, setActiveSession] = useState<number | null>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const scrollToContent = () => {
		document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
	};

	const sessions = [
		{
			id: 1,
			title: 'Introduction to NoSQL',
			duration: '30 min',
			icon: <Database className='w-6 h-6' />,
			content: {
				description:
					'Understanding the fundamentals of NoSQL databases and why they emerged as an alternative to traditional RDBMS.',
				topics: [
					'What is NoSQL and why it emerged',
					'Comparison with traditional RDBMS',
					'Real-world use cases and examples',
					'SQL vs NoSQL document structure',
				],
				detailedTopics: {
					whatIsNoSQL: {
						title: 'What is NoSQL and Why It Emerged',
						description:
							'NoSQL stands for "Not Only SQL". It refers to a category of databases designed to handle:',
						features: [
							'Unstructured or semi-structured data',
							'Large volumes of rapidly changing data',
							'Flexible schemas (no strict tables and columns)',
						],
						whyEmerged: {
							title: 'Why NoSQL emerged:',
							description:
								'Traditional Relational Databases (RDBMS) like MySQL and PostgreSQL store data in fixed rows and columns. This works well for structured data like financial records.',
							modernChallenges:
								'But in modern applications (like social media, e-commerce, IoT), data can be messy, fast-changing, and huge in volume.',
							solutions: [
								'Handling Big Data',
								'Scaling horizontally (across many machines)',
								'Faster development with flexible data structures',
								'Looser schema definition',
							],
							characteristics: [
								'Applications written to deal with specific documents/data',
								'Applications aware of the schema definition as opposed to the data',
								'Designed to handle distributed, large databases',
								'Trade offs: No strong support for ad hoc queries but designed for speed and growth of database',
								'Query language through the API',
								'Relaxation of the ACID properties',
							],
						},
					},
					realWorldUseCases: {
						title: 'Real-World Use Cases and Examples',
						cases: [
							{
								title: '📱 Social Media',
								description:
									'Platforms like Facebook or Twitter store millions of posts, comments, likes—all with different formats.',
								example:
									"A post might have text, images, videos, links—this fits well with NoSQL's flexible document model.",
							},
							{
								title: '🛒 E-Commerce',
								description:
									'Each product may have different attributes: size, color, warranty, etc.',
								example:
									'Instead of forcing a table structure, you can store each product as a document with only the fields it needs.',
							},
							{
								title: '🌐 IoT and Sensor Data',
								description:
									'Devices send data in real-time, often in different formats and frequency.',
								example:
									'NoSQL handles this streaming, high-volume, schema-less data easily.',
							},
						],
					},
					sqlVsNosql: {
						title: 'SQL vs NoSQL Document Structure',
						sqlExample: {
							title: '🧱 SQL Example (User in RDBMS)',
							code: `-- Table: Users
+----+----------+-------+
| ID | Name     | Age   |
+----+----------+-------+
| 1  | Ali      | 25    |
+----+----------+-------+`,
						},
						nosqlExample: {
							title: '📄 NoSQL Example (User Document in MongoDB)',
							code: `{
  "_id": 1,
  "name": "Ali",
  "age": 25,
  "hobbies": ["football", "reading"],
  "address": {
    "city": "Cairo",
    "zip": "12345"
  }
}`,
						},
					},
				},
				example: {
					title: 'SQL Table vs MongoDB Document',
					sql: `CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  age INT,
  city VARCHAR(100)
);

INSERT INTO users VALUES (1, 'Ali', 'ali@email.com', 25, 'Cairo');`,
					nosql: `{
  "_id": ObjectId("..."),
  "name": "Ali",
  "email": "ali@email.com", 
  "age": 25,
  "city": "Cairo",
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}`,
				},
			},
		},
		{
			id: 2,
			title: 'NoSQL Types & CAP Theorem',
			duration: '50 min',
			icon: <Globe className='w-6 h-6' />,
			content: {
				description:
					'Exploring the four main types of NoSQL databases and understanding the CAP theorem fundamentals.',
				topics: [
					'Key-Value databases (Redis, DynamoDB)',
					'Document databases (MongoDB, CouchDB)',
					'Column-family databases (Cassandra, HBase)',
					'Graph databases (Neo4j, ArangoDB)',
					'CAP Theorem explained',
				],
				detailedTopics: {
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
								code: `// Consistent System
Node A: Balance = $1000
Node B: Balance = $1000  ✅ Same data
Node C: Balance = $1000

// Inconsistent System
Node A: Balance = $1000
Node B: Balance = $950   ❌ Different data
Node C: Balance = $1050`,
							},
							{
								name: 'Availability (A)',
								icon: '⚡',
								description: 'Every request receives a response',
								detailed:
									'The system continues to operate and respond to requests even when some nodes are down or unreachable.',
								example:
									'Social media platforms that continue working even if some servers fail.',
								code: `// Available System
User Request → Server 1 (down) → Server 2 ✅ Response
User Request → Server 2 (down) → Server 3 ✅ Response

// Unavailable System
User Request → Server 1 (down) → ❌ No Response
User Request → Server 2 (down) → ❌ No Response`,
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
								code: `// Partition Tolerant
Network Split: A-B | C-D
Group A-B: Continues working ✅
Group C-D: Continues working ✅

// Not Partition Tolerant
Network Split: A-B | C-D
Entire System: Stops working ❌`,
							},
						],
						combinations: [
							{
								name: 'CP (Consistency + Partition Tolerance)',
								description:
									'Sacrifices availability for consistency and partition tolerance',
								example:
									'Traditional relational databases in distributed setups',
								scenario:
									'When network partition occurs, the system stops accepting writes to maintain consistency',
							},
							{
								name: 'AP (Availability + Partition Tolerance)',
								description:
									'Sacrifices consistency for availability and partition tolerance',
								example: 'MongoDB, Cassandra, DynamoDB',
								scenario:
									'System continues accepting requests but may return stale data during partitions',
							},
							{
								name: 'CA (Consistency + Availability)',
								description:
									'Sacrifices partition tolerance for consistency and availability',
								example: 'Single-node databases, traditional RDBMS',
								scenario:
									'Cannot handle network partitions - requires all nodes to be connected',
							},
						],
					},
				},
			},
		},
		{
			id: 3,
			title: 'NoSQL Architecture (Sharding & Replica Sets)',
			duration: '20 min',
			icon: <Server className='w-6 h-6' />,
			content: {
				description:
					"Understanding distributed database architecture concepts and MongoDB's implementation.",
				topics: [
					'Horizontal scaling with sharding',
					'High availability with replica sets',
					'MongoDB cluster architecture',
					'Data distribution strategies',
				],
				detailedTopics: {
					sharding: {
						title: 'Sharding: Horizontal Scaling',
						description:
							"Sharding is MongoDB's approach to horizontal scaling, distributing data across multiple machines to handle large datasets and high throughput.",
						overview:
							'🟢 Think of sharding as dividing a large library into multiple smaller libraries, each containing different books.',
						components: [
							{
								name: 'Mongos (Query Router)',
								icon: '🚦',
								description: 'Acts as the entry point for all client requests',
								role: 'Routes queries to appropriate shards and aggregates results',
								example:
									'Like a traffic controller directing cars to different lanes',
							},
							{
								name: 'Config Servers',
								icon: '🗺️',
								description: 'Store metadata about the cluster',
								role: 'Keep track of which data is stored on which shard',
								example: 'Like a map showing which books are in which library',
							},
							{
								name: 'Shard Servers',
								icon: '📚',
								description: 'Store the actual data',
								role: 'Each shard contains a subset of the total data',
								example:
									'Individual libraries containing specific book categories',
							},
						],
						shardingStrategies: [
							{
								name: 'Range-based Sharding',
								description: 'Data is partitioned based on a range of values',
								example: 'User IDs 1-1000 on Shard A, 1001-2000 on Shard B',
								pros: ['Simple to understand', 'Good for range queries'],
								cons: ['Can lead to uneven distribution'],
							},
							{
								name: 'Hash-based Sharding',
								description: 'Data is distributed using a hash function',
								example: 'Hash of user ID determines which shard gets the data',
								pros: ['Even distribution', 'Predictable performance'],
								cons: ['Range queries may hit multiple shards'],
							},
						],
						code: `// Sharding Configuration Example
// Enable sharding for a database
sh.enableSharding("myapp")

// Shard a collection based on user_id
sh.shardCollection("myapp.users", {"user_id": 1})

// Add shards to the cluster
sh.addShard("shard1/shard1.example.com:27018")
sh.addShard("shard2/shard2.example.com:27018")`,
					},
					replicaSets: {
						title: 'Replica Sets: High Availability',
						description:
							'A replica set is a group of MongoDB servers that maintain the same data set, providing redundancy and high availability.',
						overview:
							'🟢 Think of replica sets as having multiple copies of the same book in different locations.',
						architecture: {
							primary: {
								name: 'Primary Node',
								icon: '👑',
								description:
									'The main server that handles all write operations',
								role: 'Receives all write requests and replicates changes to secondaries',
								example: 'The main library that accepts new book donations',
							},
							secondary: {
								name: 'Secondary Nodes',
								icon: '📖',
								description:
									"Servers that maintain copies of the primary's data",
								role: 'Handle read operations and can become primary if needed',
								example:
									'Branch libraries with copies of books from the main library',
							},
							arbiter: {
								name: 'Arbiter Node',
								icon: '⚖️',
								description: "Participates in elections but doesn't hold data",
								role: 'Breaks ties in primary elections',
								example:
									'A referee that helps decide which library becomes the main one',
							},
						},
						benefits: [
							{
								name: 'High Availability',
								description: 'Automatic failover if primary goes down',
								example:
									'If main library burns down, a branch library takes over',
							},
							{
								name: 'Data Redundancy',
								description: 'Multiple copies protect against data loss',
								example: 'Having backup copies of important documents',
							},
							{
								name: 'Disaster Recovery',
								description: 'Geographic distribution for disaster protection',
								example:
									'Libraries in different cities to survive natural disasters',
							},
							{
								name: 'Read Scaling',
								description:
									'Distribute read operations across multiple servers',
								example:
									'Multiple librarians helping different readers simultaneously',
							},
						],
						code: `// Replica Set Configuration
// Initialize replica set
rs.initiate({
  _id: "myReplicaSet",
  members: [
    { _id: 0, host: "server1:27017" },
    { _id: 1, host: "server2:27017" },
    { _id: 2, host: "server3:27017" }
  ]
})

// Check replica set status
rs.status()

// Force election of new primary
rs.freeze(30)  // Freeze current primary for 30 seconds`,
					},
					realWorldExample: {
						title: 'Real-World Architecture Example',
						description:
							'How a large e-commerce platform might use MongoDB sharding and replica sets:',
						scenario: 'An online store with millions of users and products',
						architecture: {
							sharding: {
								title: 'Sharding Strategy',
								description: 'Shard by user_id for even distribution',
								shards: [
									'Shard 1: Users A-F (20% of data)',
									'Shard 2: Users G-M (25% of data)',
									'Shard 3: Users N-S (30% of data)',
									'Shard 4: Users T-Z (25% of data)',
								],
							},
							replication: {
								title: 'Replication Strategy',
								description:
									'3-node replica set per shard for high availability',
								layout: [
									'Primary: Handles all writes',
									'Secondary 1: Read replicas, backup',
									'Secondary 2: Read replicas, disaster recovery',
								],
							},
						},
						benefits: [
							'Can handle millions of users',
							'99.99% uptime with automatic failover',
							'Geographic distribution for global users',
							'Horizontal scaling as user base grows',
						],
					},
				},
			},
		},
		{
			id: 4,
			title: 'MongoDB Basics & First Hands-on',
			duration: '1 hr 10 min',
			icon: <Code className='w-6 h-6' />,
			content: {
				description:
					'Getting started with MongoDB: understanding the structure and performing basic CRUD operations.',
				topics: [
					'Installing MongoDB and Mongo Shell',
					'MongoDB document structure',
					'Database → Collection → Document hierarchy',
					'Basic CRUD operations',
					'Query operators and filters',
				],
				installation: {
					title: 'Installing MongoDB and Mongo Shell',
					description:
						'Follow these instructions to install MongoDB and Mongo Shell on your operating system.',
					windows: {
						title: 'Windows Installation',
						steps: [
							'Download MongoDB Community Server from the official website',
							'Run the installer and follow the setup wizard',
							'Choose "Complete" installation type',
							'Install MongoDB Compass (GUI tool) when prompted',
							'Add MongoDB to your system PATH',
							'Download and install MongoDB Shell separately',
						],
						commands: `# Download MongoDB Community Server
# Visit: https://www.mongodb.com/try/download/community

# Download MongoDB Shell
# Visit: https://www.mongodb.com/try/download/shell

# Add to PATH (if not done automatically)
# C:\\Program Files\\MongoDB\\Server\\7.0\\bin

# Start MongoDB service
net start MongoDB

# Connect using MongoDB Shell
mongosh`,
					},
					linux: {
						title: 'Linux Installation (Ubuntu/Debian)',
						steps: [
							'Import MongoDB public GPG key',
							'Create a list file for MongoDB',
							'Update package database',
							'Install MongoDB packages',
							'Start and enable MongoDB service',
							'Install MongoDB Shell',
						],
						commands: `# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Create a list file for MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package database
sudo apt-get update

# Install MongoDB packages
sudo apt-get install -y mongodb-org

# Start and enable MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod

# Install MongoDB Shell
sudo apt-get install -y mongodb-mongosh

# Connect to MongoDB
mongosh`,
					},
					verification: {
						title: 'Verify Installation',
						steps: [
							'Check MongoDB service status',
							'Connect using MongoDB Shell',
							'Run a test command',
							'Create a test database',
						],
						commands: `# Check MongoDB status
sudo systemctl status mongod  # Linux
net start MongoDB             # Windows

# Connect to MongoDB
mongosh

# Test connection
show dbs

# Create and use a test database
use testdb
db.createCollection("test")
db.test.insertOne({name: "test", value: 123})
db.test.find()`,
					},
				},
				crud: {
					create: {
						title: 'Create Operations',
						code: `// Insert a single document
db.users.insertOne({
  name: "Ali",
  age: 25,
  city: "Cairo",
  email: "ali@email.com"
});

// Insert multiple documents
db.users.insertMany([
  { name: "Sara", age: 28, city: "Alexandria" },
  { name: "Ahmed", age: 32, city: "Giza" }
]);`,
					},
					read: {
						title: 'Read Operations',
						code: `// Find all documents
db.users.find();

// Find with filter
db.users.find({ age: { $gt: 20 } });

// Find one document
db.users.findOne({ name: "Ali" });

// Projection (select specific fields)
db.users.find({}, { name: 1, age: 1, _id: 0 });`,
					},
					update: {
						title: 'Update Operations',
						code: `// Update one document
db.users.updateOne(
  { name: "Ali" },
  { $set: { age: 26, city: "New Cairo" } }
);

// Update multiple documents
db.users.updateMany(
  { age: { $lt: 30 } },
  { $inc: { age: 1 } }
);`,
					},
					delete: {
						title: 'Delete Operations',
						code: `// Delete one document
db.users.deleteOne({ name: "Ali" });

// Delete multiple documents
db.users.deleteMany({ age: { $lt: 18 } });

// Delete all documents in collection
db.users.deleteMany({});`,
					},
				},
			},
		},
	];

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800'>
			<main>
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
							<h1 className='text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6'>
								Day 1
							</h1>
							<h2 className='text-3xl md:text-5xl font-bold text-[#13AA52] mb-8'>
								NoSQL Foundations & MongoDB Basics
							</h2>
							<p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
								Master the fundamentals of NoSQL databases, understand the CAP
								theorem, explore MongoDB architecture, and get hands-on with
								your first CRUD operations.
							</p>

							<motion.button
								onClick={scrollToContent}
								className='inline-flex items-center gap-2 bg-[#13AA52] hover:bg-[#0F8A42] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}>
								<ChevronDown className='w-5 h-5' />
								Explore Day 1 Content
							</motion.button>
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

				{/* Main Content */}
				<section
					id='content'
					className='py-20 px-4'>
					<div className='max-w-6xl mx-auto'>
						{/* Session Overview */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className='text-center mb-16'>
							<h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
								Today's Sessions
							</h3>
							<p className='text-gray-600 dark:text-gray-300 text-lg'>
								4 comprehensive sessions covering all NoSQL and MongoDB
								fundamentals
							</p>
						</motion.div>

						{/* Sessions */}
						<div className='space-y-8'>
							{sessions.map((session, index) => (
								<motion.div
									key={session.id}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: index * 0.1 }}
									viewport={{ once: true }}
									className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden'>
									{/* Session Header */}
									<div
										className='p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
										onClick={() =>
											setActiveSession(
												activeSession === session.id ? null : session.id
											)
										}>
										<div className='flex items-center justify-between'>
											<div className='flex items-center gap-4'>
												<div className='p-3 bg-[#13AA52]/20 rounded-xl text-[#13AA52]'>
													{session.icon}
												</div>
												<div>
													<h4 className='text-xl font-semibold text-gray-900 dark:text-white'>
														{session.title}
													</h4>
													<div className='flex items-center gap-4 mt-1'>
														<span className='flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm'>
															<Clock className='w-4 h-4' />
															{session.duration}
														</span>
														<span className='text-gray-500 dark:text-gray-400'>
															Session {session.id}
														</span>
													</div>
												</div>
											</div>
											<motion.div
												animate={{
													rotate: activeSession === session.id ? 180 : 0,
												}}
												transition={{ duration: 0.3 }}>
												<ChevronDown className='w-6 h-6 text-gray-400' />
											</motion.div>
										</div>
									</div>

									{/* Session Content */}
									<motion.div
										initial={false}
										animate={{
											height: activeSession === session.id ? 'auto' : 0,
											opacity: activeSession === session.id ? 1 : 0,
										}}
										transition={{ duration: 0.3 }}
										className='overflow-hidden'>
										<div className='px-6 pb-6 space-y-6'>
											<p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
												{session.content.description}
											</p>

											{/* Topics */}
											<div>
												<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>
													Key Topics:
												</h5>
												<ul className='space-y-2'>
													{session.content.topics.map((topic, topicIndex) => (
														<li
															key={topicIndex}
															className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
															<CheckCircle className='w-5 h-5 text-[#13AA52] mt-0.5 flex-shrink-0' />
															<span>{topic}</span>
														</li>
													))}
												</ul>
											</div>

											{/* Session-specific content */}
											{session.id === 1 && session.content.detailedTopics && (
												<div className='space-y-6'>
													{/* What is NoSQL */}
													<div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6'>
														<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
															{session.content.detailedTopics.whatIsNoSQL.title}
														</h5>
														<p className='text-gray-600 dark:text-gray-300 mb-4'>
															{
																session.content.detailedTopics.whatIsNoSQL
																	.description
															}
														</p>
														<ul className='list-disc list-inside space-y-2 mb-6'>
															{session.content.detailedTopics.whatIsNoSQL.features.map(
																(feature, index) => (
																	<li
																		key={index}
																		className='text-gray-600 dark:text-gray-300'>
																		{feature}
																	</li>
																)
															)}
														</ul>

														<div className='bg-white dark:bg-gray-600 rounded-lg p-4'>
															<h6 className='text-[#13AA52] font-semibold mb-3'>
																{
																	session.content.detailedTopics.whatIsNoSQL
																		.whyEmerged.title
																}
															</h6>
															<p className='text-gray-600 dark:text-gray-300 mb-3'>
																{
																	session.content.detailedTopics.whatIsNoSQL
																		.whyEmerged.description
																}
															</p>
															<p className='text-gray-600 dark:text-gray-300 mb-4'>
																{
																	session.content.detailedTopics.whatIsNoSQL
																		.whyEmerged.modernChallenges
																}
															</p>

															<div className='mb-4'>
																<h6 className='text-blue-600 dark:text-blue-400 font-semibold mb-2'>
																	NoSQL was created to solve issues like:
																</h6>
																<ul className='list-disc list-inside space-y-1'>
																	{session.content.detailedTopics.whatIsNoSQL.whyEmerged.solutions.map(
																		(solution, index) => (
																			<li
																				key={index}
																				className='text-gray-600 dark:text-gray-300 text-sm'>
																				{solution}
																			</li>
																		)
																	)}
																</ul>
															</div>

															<div>
																<h6 className='text-blue-600 dark:text-blue-400 font-semibold mb-2'>
																	Additional characteristics:
																</h6>
																<ul className='list-disc list-inside space-y-1'>
																	{session.content.detailedTopics.whatIsNoSQL.whyEmerged.characteristics.map(
																		(characteristic, index) => (
																			<li
																				key={index}
																				className='text-gray-600 dark:text-gray-300 text-sm'>
																				{characteristic}
																			</li>
																		)
																	)}
																</ul>
															</div>
														</div>
													</div>

													{/* Real World Use Cases */}
													<div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6'>
														<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
															{
																session.content.detailedTopics.realWorldUseCases
																	.title
															}
														</h5>
														<div className='space-y-4'>
															{session.content.detailedTopics.realWorldUseCases.cases.map(
																(useCase, index) => (
																	<div
																		key={index}
																		className='bg-white dark:bg-gray-600 rounded-lg p-4'>
																		<h6 className='text-[#13AA52] font-semibold mb-2'>
																			{useCase.title}
																		</h6>
																		<p className='text-gray-600 dark:text-gray-300 mb-2'>
																			{useCase.description}
																		</p>
																		<p className='text-gray-600 dark:text-gray-300 text-sm italic'>
																			{useCase.example}
																		</p>
																	</div>
																)
															)}
														</div>
													</div>

													{/* SQL vs NoSQL Structure */}
													<div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6'>
														<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
															{session.content.detailedTopics.sqlVsNosql.title}
														</h5>
														<div className='grid md:grid-cols-2 gap-6'>
															<div>
																<h6 className='text-[#13AA52] font-semibold mb-2'>
																	{
																		session.content.detailedTopics.sqlVsNosql
																			.sqlExample.title
																	}
																</h6>
																<SyntaxHighlighter
																	language='sql'
																	style={tomorrow}
																	customStyle={{
																		background: 'transparent',
																		fontSize: '14px',
																		borderRadius: '8px',
																	}}>
																	{
																		session.content.detailedTopics.sqlVsNosql
																			.sqlExample.code
																	}
																</SyntaxHighlighter>
															</div>
															<div>
																<h6 className='text-blue-600 dark:text-blue-400 font-semibold mb-2'>
																	{
																		session.content.detailedTopics.sqlVsNosql
																			.nosqlExample.title
																	}
																</h6>
																<SyntaxHighlighter
																	language='javascript'
																	style={tomorrow}
																	customStyle={{
																		background: 'transparent',
																		fontSize: '14px',
																		borderRadius: '8px',
																	}}>
																	{
																		session.content.detailedTopics.sqlVsNosql
																			.nosqlExample.code
																	}
																</SyntaxHighlighter>
															</div>
														</div>
													</div>
												</div>
											)}

											{session.id === 2 && session.content.detailedTopics && (
												<div className='space-y-6'>
													{/* NoSQL Types */}
													<div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6'>
														<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
															{session.content.detailedTopics.nosqlTypes.title}
														</h5>
														<p className='text-gray-600 dark:text-gray-300 mb-6'>
															{
																session.content.detailedTopics.nosqlTypes
																	.description
															}
														</p>

														<div className='grid md:grid-cols-2 gap-6'>
															{session.content.detailedTopics.nosqlTypes.types.map(
																(type, index) => (
																	<div
																		key={index}
																		className='bg-white dark:bg-gray-600 rounded-lg p-4'>
																		<div className='flex items-center gap-2 mb-3'>
																			<span className='text-2xl'>
																				{type.icon}
																			</span>
																			<h6 className='text-[#13AA52] font-semibold'>
																				{type.name}
																			</h6>
																		</div>
																		<p className='text-gray-600 dark:text-gray-300 text-sm mb-3'>
																			{type.description}
																		</p>

																		<div className='mb-3'>
																			<h6 className='text-blue-600 dark:text-blue-400 font-semibold text-sm mb-1'>
																				Examples:
																			</h6>
																			<p className='text-gray-600 dark:text-gray-300 text-sm'>
																				{type.examples.join(', ')}
																			</p>
																		</div>

																		<div className='mb-3'>
																			<h6 className='text-blue-600 dark:text-blue-400 font-semibold text-sm mb-1'>
																				Use Cases:
																			</h6>
																			<p className='text-gray-600 dark:text-gray-300 text-sm'>
																				{type.useCases.join(', ')}
																			</p>
																		</div>

																		<SyntaxHighlighter
																			language='javascript'
																			style={tomorrow}
																			customStyle={{
																				background: 'transparent',
																				fontSize: '12px',
																				borderRadius: '6px',
																			}}>
																			{type.code}
																		</SyntaxHighlighter>

																		<div className='grid grid-cols-2 gap-2 mt-3'>
																			<div>
																				<h6 className='text-green-600 dark:text-green-400 font-semibold text-xs mb-1'>
																					Pros:
																				</h6>
																				<ul className='text-gray-600 dark:text-gray-300 text-xs space-y-1'>
																					{type.pros.map((pro, proIndex) => (
																						<li key={proIndex}>• {pro}</li>
																					))}
																				</ul>
																			</div>
																			<div>
																				<h6 className='text-red-600 dark:text-red-400 font-semibold text-xs mb-1'>
																					Cons:
																				</h6>
																				<ul className='text-gray-600 dark:text-gray-300 text-xs space-y-1'>
																					{type.cons.map((con, conIndex) => (
																						<li key={conIndex}>• {con}</li>
																					))}
																				</ul>
																			</div>
																		</div>
																	</div>
																)
															)}
														</div>
													</div>

													{/* CAP Theorem */}
													<div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6'>
														<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
															{session.content.detailedTopics.capTheorem.title}
														</h5>
														<p className='text-gray-600 dark:text-gray-300 mb-2'>
															{
																session.content.detailedTopics.capTheorem
																	.description
															}
														</p>
														<p className='text-gray-600 dark:text-gray-300 mb-6 italic'>
															{
																session.content.detailedTopics.capTheorem
																	.overview
															}
														</p>

														<div className='grid md:grid-cols-3 gap-4 mb-6'>
															{session.content.detailedTopics.capTheorem.properties.map(
																(prop, propIndex) => (
																	<div
																		key={propIndex}
																		className='bg-white dark:bg-gray-600 rounded-lg p-4'>
																		<div className='flex items-center gap-2 mb-3'>
																			<span className='text-xl'>
																				{prop.icon}
																			</span>
																			<h6 className='text-[#13AA52] font-semibold'>
																				{prop.name}
																			</h6>
																		</div>
																		<p className='text-gray-600 dark:text-gray-300 text-sm mb-2'>
																			{prop.description}
																		</p>
																		<p className='text-gray-600 dark:text-gray-300 text-xs mb-3'>
																			{prop.detailed}
																		</p>
																		<p className='text-blue-600 dark:text-blue-400 text-xs mb-3 italic'>
																			Example: {prop.example}
																		</p>
																		<SyntaxHighlighter
																			language='javascript'
																			style={tomorrow}
																			customStyle={{
																				background: 'transparent',
																				fontSize: '11px',
																				borderRadius: '4px',
																			}}>
																			{prop.code}
																		</SyntaxHighlighter>
																	</div>
																)
															)}
														</div>

														<div className='bg-white dark:bg-gray-600 rounded-lg p-4'>
															<h6 className='text-blue-600 dark:text-blue-400 font-semibold mb-3'>
																CAP Combinations:
															</h6>
															<div className='grid md:grid-cols-3 gap-4'>
																{session.content.detailedTopics.capTheorem.combinations.map(
																	(combo, comboIndex) => (
																		<div
																			key={comboIndex}
																			className='border border-gray-200 dark:border-gray-500 rounded p-3'>
																			<h6 className='text-[#13AA52] font-semibold text-sm mb-2'>
																				{combo.name}
																			</h6>
																			<p className='text-gray-600 dark:text-gray-300 text-xs mb-2'>
																				{combo.description}
																			</p>
																			<p className='text-blue-600 dark:text-blue-400 text-xs mb-1'>
																				Example: {combo.example}
																			</p>
																			<p className='text-gray-600 dark:text-gray-300 text-xs italic'>
																				{combo.scenario}
																			</p>
																		</div>
																	)
																)}
															</div>
														</div>
													</div>
												</div>
											)}

											{/* Break Section between Session 2 and 3 */}
											{session.id === 2 && (
												<motion.div
													initial={{ opacity: 0, y: 30 }}
													whileInView={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.8 }}
													viewport={{ once: true }}
													className='my-8 text-center'>
													<div className='bg-gradient-to-r from-[#13AA52]/20 to-blue-500/20 border border-[#13AA52]/30 rounded-2xl p-6'>
														<div className='flex items-center justify-center gap-3 mb-3'>
															<Coffee className='w-6 h-6 text-[#13AA52]' />
															<h4 className='text-xl font-bold text-gray-900 dark:text-white'>
																Short Break
															</h4>
														</div>
														<p className='text-gray-600 dark:text-gray-300'>
															Take a 10-minute break before diving into MongoDB
															architecture!
														</p>
													</div>
												</motion.div>
											)}

											{session.id === 3 && session.content.detailedTopics && (
												<div className='space-y-6'>
													{/* Sharding */}
													<div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6'>
														<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
															{session.content.detailedTopics.sharding.title}
														</h5>
														<p className='text-gray-600 dark:text-gray-300 mb-2'>
															{
																session.content.detailedTopics.sharding
																	.description
															}
														</p>
														<p className='text-gray-600 dark:text-gray-300 mb-6 italic'>
															{session.content.detailedTopics.sharding.overview}
														</p>

														<div className='grid md:grid-cols-3 gap-4 mb-6'>
															{session.content.detailedTopics.sharding.components.map(
																(component, index) => (
																	<div
																		key={index}
																		className='bg-white dark:bg-gray-600 rounded-lg p-4'>
																		<div className='flex items-center gap-2 mb-3'>
																			<span className='text-xl'>
																				{component.icon}
																			</span>
																			<h6 className='text-[#13AA52] font-semibold'>
																				{component.name}
																			</h6>
																		</div>
																		<p className='text-gray-600 dark:text-gray-300 text-sm mb-2'>
																			{component.description}
																		</p>
																		<p className='text-gray-600 dark:text-gray-300 text-xs mb-2'>
																			<strong>Role:</strong> {component.role}
																		</p>
																		<p className='text-blue-600 dark:text-blue-400 text-xs italic'>
																			Example: {component.example}
																		</p>
																	</div>
																)
															)}
														</div>

														<div className='bg-white dark:bg-gray-600 rounded-lg p-4 mb-6'>
															<h6 className='text-blue-600 dark:text-blue-400 font-semibold mb-3'>
																Sharding Strategies:
															</h6>
															<div className='grid md:grid-cols-2 gap-4'>
																{session.content.detailedTopics.sharding.shardingStrategies.map(
																	(strategy, index) => (
																		<div
																			key={index}
																			className='border border-gray-200 dark:border-gray-500 rounded p-3'>
																			<h6 className='text-[#13AA52] font-semibold text-sm mb-2'>
																				{strategy.name}
																			</h6>
																			<p className='text-gray-600 dark:text-gray-300 text-xs mb-2'>
																				{strategy.description}
																			</p>
																			<p className='text-blue-600 dark:text-blue-400 text-xs mb-2'>
																				Example: {strategy.example}
																			</p>
																			<div className='grid grid-cols-2 gap-2'>
																				<div>
																					<h6 className='text-green-600 dark:text-green-400 font-semibold text-xs mb-1'>
																						Pros:
																					</h6>
																					<ul className='text-gray-600 dark:text-gray-300 text-xs space-y-1'>
																						{strategy.pros.map(
																							(pro, proIndex) => (
																								<li key={proIndex}>• {pro}</li>
																							)
																						)}
																					</ul>
																				</div>
																				<div>
																					<h6 className='text-red-600 dark:text-red-400 font-semibold text-xs mb-1'>
																						Cons:
																					</h6>
																					<ul className='text-gray-600 dark:text-gray-300 text-xs space-y-1'>
																						{strategy.cons.map(
																							(con, conIndex) => (
																								<li key={conIndex}>• {con}</li>
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

														<SyntaxHighlighter
															language='javascript'
															style={tomorrow}
															customStyle={{
																background: 'transparent',
																fontSize: '14px',
																borderRadius: '8px',
															}}>
															{session.content.detailedTopics.sharding.code}
														</SyntaxHighlighter>
													</div>

													{/* Replica Sets */}
													<div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6'>
														<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
															{session.content.detailedTopics.replicaSets.title}
														</h5>
														<p className='text-gray-600 dark:text-gray-300 mb-2'>
															{
																session.content.detailedTopics.replicaSets
																	.description
															}
														</p>
														<p className='text-gray-600 dark:text-gray-300 mb-6 italic'>
															{
																session.content.detailedTopics.replicaSets
																	.overview
															}
														</p>

														<div className='grid md:grid-cols-3 gap-4 mb-6'>
															{Object.entries(
																session.content.detailedTopics.replicaSets
																	.architecture
															).map(([key, node]) => (
																<div
																	key={key}
																	className='bg-white dark:bg-gray-600 rounded-lg p-4'>
																	<div className='flex items-center gap-2 mb-3'>
																		<span className='text-xl'>{node.icon}</span>
																		<h6 className='text-[#13AA52] font-semibold'>
																			{node.name}
																		</h6>
																	</div>
																	<p className='text-gray-600 dark:text-gray-300 text-sm mb-2'>
																		{node.description}
																	</p>
																	<p className='text-gray-600 dark:text-gray-300 text-xs mb-2'>
																		<strong>Role:</strong> {node.role}
																	</p>
																	<p className='text-blue-600 dark:text-blue-400 text-xs italic'>
																		Example: {node.example}
																	</p>
																</div>
															))}
														</div>

														<div className='bg-white dark:bg-gray-600 rounded-lg p-4 mb-6'>
															<h6 className='text-blue-600 dark:text-blue-400 font-semibold mb-3'>
																Benefits:
															</h6>
															<div className='grid md:grid-cols-2 gap-4'>
																{session.content.detailedTopics.replicaSets.benefits.map(
																	(benefit, index) => (
																		<div
																			key={index}
																			className='border border-gray-200 dark:border-gray-500 rounded p-3'>
																			<h6 className='text-[#13AA52] font-semibold text-sm mb-2'>
																				{benefit.name}
																			</h6>
																			<p className='text-gray-600 dark:text-gray-300 text-xs mb-2'>
																				{benefit.description}
																			</p>
																			<p className='text-blue-600 dark:text-blue-400 text-xs italic'>
																				Example: {benefit.example}
																			</p>
																		</div>
																	)
																)}
															</div>
														</div>

														<SyntaxHighlighter
															language='javascript'
															style={tomorrow}
															customStyle={{
																background: 'transparent',
																fontSize: '14px',
																borderRadius: '8px',
															}}>
															{session.content.detailedTopics.replicaSets.code}
														</SyntaxHighlighter>
													</div>

													{/* Real World Example */}
													{session.content.detailedTopics.realWorldExample && (
														<div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6'>
															<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
																{
																	session.content.detailedTopics
																		.realWorldExample.title
																}
															</h5>
															<p className='text-gray-600 dark:text-gray-300 mb-2'>
																{
																	session.content.detailedTopics
																		.realWorldExample.description
																}
															</p>
															<p className='text-blue-600 dark:text-blue-400 text-sm mb-4 italic'>
																Scenario:{' '}
																{
																	session.content.detailedTopics
																		.realWorldExample.scenario
																}
															</p>

															<div className='grid md:grid-cols-2 gap-6 mb-6'>
																<div className='bg-white dark:bg-gray-600 rounded-lg p-4'>
																	<h6 className='text-[#13AA52] font-semibold mb-3'>
																		{
																			session.content.detailedTopics
																				.realWorldExample.architecture.sharding
																				.title
																		}
																	</h6>
																	<p className='text-gray-600 dark:text-gray-300 text-sm mb-3'>
																		{
																			session.content.detailedTopics
																				.realWorldExample.architecture.sharding
																				.description
																		}
																	</p>
																	<ul className='space-y-1'>
																		{session.content.detailedTopics.realWorldExample.architecture.sharding.shards.map(
																			(shard, index) => (
																				<li
																					key={index}
																					className='text-gray-600 dark:text-gray-300 text-xs'>
																					• {shard}
																				</li>
																			)
																		)}
																	</ul>
																</div>
																<div className='bg-white dark:bg-gray-600 rounded-lg p-4'>
																	<h6 className='text-blue-600 dark:text-blue-400 font-semibold mb-3'>
																		{
																			session.content.detailedTopics
																				.realWorldExample.architecture
																				.replication.title
																		}
																	</h6>
																	<p className='text-gray-600 dark:text-gray-300 text-sm mb-3'>
																		{
																			session.content.detailedTopics
																				.realWorldExample.architecture
																				.replication.description
																		}
																	</p>
																	<ul className='space-y-1'>
																		{session.content.detailedTopics.realWorldExample.architecture.replication.layout.map(
																			(layout, index) => (
																				<li
																					key={index}
																					className='text-gray-600 dark:text-gray-300 text-xs'>
																					• {layout}
																				</li>
																			)
																		)}
																	</ul>
																</div>
															</div>

															<div className='bg-white dark:bg-gray-600 rounded-lg p-4'>
																<h6 className='text-green-600 dark:text-green-400 font-semibold mb-3'>
																	Benefits:
																</h6>
																<ul className='space-y-1'>
																	{session.content.detailedTopics.realWorldExample.benefits.map(
																		(benefit, index) => (
																			<li
																				key={index}
																				className='text-gray-600 dark:text-gray-300 text-sm'>
																				• {benefit}
																			</li>
																		)
																	)}
																</ul>
															</div>
														</div>
													)}
												</div>
											)}

											{session.id === 4 && session.content.installation && (
												<div className='space-y-6'>
													{/* Installation Section */}
													<div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6'>
														<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
															{session.content.installation.title}
														</h5>
														<p className='text-gray-600 dark:text-gray-300 mb-6'>
															{session.content.installation.description}
														</p>

														{/* Windows Installation */}
														<div className='mb-8'>
															<h6 className='text-[#13AA52] font-semibold mb-4 text-lg'>
																{session.content.installation.windows.title}
															</h6>
															<div className='grid md:grid-cols-2 gap-6'>
																<div>
																	<h6 className='text-blue-600 dark:text-blue-400 font-semibold mb-3'>
																		Installation Steps:
																	</h6>
																	<ol className='list-decimal list-inside space-y-2'>
																		{session.content.installation.windows.steps.map(
																			(step, index) => (
																				<li
																					key={index}
																					className='text-gray-600 dark:text-gray-300 text-sm'>
																					{step}
																				</li>
																			)
																		)}
																	</ol>
																</div>
																<div>
																	<h6 className='text-blue-600 dark:text-blue-400 font-semibold mb-3'>
																		Commands:
																	</h6>
																	<SyntaxHighlighter
																		language='bash'
																		style={tomorrow}
																		customStyle={{
																			background: 'transparent',
																			fontSize: '14px',
																			borderRadius: '8px',
																		}}>
																		{
																			session.content.installation.windows
																				.commands
																		}
																	</SyntaxHighlighter>
																</div>
															</div>
														</div>

														{/* Linux Installation */}
														<div className='mb-8'>
															<h6 className='text-[#13AA52] font-semibold mb-4 text-lg'>
																{session.content.installation.linux.title}
															</h6>
															<div className='grid md:grid-cols-2 gap-6'>
																<div>
																	<h6 className='text-blue-600 dark:text-blue-400 font-semibold mb-3'>
																		Installation Steps:
																	</h6>
																	<ol className='list-decimal list-inside space-y-2'>
																		{session.content.installation.linux.steps.map(
																			(step, index) => (
																				<li
																					key={index}
																					className='text-gray-600 dark:text-gray-300 text-sm'>
																					{step}
																				</li>
																			)
																		)}
																	</ol>
																</div>
																<div>
																	<h6 className='text-blue-600 dark:text-blue-400 font-semibold mb-3'>
																		Commands:
																	</h6>
																	<SyntaxHighlighter
																		language='bash'
																		style={tomorrow}
																		customStyle={{
																			background: 'transparent',
																			fontSize: '14px',
																			borderRadius: '8px',
																		}}>
																		{
																			session.content.installation.linux
																				.commands
																		}
																	</SyntaxHighlighter>
																</div>
															</div>
														</div>

														{/* Verification */}
														<div>
															<h6 className='text-[#13AA52] font-semibold mb-4 text-lg'>
																{
																	session.content.installation.verification
																		.title
																}
															</h6>
															<div className='grid md:grid-cols-2 gap-6'>
																<div>
																	<h6 className='text-blue-600 dark:text-blue-400 font-semibold mb-3'>
																		Verification Steps:
																	</h6>
																	<ol className='list-decimal list-inside space-y-2'>
																		{session.content.installation.verification.steps.map(
																			(step, index) => (
																				<li
																					key={index}
																					className='text-gray-600 dark:text-gray-300 text-sm'>
																					{step}
																				</li>
																			)
																		)}
																	</ol>
																</div>
																<div>
																	<h6 className='text-blue-600 dark:text-blue-400 font-semibold mb-3'>
																		Test Commands:
																	</h6>
																	<SyntaxHighlighter
																		language='javascript'
																		style={tomorrow}
																		customStyle={{
																			background: 'transparent',
																			fontSize: '14px',
																			borderRadius: '8px',
																		}}>
																		{
																			session.content.installation.verification
																				.commands
																		}
																	</SyntaxHighlighter>
																</div>
															</div>
														</div>
													</div>
												</div>
											)}

											{session.id === 4 && session.content.crud && (
												<div className='space-y-6'>
													{Object.entries(session.content.crud).map(
														([operation, data]) => (
															<div
																key={operation}
																className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6'>
																<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
																	{data.title}
																</h5>
																<SyntaxHighlighter
																	language='javascript'
																	style={tomorrow}
																	customStyle={{
																		background: 'transparent',
																		fontSize: '14px',
																		borderRadius: '8px',
																	}}>
																	{data.code}
																</SyntaxHighlighter>
															</div>
														)
													)}

													{/* Try It Box */}
													<div className='bg-gradient-to-r from-[#13AA52]/20 to-blue-500/20 border border-[#13AA52]/30 rounded-xl p-6'>
														<div className='flex items-center gap-3 mb-4'>
															<Play className='w-6 h-6 text-[#13AA52]' />
															<h5 className='text-lg font-semibold text-gray-900 dark:text-white'>
																Try It Yourself
															</h5>
														</div>
														<p className='text-gray-600 dark:text-gray-300 mb-4'>
															Practice these commands in your MongoDB shell or
															MongoDB Compass to get familiar with the syntax.
														</p>
														<button className='inline-flex items-center gap-2 bg-[#13AA52] hover:bg-[#0F8A42] text-white px-4 py-2 rounded-lg font-medium transition-colors'>
															<Code className='w-4 h-4' />
															Open MongoDB Shell
														</button>
													</div>
												</div>
											)}
										</div>
									</motion.div>
								</motion.div>
							))}
						</div>

						{/* Break Section */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className='my-12 text-center'>
							<div className='bg-gradient-to-r from-[#13AA52]/20 to-blue-500/20 border border-[#13AA52]/30 rounded-2xl p-8'>
								<div className='flex items-center justify-center gap-3 mb-4'>
									<Coffee className='w-8 h-8 text-[#13AA52]' />
									<h3 className='text-2xl font-bold text-gray-900 dark:text-white'>
										Break Time
									</h3>
								</div>
								<p className='text-gray-600 dark:text-gray-300 text-lg'>
									Take a 30-minute break to refresh and prepare for the hands-on
									session!
								</p>
							</div>
						</motion.div>

						{/* Summary Section */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8'>
							<h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center'>
								Day 1 Summary
							</h3>
							<div className='grid md:grid-cols-2 gap-8'>
								<div>
									<h4 className='text-xl font-semibold text-[#13AA52] mb-4'>
										Key Takeaways
									</h4>
									<ul className='space-y-3'>
										<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
											<CheckCircle className='w-5 h-5 text-[#13AA52] mt-0.5 flex-shrink-0' />
											<span>
												Understanding NoSQL fundamentals and when to use them
											</span>
										</li>
										<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
											<CheckCircle className='w-5 h-5 text-[#13AA52] mt-0.5 flex-shrink-0' />
											<span>
												Knowledge of different NoSQL database types and CAP
												theorem
											</span>
										</li>
										<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
											<CheckCircle className='w-5 h-5 text-[#13AA52] mt-0.5 flex-shrink-0' />
											<span>
												Understanding MongoDB architecture and scalability
												concepts
											</span>
										</li>
										<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
											<CheckCircle className='w-5 h-5 text-[#13AA52] mt-0.5 flex-shrink-0' />
											<span>
												Hands-on experience with basic CRUD operations
											</span>
										</li>
									</ul>
								</div>
								<div>
									<h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
										What's Next
									</h4>
									<p className='text-gray-600 dark:text-gray-300 mb-6'>
										In Day 2, we'll dive deeper into advanced MongoDB concepts
										including aggregation pipelines, indexing strategies, and
										building real-world applications.
									</p>
									<button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
										Next: Day 2
										<ArrowRight className='w-5 h-5' />
									</button>
								</div>
							</div>
						</motion.div>

						{/* Task Section */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
							className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mt-8'>
							<h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center'>
								Lab Exercises
							</h3>

							{/* Lab 1 */}
							<div className='mb-8'>
								<h4 className='text-2xl font-semibold text-[#13AA52] mb-4 flex items-center gap-2'>
									<Code className='w-6 h-6' />
									Lab 1: MongoDB Queries
								</h4>
								<div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6'>
									<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
										Collection Data
									</h5>
									<p className='text-gray-600 dark:text-gray-300 mb-4'>
										The following collection of five documents is given.
										Documents consist of orders. An order has an id (e.g. "o1"),
										the year in which it was issued, the cost, the items in the
										order, and the number of days it took to deliver the order.
										The cost is specified as price in a given currency. The
										order items consist of products. A product has an id (e.g.,
										"p1"), colours, and quantity.
									</p>
									<SyntaxHighlighter
										language='javascript'
										style={tomorrow}
										customStyle={{
											background: 'transparent',
											fontSize: '14px',
											borderRadius: '8px',
										}}>
										{`// Sample collection data
db.orders.insertMany([
  {
    "order": "o1",
    "year": 2020,
    "paid": "Y",
    "cost": {"price": 30, "currency": "NOK"},
    "items": [{"product": "p1", "colours": ["blue", "black"], "quantity": 15}],
    "delivery_days": 5
  },
  {
    "order": "o2",
    "year": 2020,
    "paid": "Y",
    "cost": {"price": 13, "currency": "EUR"},
    "items": [
      {"product": "p2", "colours": ["white"], "quantity": 4},
      {"product": "p3", "colours": ["white", "black"], "quantity": 1}
    ],
    "delivery_days": 4
  },
  {
    "order": "o3",
    "year": 2018,
    "paid": "N",
    "cost": {"price": 33, "currency": "EUR"},
    "items": [{"product": "p3", "colours": ["blue", "black"], "quantity": 4}],
    "delivery_days": 4
  },
  {
    "order": "o4",
    "year": 2017,
    "paid": "Y",
    "cost": {"price": 17, "currency": "NOK"},
    "items": [
      {"product": "p2", "colours": ["pink", "black"], "quantity": 14},
      {"product": "p4", "colours": ["white"], "quantity": 1}
    ],
    "delivery_days": 2
  },
  {
    "order": "o5",
    "year": 2020,
    "paid": "Y",
    "cost": {"price": 19, "currency": "NOK"},
    "items": [{"product": "p1", "quantity": 15}],
    "delivery_days": 3
  }
])`}
									</SyntaxHighlighter>
								</div>

								<div className='bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6'>
									<h5 className='text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4'>
										Required Queries
									</h5>
									<ol className='space-y-4'>
										<li className='text-gray-700 dark:text-gray-300'>
											<strong>1.</strong> Retrieve all documents in a collection
										</li>
										<li className='text-gray-700 dark:text-gray-300'>
											<strong>2.</strong> Retrieve all documents that contain
											paid orders (the "paid" field is "Y")
										</li>
										<li className='text-gray-700 dark:text-gray-300'>
											<strong>3.</strong> Retrieve all documents that contain
											orders whose price currency is in NOK
										</li>
										<li className='text-gray-700 dark:text-gray-300'>
											<strong>4.</strong> Retrieve all documents with orders
											that contain product "p2"
										</li>
									</ol>
								</div>
							</div>

							{/* Lab 2 */}
							<div>
								<h4 className='text-2xl font-semibold text-[#13AA52] mb-4 flex items-center gap-2'>
									<Database className='w-6 h-6' />
									Lab 2: Faculty System Database
								</h4>
								<div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6'>
									<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
										Database Setup
									</h5>
									<p className='text-gray-600 dark:text-gray-300 mb-4'>
										Create database named: <strong>FacultySystemDB</strong>
									</p>
									<SyntaxHighlighter
										language='javascript'
										style={tomorrow}
										customStyle={{
											background: 'transparent',
											fontSize: '14px',
											borderRadius: '8px',
										}}>
										{`// Create and use the database
use FacultySystemDB`}
									</SyntaxHighlighter>
								</div>

								<div className='space-y-6'>
									{/* Step 1 */}
									<div className='bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6'>
										<h5 className='text-lg font-semibold text-yellow-700 dark:text-yellow-400 mb-4'>
											Step 1: Create Student Collection
										</h5>
										<p className='text-gray-700 dark:text-gray-300 mb-4'>
											Create collection (student) that has:
										</p>
										<ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300'>
											<li>
												<strong>FirstName:</strong> string
											</li>
											<li>
												<strong>LastName:</strong> string
											</li>
											<li>
												<strong>Age:</strong> Number
											</li>
											<li>
												<strong>Faculty:</strong> An object that has Name and
												Address
											</li>
											<li>
												<strong>Grades:</strong> An array of objects, each
												object has: CourseName, Grade, Pass (Boolean)
											</li>
											<li>
												<strong>IsFired:</strong> Boolean
											</li>
										</ul>
									</div>

									{/* Step 2 */}
									<div className='bg-green-50 dark:bg-green-900/20 rounded-xl p-6'>
										<h5 className='text-lg font-semibold text-green-700 dark:text-green-400 mb-4'>
											Step 2: Insert Documents
										</h5>
										<p className='text-gray-700 dark:text-gray-300 mb-4'>
											Insert 3 (at least) documents in Student collection with
											different values:
										</p>
										<ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300'>
											<li>Try inserting one record each time</li>
											<li>
												Try inserting collection using one insert statement
											</li>
										</ul>
									</div>

									{/* Step 3 */}
									<div className='bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6'>
										<h5 className='text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4'>
											Step 3: Retrieve Data
										</h5>
										<p className='text-gray-700 dark:text-gray-300 mb-4'>
											Retrieve the following data:
										</p>
										<ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300'>
											<li>All Students</li>
											<li>Student with specific First Name</li>
											<li>All fired students</li>
											<li>
												Display student with specific First Name, and display
												his First Name, Last name, IsFired fields only
											</li>
										</ul>
									</div>

									{/* Step 4 */}
									<div className='bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6'>
										<h5 className='text-lg font-semibold text-purple-700 dark:text-purple-400 mb-4'>
											Step 4: Update Operations
										</h5>
										<p className='text-gray-700 dark:text-gray-300'>
											Update the student with specific FirstName, and change his
											LastName
										</p>
									</div>

									{/* Step 5 */}
									<div className='bg-red-50 dark:bg-red-900/20 rounded-xl p-6'>
										<h5 className='text-lg font-semibold text-red-700 dark:text-red-400 mb-4'>
											Step 5: Delete Operations
										</h5>
										<p className='text-gray-700 dark:text-gray-300 mb-4'>
											Perform the following delete operations:
										</p>
										<ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300'>
											<li>Delete Fired students</li>
											<li>Delete all students collection</li>
											<li>Delete the whole DB</li>
										</ul>
									</div>

									{/* Step 6 */}
									<div className='bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6'>
										<h5 className='text-lg font-semibold text-indigo-700 dark:text-indigo-400 mb-4'>
											Step 6: Create New Database
										</h5>
										<p className='text-gray-700 dark:text-gray-300'>
											Create new database named:{' '}
											<strong>FacultySystemV2</strong>
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</section>
			</main>
		</div>
	);
}
