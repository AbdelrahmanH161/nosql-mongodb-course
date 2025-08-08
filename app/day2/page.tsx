'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import {
	ChevronDown,
	Database,
	Search,
	BarChart3,
	Zap,
	Play,
	CheckCircle,
	Clock,
	Coffee,
	TrendingUp,
	Target,
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Loading from '@/components/Loading';

export default function Day2Page() {
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
			title: 'Advanced Querying & Query Operators',
			duration: '60 min',
			icon: <Search className='w-6 h-6' />,
			content: {
				description:
					'Master MongoDB query and update operators with comprehensive examples covering comparison, logical, element, evaluation, array, and update operations.',
				topics: [
					'Comparison Query Operators ($eq, $gt, $gte, $in, $lt, $lte, $ne, $nin)',
					'Logical Query Operators ($and, $or, $not, $nor)',
					'Element Query Operators ($exists, $type)',
					'Evaluation Query Operators ($expr, $regex, $text, $where)',
					'Array Query Operators ($all, $elemMatch, $size)',
					'Update Operators ($set, $unset, $inc, $push, $pull, $addToSet)',
					'Regular expressions in queries',
					'Array and embedded document queries',
					'Geospatial queries',
				],
				detailedTopics: {
					comparisonOperators: {
						title: 'Comparison Query Operators',
						description:
							'Operators for comparing values in documents. These are the most commonly used operators for filtering data.',
						operators: [
							{
								name: '$eq',
								description:
									'Matches values that are equal to a specified value',
								syntax: '{ field: { $eq: value } }',
								example1: {
									title: 'Find users with specific age',
									query: 'db.users.find({ age: { $eq: 25 } })',
									equivalent: 'db.users.find({ age: 25 })',
									explanation: 'Both queries return users exactly 25 years old',
								},
								example2: {
									title: 'Find products with specific price',
									query: 'db.products.find({ price: { $eq: 45000 } })',
									explanation: 'Returns products priced exactly at 45000 EGP',
								},
								example3: {
									title: 'Find users with specific status',
									query: 'db.users.find({ status: { $eq: "active" } })',
									explanation: 'Returns only active users',
								},
								example4: {
									title: 'Find products by exact brand match',
									query: 'db.products.find({ brand: { $eq: "Apple" } })',
									explanation: 'Returns only Apple products (case-sensitive)',
								},
								example5: {
									title: 'Find orders with specific status',
									query:
										'db.orders.find({ "payment.method": { $eq: "credit_card" } })',
									explanation: 'Returns orders paid with credit card',
								},
							},
							{
								name: '$gt',
								description:
									'Matches values that are greater than a specified value',
								syntax: '{ field: { $gt: value } }',
								example1: {
									title: 'Find users older than 25',
									query: 'db.users.find({ age: { $gt: 25 } })',
									explanation: 'Returns users with age greater than 25',
								},
								example2: {
									title: 'Find expensive products',
									query: 'db.products.find({ price: { $gt: 30000 } })',
									explanation: 'Returns products priced above 30000 EGP',
								},
								example3: {
									title: 'Find products with high stock',
									query: 'db.products.find({ stock: { $gt: 100 } })',
									explanation:
										'Returns products with stock greater than 100 units',
								},
								example4: {
									title: 'Find expensive electronics',
									query:
										'db.products.find({ category: "electronics", price: { $gt: 50000 } })',
									explanation:
										'Returns electronics products priced above 50000 EGP',
								},
								example5: {
									title: 'Find users registered after specific date',
									query:
										'db.users.find({ registrationDate: { $gt: new Date("2023-06-01") } })',
									explanation: 'Returns users registered after June 1, 2023',
								},
							},
							{
								name: '$gte',
								description:
									'Matches values that are greater than or equal to a specified value',
								syntax: '{ field: { $gte: value } }',
								example1: {
									title: 'Find users 25 or older',
									query: 'db.users.find({ age: { $gte: 25 } })',
									explanation: 'Returns users with age 25 or greater',
								},
								example2: {
									title: 'Find products with good rating',
									query: 'db.products.find({ rating: { $gte: 4.0 } })',
									explanation: 'Returns products with rating 4.0 or higher',
								},
								example3: {
									title: 'Find products with minimum stock',
									query: 'db.products.find({ stock: { $gte: 10 } })',
									explanation:
										'Returns products with at least 10 units in stock',
								},
								example4: {
									title: 'Find users with good credit rating',
									query: 'db.users.find({ "creditScore": { $gte: 700 } })',
									explanation: 'Returns users with credit score 700 or higher',
								},
								example5: {
									title: 'Find products with minimum rating',
									query:
										'db.products.find({ "reviews.rating": { $gte: 4.0 } })',
									explanation:
										'Returns products with average rating 4.0 or higher',
								},
							},
							{
								name: '$in',
								description: 'Matches any of the values specified in an array',
								syntax: '{ field: { $in: [value1, value2, ...] } }',
								example1: {
									title: 'Find users from specific cities',
									query:
										'db.users.find({ "address.city": { $in: ["Cairo", "Alexandria", "Giza"] } })',
									explanation: 'Returns users from Cairo, Alexandria, or Giza',
								},
								example2: {
									title: 'Find products in multiple categories',
									query:
										'db.products.find({ category: { $in: ["electronics", "books", "clothing"] } })',
									explanation: 'Returns products from specified categories',
								},
								example3: {
									title: 'Find users with specific statuses',
									query:
										'db.users.find({ status: { $in: ["active", "pending"] } })',
									explanation: 'Returns users with active or pending status',
								},
								example4: {
									title: 'Find products in multiple price ranges',
									query:
										'db.products.find({ price: { $in: [10000, 20000, 30000, 45000] } })',
									explanation: 'Returns products with specific exact prices',
								},
								example5: {
									title: 'Find orders with specific payment methods',
									query:
										'db.orders.find({ "payment.method": { $in: ["credit_card", "paypal", "cash_on_delivery"] } })',
									explanation: 'Returns orders with common payment methods',
								},
							},
							{
								name: '$lt',
								description:
									'Matches values that are less than a specified value',
								syntax: '{ field: { $lt: value } }',
								example1: {
									title: 'Find young users',
									query: 'db.users.find({ age: { $lt: 30 } })',
									explanation: 'Returns users younger than 30',
								},
								example2: {
									title: 'Find budget products',
									query: 'db.products.find({ price: { $lt: 10000 } })',
									explanation: 'Returns products priced below 10000 EGP',
								},
								example3: {
									title: 'Find products with low stock',
									query: 'db.products.find({ stock: { $lt: 5 } })',
									explanation: 'Returns products with stock less than 5 units',
								},
								example4: {
									title: 'Find budget-friendly products',
									query: 'db.products.find({ price: { $lt: 5000 } })',
									explanation: 'Returns products priced below 5000 EGP',
								},
								example5: {
									title: 'Find recent orders',
									query: 'db.orders.find({ orderDate: { $lt: new Date() } })',
									explanation: 'Returns orders placed before current date',
								},
							},
							{
								name: '$lte',
								description:
									'Matches values that are less than or equal to a specified value',
								syntax: '{ field: { $lte: value } }',
								example1: {
									title: 'Find users 30 or younger',
									query: 'db.users.find({ age: { $lte: 30 } })',
									explanation: 'Returns users with age 30 or less',
								},
								example2: {
									title: 'Find discounted products',
									query: 'db.products.find({ discount: { $lte: 0.5 } })',
									explanation: 'Returns products with 50% discount or less',
								},
								example3: {
									title: 'Find affordable products',
									query: 'db.products.find({ price: { $lte: 5000 } })',
									explanation: 'Returns products priced at 5000 EGP or less',
								},
								example4: {
									title: 'Find users with standard membership',
									query:
										'db.users.find({ "membershipType": { $lte: "standard" } })',
									explanation:
										'Returns users with standard or basic membership',
								},
								example5: {
									title: 'Find products with acceptable rating',
									query:
										'db.products.find({ "reviews.rating": { $lte: 3.0 } })',
									explanation:
										'Returns products with rating 3.0 or lower (for review)',
								},
							},
							{
								name: '$ne',
								description:
									'Matches all values that are not equal to a specified value',
								syntax: '{ field: { $ne: value } }',
								example1: {
									title: 'Find non-active users',
									query: 'db.users.find({ status: { $ne: "active" } })',
									explanation: 'Returns users with status other than "active"',
								},
								example2: {
									title: 'Find non-electronics products',
									query:
										'db.products.find({ category: { $ne: "electronics" } })',
									explanation: 'Returns products not in electronics category',
								},
								example3: {
									title: 'Find products not from specific brand',
									query: 'db.products.find({ brand: { $ne: "Apple" } })',
									explanation: 'Returns products not from Apple brand',
								},
								example4: {
									title: 'Find non-premium users',
									query:
										'db.users.find({ membershipType: { $ne: "premium" } })',
									explanation: 'Returns users who are not premium members',
								},
								example5: {
									title: 'Find orders not delivered',
									query: 'db.orders.find({ status: { $ne: "delivered" } })',
									explanation: 'Returns orders that are not yet delivered',
								},
							},
							{
								name: '$nin',
								description: 'Matches none of the values specified in an array',
								syntax: '{ field: { $nin: [value1, value2, ...] } }',
								example1: {
									title: 'Find users not from major cities',
									query:
										'db.users.find({ "address.city": { $nin: ["Cairo", "Alexandria", "Giza"] } })',
									explanation:
										'Returns users not from the specified major cities',
								},
								example2: {
									title: 'Find products excluding certain categories',
									query:
										'db.products.find({ category: { $nin: ["electronics", "books"] } })',
									explanation:
										'Returns products not in electronics or books categories',
								},
								example3: {
									title: 'Find products not from specific brands',
									query:
										'db.products.find({ brand: { $nin: ["Apple", "Samsung"] } })',
									explanation:
										'Returns products not from Apple or Samsung brands',
								},
								example4: {
									title: 'Find users not from major cities',
									query:
										'db.users.find({ "address.city": { $nin: ["Cairo", "Alexandria", "Giza", "Sharm El Sheikh"] } })',
									explanation: 'Returns users from smaller cities',
								},
								example5: {
									title: 'Find products excluding certain categories',
									query:
										'db.products.find({ category: { $nin: ["electronics", "books", "clothing"] } })',
									explanation: 'Returns products from other categories',
								},
							},
						],
					},
					logicalOperators: {
						title: 'Logical Query Operators',
						description:
							'Operators for combining multiple query conditions using logical operations.',
						operators: [
							{
								name: '$and',
								description:
									'Joins query clauses with logical AND - all conditions must be true',
								syntax: '{ $and: [ { condition1 }, { condition2 }, ... ] }',
								example1: {
									title: 'Find adult users from Cairo',
									query:
										'db.users.find({ $and: [ { age: { $gte: 18 } }, { "address.city": "Cairo" } ] })',
									equivalent:
										'db.users.find({ age: { $gte: 18 }, "address.city": "Cairo" })',
									explanation:
										'Both queries find users 18+ years old AND living in Cairo',
								},
								example2: {
									title: 'Find expensive electronics in stock',
									query:
										'db.products.find({ $and: [ { category: "electronics" }, { price: { $gt: 30000 } }, { stock: { $gt: 0 } } ] })',
									explanation:
										'Returns electronics products that cost more than 30000 EGP AND are in stock',
								},
								example3: {
									title: 'Find premium users with specific preferences',
									query:
										'db.users.find({ $and: [ { membershipType: "premium" }, { "preferences.notifications": true }, { age: { $gte: 25 } } ] })',
									explanation:
										'Returns premium users with notifications enabled AND age 25+',
								},
								example4: {
									title: 'Find high-value orders with specific criteria',
									query:
										'db.orders.find({ $and: [ { total: { $gte: 10000 } }, { status: "delivered" }, { "payment.method": "credit_card" } ] })',
									explanation:
										'Returns delivered orders with high value AND credit card payment',
								},
								example5: {
									title: 'Find products with multiple conditions',
									query:
										'db.products.find({ $and: [ { category: "electronics" }, { stock: { $gt: 0 } }, { price: { $gte: 10000, $lte: 100000 } } ] })',
									explanation:
										'Returns electronics in stock with price between 10K-100K EGP',
								},
							},
							{
								name: '$or',
								description:
									'Joins query clauses with logical OR - at least one condition must be true',
								syntax: '{ $or: [ { condition1 }, { condition2 }, ... ] }',
								example1: {
									title: 'Find users from major cities or premium members',
									query:
										'db.users.find({ $or: [ { "address.city": { $in: ["Cairo", "Alexandria"] } }, { membershipType: "premium" } ] })',
									explanation:
										'Returns users who live in major cities OR have premium membership',
								},
								example2: {
									title: 'Find discounted or highly rated products',
									query:
										'db.products.find({ $or: [ { discount: { $gt: 0.2 } }, { rating: { $gte: 4.5 } } ] })',
									explanation:
										'Returns products with more than 20% discount OR rating 4.5+',
								},
								example3: {
									title: 'Find products by brand or category',
									query:
										'db.products.find({ $or: [ { brand: "Apple" }, { category: "smartphones" } ] })',
									explanation:
										'Returns products from Apple brand OR in smartphones category',
								},
								example4: {
									title: 'Find users with multiple criteria',
									query:
										'db.users.find({ $or: [ { age: { $gte: 30 } }, { "preferences.categories": "electronics" }, { status: "premium" } ] })',
									explanation:
										'Returns users who are 30+ OR prefer electronics OR are premium',
								},
								example5: {
									title:
										'Find orders with different statuses or payment methods',
									query:
										'db.orders.find({ $or: [ { status: "pending" }, { "payment.method": "cash_on_delivery" }, { total: { $gt: 50000 } } ] })',
									explanation:
										'Returns pending orders OR cash delivery OR high-value orders',
								},
							},
							{
								name: '$not',
								description: 'Inverts the effect of a query expression',
								syntax: '{ field: { $not: { operator-expression } } }',
								example1: {
									title: 'Find users not in age range 25-35',
									query:
										'db.users.find({ age: { $not: { $gte: 25, $lte: 35 } } })',
									explanation: 'Returns users younger than 25 or older than 35',
								},
								example2: {
									title: 'Find products not matching price pattern',
									query: 'db.products.find({ name: { $not: /^iPhone/ } })',
									explanation:
										'Returns products whose names do not start with "iPhone"',
								},
								example3: {
									title: 'Find users not from specific cities',
									query:
										'db.users.find({ "address.city": { $not: { $in: ["Cairo", "Alexandria"] } } })',
									explanation: 'Returns users not from Cairo or Alexandria',
								},
								example4: {
									title: 'Find products not in specific price range',
									query:
										'db.products.find({ price: { $not: { $gte: 10000, $lte: 50000 } } })',
									explanation:
										'Returns products priced outside 10K-50K EGP range',
								},
								example5: {
									title: 'Find users not matching age criteria',
									query:
										'db.users.find({ age: { $not: { $gte: 18, $lte: 65 } } })',
									explanation:
										'Returns users outside working age range (18-65)',
								},
							},
							{
								name: '$nor',
								description:
									'Joins query clauses with logical NOR - none of the conditions should be true',
								syntax: '{ $nor: [ { condition1 }, { condition2 }, ... ] }',
								example1: {
									title:
										'Find users who are neither from Cairo nor premium members',
									query:
										'db.users.find({ $nor: [ { "address.city": "Cairo" }, { membershipType: "premium" } ] })',
									explanation:
										'Returns users who are NOT from Cairo AND NOT premium members',
								},
								example2: {
									title:
										'Find products that are neither discounted nor out of stock',
									query:
										'db.products.find({ $nor: [ { discount: { $gt: 0 } }, { stock: 0 } ] })',
									explanation:
										'Returns products with no discount AND not out of stock',
								},
								example3: {
									title:
										'Find users who are neither young nor from major cities',
									query:
										'db.users.find({ $nor: [ { age: { $lt: 25 } }, { "address.city": { $in: ["Cairo", "Alexandria"] } } ] })',
									explanation:
										'Returns users who are NOT young AND NOT from major cities',
								},
								example4: {
									title:
										'Find products that are neither discounted nor out of stock',
									query:
										'db.products.find({ $nor: [ { discount: { $gt: 0 } }, { stock: 0 } ] })',
									explanation:
										'Returns products with no discount AND not out of stock',
								},
								example5: {
									title: 'Find orders that are neither pending nor low value',
									query:
										'db.orders.find({ $nor: [ { status: "pending" }, { total: { $lt: 1000 } } ] })',
									explanation:
										'Returns orders that are NOT pending AND NOT low value',
								},
							},
						],
					},
					elementOperators: {
						title: 'Element Query Operators',
						description:
							'Operators for querying the existence and type of fields in documents.',
						operators: [
							{
								name: '$exists',
								description: 'Matches documents that have the specified field',
								syntax: '{ field: { $exists: boolean } }',
								example1: {
									title: 'Find users with phone numbers',
									query: 'db.users.find({ phone: { $exists: true } })',
									explanation: 'Returns users who have a phone field',
								},
								example2: {
									title: 'Find products without discount field',
									query: 'db.products.find({ discount: { $exists: false } })',
									explanation:
										'Returns products that do not have a discount field',
								},
								example3: {
									title: 'Find users with complete address',
									query:
										'db.users.find({ "address.coordinates": { $exists: true } })',
									explanation:
										'Returns users with coordinates in their address',
								},
								example4: {
									title: 'Find products with warranty information',
									query: 'db.products.find({ warranty: { $exists: true } })',
									explanation:
										'Returns products that have warranty information',
								},
								example5: {
									title: 'Find orders with delivery tracking',
									query:
										'db.orders.find({ "shipping.trackingNumber": { $exists: true } })',
									explanation: 'Returns orders with tracking numbers',
								},
							},
							{
								name: '$type',
								description:
									'Matches documents where the field is of the specified BSON type',
								syntax: '{ field: { $type: <BSON type> } }',
								example1: {
									title: 'Find products with numeric prices',
									query: 'db.products.find({ price: { $type: "number" } })',
									explanation: 'Returns products where price is a number',
								},
								example2: {
									title: 'Find users with string names',
									query: 'db.users.find({ name: { $type: "string" } })',
									explanation: 'Returns users where name is a string',
								},
								example3: {
									title: 'Find products with array tags',
									query: 'db.products.find({ tags: { $type: "array" } })',
									explanation: 'Returns products where tags is an array',
								},
								example4: {
									title: 'Find users with date registration',
									query:
										'db.users.find({ registrationDate: { $type: "date" } })',
									explanation:
										'Returns users where registration date is a proper date',
								},
								example5: {
									title: 'Find products with object specifications',
									query:
										'db.products.find({ specifications: { $type: "object" } })',
									explanation:
										'Returns products where specifications is an object',
								},
							},
						],
					},
					evaluationOperators: {
						title: 'Evaluation Query Operators',
						description:
							'Operators for evaluating expressions and performing advanced queries.',
						operators: [
							{
								name: '$expr',
								description:
									'Allows the use of aggregation expressions within the query language',
								syntax: '{ $expr: { <aggregation expression> } }',
								example1: {
									title:
										'Find products where price is greater than stock value',
									query:
										'db.products.find({ $expr: { $gt: ["$price", { $multiply: ["$stock", 1000] }] } })',
									explanation: 'Returns products where price > stock * 1000',
								},
								example2: {
									title: 'Find users registered in current year',
									query:
										'db.users.find({ $expr: { $eq: [{ $year: "$registrationDate" }, { $year: new Date() }] } })',
									explanation: 'Returns users registered in the current year',
								},
								example3: {
									title: 'Find products with price-to-stock ratio > 100',
									query:
										'db.products.find({ $expr: { $gt: [{ $divide: ["$price", "$stock"] }, 100] } })',
									explanation:
										'Returns products with price/stock ratio greater than 100',
								},
								example4: {
									title: 'Find orders with delivery time > 3 days',
									query:
										'db.orders.find({ $expr: { $gt: [{ $divide: [{ $subtract: ["$deliveryDate", "$orderDate"] }, 1000 * 60 * 60 * 24] }, 3] } })',
									explanation:
										'Returns orders that took more than 3 days to deliver',
								},
								example5: {
									title: 'Find products where price > average price',
									query:
										'db.products.find({ $expr: { $gt: ["$price", { $avg: "$price" }] } })',
									explanation: 'Returns products priced above the average',
								},
							},
							{
								name: '$regex',
								description:
									'Provides regular expression capabilities for pattern matching',
								syntax: '{ field: { $regex: /pattern/options } }',
								example1: {
									title: 'Find users with Gmail addresses',
									query:
										'db.users.find({ email: { $regex: /@gmail\\.com$/i } })',
									explanation:
										'Returns users with Gmail addresses (case-insensitive)',
								},
								example2: {
									title: 'Find products starting with "iPhone"',
									query: 'db.products.find({ name: { $regex: /^iPhone/i } })',
									explanation:
										'Returns products whose names start with "iPhone"',
								},
								example3: {
									title: 'Find users with Egyptian phone numbers',
									query: 'db.users.find({ phone: { $regex: /^\\+20/ } })',
									explanation: 'Returns users with Egyptian country code (+20)',
								},
								example4: {
									title: 'Find products with specific patterns',
									query:
										'db.products.find({ name: { $regex: /iPhone.*Pro/i } })',
									explanation:
										'Returns products with "iPhone" followed by "Pro" in name',
								},
								example5: {
									title: 'Find users with specific email domains',
									query:
										'db.users.find({ email: { $regex: /@(gmail|yahoo|hotmail)\\.com$/i } })',
									explanation: 'Returns users with common email providers',
								},
							},
							{
								name: '$text',
								description:
									'Performs text search on the content of the fields indexed with a text index',
								syntax: '{ $text: { $search: "search string" } }',
								example1: {
									title: 'Search products by description text',
									query:
										'db.products.find({ $text: { $search: "advanced features" } })',
									explanation:
										'Returns products with "advanced features" in text index',
								},
								example2: {
									title: 'Search users by name text',
									query:
										'db.users.find({ $text: { $search: "Ahmed Hassan" } })',
									explanation: 'Returns users matching the name text search',
								},
								example3: {
									title: 'Search products excluding certain terms',
									query:
										'db.products.find({ $text: { $search: "smartphone -cheap" } })',
									explanation:
										'Returns products with "smartphone" but not "cheap"',
								},
								example4: {
									title: 'Search products with phrase matching',
									query:
										'db.products.find({ $text: { $search: "\\"wireless headphones\\"" } })',
									explanation:
										'Returns products with exact phrase "wireless headphones"',
								},
								example5: {
									title: 'Search products with multiple terms',
									query:
										'db.products.find({ $text: { $search: "iPhone smartphone premium" } })',
									explanation:
										'Returns products matching any of the three terms',
								},
							},
						],
					},
					arrayOperators: {
						title: 'Array Query Operators',
						description:
							'Operators for querying arrays and array elements in documents.',
						operators: [
							{
								name: '$all',
								description:
									'Matches arrays that contain all elements specified in the query',
								syntax: '{ field: { $all: [element1, element2, ...] } }',
								example1: {
									title: 'Find products with specific tags',
									query:
										'db.products.find({ tags: { $all: ["smartphone", "premium"] } })',
									explanation:
										'Returns products that have both "smartphone" and "premium" tags',
								},
								example2: {
									title: 'Find users with specific category preferences',
									query:
										'db.users.find({ "preferences.categories": { $all: ["electronics", "books"] } })',
									explanation:
										'Returns users who prefer both electronics and books',
								},
								example3: {
									title: 'Find products with multiple specifications',
									query:
										'db.products.find({ "specifications.storage": { $all: ["128GB", "256GB"] } })',
									explanation: 'Returns products with both storage options',
								},
								example4: {
									title: 'Find users with multiple category preferences',
									query:
										'db.users.find({ "preferences.categories": { $all: ["electronics", "books", "fashion"] } })',
									explanation: 'Returns users who prefer all three categories',
								},
								example5: {
									title: 'Find products with specific color options',
									query:
										'db.products.find({ "specifications.colors": { $all: ["black", "white", "gold"] } })',
									explanation: 'Returns products available in all three colors',
								},
							},
							{
								name: '$elemMatch',
								description:
									'Matches documents that contain an array element that matches all the specified query criteria',
								syntax:
									'{ field: { $elemMatch: { condition1, condition2, ... } } }',
								example1: {
									title: 'Find products with high-rated reviews',
									query:
										'db.products.find({ reviews: { $elemMatch: { rating: { $gte: 4 }, comment: { $exists: true } } } })',
									explanation:
										'Returns products with reviews rated 4+ and have comments',
								},
								example2: {
									title: 'Find orders with specific item criteria',
									query:
										'db.orders.find({ items: { $elemMatch: { quantity: { $gt: 1 }, price: { $gt: 10000 } } } })',
									explanation:
										'Returns orders with items having quantity > 1 and price > 10000',
								},
								example3: {
									title: 'Find users with recent preferences',
									query:
										'db.users.find({ "preferences.categories": { $elemMatch: { $in: ["electronics"], $exists: true } } })',
									explanation:
										'Returns users with electronics in their preferences',
								},
								example4: {
									title: 'Find products with specific review criteria',
									query:
										'db.products.find({ reviews: { $elemMatch: { rating: { $gte: 4 }, "comment": { $regex: /excellent/i } } } })',
									explanation:
										'Returns products with reviews rated 4+ and containing "excellent"',
								},
								example5: {
									title: 'Find orders with specific item criteria',
									query:
										'db.orders.find({ items: { $elemMatch: { quantity: { $gt: 2 }, price: { $gte: 5000 } } } })',
									explanation:
										'Returns orders with items having quantity > 2 and price >= 5000',
								},
							},
							{
								name: '$size',
								description:
									'Matches arrays with the specified number of elements',
								syntax: '{ field: { $size: number } }',
								example1: {
									title: 'Find products with exactly 4 tags',
									query: 'db.products.find({ tags: { $size: 4 } })',
									explanation: 'Returns products with exactly 4 tags',
								},
								example2: {
									title: 'Find orders with single item',
									query: 'db.orders.find({ items: { $size: 1 } })',
									explanation: 'Returns orders with exactly 1 item',
								},
								example3: {
									title: 'Find users with multiple category preferences',
									query:
										'db.users.find({ "preferences.categories": { $size: 2 } })',
									explanation:
										'Returns users with exactly 2 category preferences',
								},
								example4: {
									title: 'Find products with specific number of reviews',
									query: 'db.products.find({ reviews: { $size: 5 } })',
									explanation: 'Returns products with exactly 5 reviews',
								},
								example5: {
									title: 'Find orders with multiple items',
									query: 'db.orders.find({ items: { $size: { $gte: 3 } } })',
									explanation: 'Returns orders with 3 or more items',
								},
							},
						],
					},
					updateOperators: {
						title: 'Update Operators',
						description:
							'Operators for modifying documents in MongoDB collections.',
						operators: [
							{
								name: '$set',
								description: 'Sets the value of a field in a document',
								syntax: '{ $set: { field: value } }',
								example1: {
									title: 'Update user status to active',
									query:
										'db.users.updateOne({ email: "ahmed.hassan@gmail.com" }, { $set: { status: "active" } })',
									explanation:
										'Sets the status field to "active" for the specified user',
								},
								example2: {
									title: 'Update product price',
									query:
										'db.products.updateOne({ name: "iPhone 15 Pro" }, { $set: { price: 48000 } })',
									explanation:
										'Updates the price of iPhone 15 Pro to 48000 EGP',
								},
								example3: {
									title: 'Add new field to product',
									query:
										'db.products.updateOne({ _id: ObjectId("64a1b2c3d4e5f6789abcdef2") }, { $set: { warranty: "2 years" } })',
									explanation: 'Adds a warranty field to the specified product',
								},
								example4: {
									title: 'Update nested field',
									query:
										'db.users.updateOne({ email: "ahmed.hassan@gmail.com" }, { $set: { "preferences.language": "en" } })',
									explanation:
										'Updates the language preference in nested object',
								},
								example5: {
									title: 'Update multiple fields at once',
									query:
										'db.products.updateOne({ name: "iPhone 15 Pro" }, { $set: { price: 48000, stock: 45, "specifications.color": "Titanium" } })',
									explanation:
										'Updates price, stock, and adds color specification',
								},
							},
							{
								name: '$unset',
								description: 'Removes the specified field from a document',
								syntax: '{ $unset: { field: "" } }',
								example1: {
									title: 'Remove phone field from user',
									query:
										'db.users.updateOne({ email: "ahmed.hassan@gmail.com" }, { $unset: { phone: "" } })',
									explanation:
										'Removes the phone field from the specified user',
								},
								example2: {
									title: 'Remove discount field from product',
									query:
										'db.products.updateOne({ name: "iPhone 15 Pro" }, { $unset: { discount: "" } })',
									explanation:
										'Removes the discount field from the specified product',
								},
								example3: {
									title: 'Remove old preferences',
									query:
										'db.users.updateOne({ _id: ObjectId("64a1b2c3d4e5f6789abcdef0") }, { $unset: { "preferences.oldCategories": "" } })',
									explanation:
										'Removes the oldCategories field from user preferences',
								},
								example4: {
									title: 'Remove multiple fields',
									query:
										'db.products.updateOne({ name: "iPhone 15 Pro" }, { $unset: { discount: "", oldPrice: "", tempField: "" } })',
									explanation: 'Removes multiple fields from the product',
								},
								example5: {
									title: 'Remove nested field',
									query:
										'db.users.updateOne({ email: "ahmed.hassan@gmail.com" }, { $unset: { "address.coordinates": "" } })',
									explanation: 'Removes coordinates from user address',
								},
							},
							{
								name: '$inc',
								description:
									'Increments the value of the field by the specified amount',
								syntax: '{ $inc: { field: number } }',
								example1: {
									title: 'Increase product stock',
									query:
										'db.products.updateOne({ name: "iPhone 15 Pro" }, { $inc: { stock: 10 } })',
									explanation: 'Increases the stock by 10 units',
								},
								example2: {
									title: 'Decrease product price',
									query:
										'db.products.updateOne({ name: "iPhone 15 Pro" }, { $inc: { price: -2000 } })',
									explanation: 'Decreases the price by 2000 EGP',
								},
								example3: {
									title: 'Increment user age',
									query:
										'db.users.updateOne({ email: "ahmed.hassan@gmail.com" }, { $inc: { age: 1 } })',
									explanation: 'Increases the user age by 1 year',
								},
								example4: {
									title: 'Decrease product stock',
									query:
										'db.products.updateOne({ name: "iPhone 15 Pro" }, { $inc: { stock: -1 } })',
									explanation: 'Decreases the stock by 1 unit (sold)',
								},
								example5: {
									title: 'Increment multiple numeric fields',
									query:
										'db.products.updateOne({ name: "iPhone 15 Pro" }, { $inc: { viewCount: 1, purchaseCount: 1 } })',
									explanation: 'Increases both view and purchase counts',
								},
							},
							{
								name: '$push',
								description: 'Adds an element to an array',
								syntax: '{ $push: { field: value } }',
								example1: {
									title: 'Add tag to product',
									query:
										'db.products.updateOne({ name: "iPhone 15 Pro" }, { $push: { tags: "new" } })',
									explanation: 'Adds "new" tag to the product tags array',
								},
								example2: {
									title: 'Add review to product',
									query:
										'db.products.updateOne({ name: "iPhone 15 Pro" }, { $push: { reviews: { userId: ObjectId("64a1b2c3d4e5f6789abcdef1"), rating: 4, comment: "Great product!", date: new Date() } } })',
									explanation: 'Adds a new review to the product reviews array',
								},
								example3: {
									title: 'Add category preference to user',
									query:
										'db.users.updateOne({ email: "ahmed.hassan@gmail.com" }, { $push: { "preferences.categories": "fashion" } })',
									explanation: 'Adds "fashion" to user category preferences',
								},
								example4: {
									title: 'Add multiple tags with $each',
									query:
										'db.products.updateOne({ name: "iPhone 15 Pro" }, { $push: { tags: { $each: ["5g", "camera", "battery", "premium"] } } })',
									explanation: 'Adds multiple tags to the product at once',
								},
								example5: {
									title: 'Add to beginning of array with $position',
									query:
										'db.products.updateOne({ name: "iPhone 15 Pro" }, { $push: { tags: { $each: ["latest"], $position: 0 } } })',
									explanation:
										'Adds "latest" tag to the beginning of the tags array',
								},
							},
							{
								name: '$pull',
								description:
									'Removes from an array all instances of a value that match a specified condition',
								syntax: '{ $pull: { field: value } }',
								example1: {
									title: 'Remove tag from product',
									query:
										'db.products.updateOne({ name: "iPhone 15 Pro" }, { $pull: { tags: "new" } })',
									explanation: 'Removes "new" tag from the product tags array',
								},
								example2: {
									title: 'Remove specific review',
									query:
										'db.products.updateOne({ name: "iPhone 15 Pro" }, { $pull: { reviews: { userId: ObjectId("64a1b2c3d4e5f6789abcdef0") } } })',
									explanation: 'Removes reviews from the specified user',
								},
								example3: {
									title: 'Remove category preference',
									query:
										'db.users.updateOne({ email: "ahmed.hassan@gmail.com" }, { $pull: { "preferences.categories": "books" } })',
									explanation: 'Removes "books" from user category preferences',
								},
								example4: {
									title: 'Remove multiple matching elements',
									query:
										'db.products.updateOne({ name: "iPhone 15 Pro" }, { $pull: { tags: { $in: ["old", "outdated", "discontinued"] } } })',
									explanation: 'Removes multiple tags that match the condition',
								},
								example5: {
									title: 'Remove reviews with low ratings',
									query:
										'db.products.updateOne({ name: "iPhone 15 Pro" }, { $pull: { reviews: { rating: { $lt: 2 } } } })',
									explanation: 'Removes all reviews with rating less than 2',
								},
							},
							{
								name: '$addToSet',
								description:
									'Adds elements to an array only if they do not already exist in the set',
								syntax: '{ $addToSet: { field: value } }',
								example1: {
									title: 'Add unique tag to product',
									query:
										'db.products.updateOne({ name: "iPhone 15 Pro" }, { $addToSet: { tags: "premium" } })',
									explanation:
										'Adds "premium" tag only if it doesn\'t already exist',
								},
								example2: {
									title: 'Add unique category preference',
									query:
										'db.users.updateOne({ email: "ahmed.hassan@gmail.com" }, { $addToSet: { "preferences.categories": "electronics" } })',
									explanation:
										'Adds "electronics" to preferences only if not already present',
								},
								example3: {
									title: 'Add multiple unique tags',
									query:
										'db.products.updateOne({ name: "iPhone 15 Pro" }, { $addToSet: { tags: { $each: ["5g", "camera", "battery"] } } })',
									explanation: 'Adds multiple unique tags to the product',
								},
								example4: {
									title: 'Add unique category preferences',
									query:
										'db.users.updateOne({ email: "ahmed.hassan@gmail.com" }, { $addToSet: { "preferences.categories": { $each: ["sports", "home", "garden"] } } })',
									explanation: 'Adds unique categories to user preferences',
								},
								example5: {
									title: 'Add unique product IDs to wishlist',
									query:
										'db.users.updateOne({ email: "ahmed.hassan@gmail.com" }, { $addToSet: { wishlist: ObjectId("64a1b2c3d4e5f6789abcdef2") } })',
									explanation:
										'Adds product ID to user wishlist (prevents duplicates)',
								},
							},
						],
					},
				},
				project: {
					title: 'E-commerce Query Examples',
					description:
						'Practical examples using a sample e-commerce database to demonstrate MongoDB query operators',
					setup: `// Database Setup for TechMart E-commerce Platform
use TechMart

// Create collections with sample data
db.users.insertMany([
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef0"),
    name: "Ahmed Hassan",
    email: "ahmed.hassan@gmail.com",
    phone: "+201234567890",
    status: "active",
    age: 28,
    registrationDate: new Date("2023-06-15"),
    address: {
      street: "123 Tahrir Square",
      city: "Cairo",
      governorate: "Cairo",
      zipCode: "11511",
      coordinates: [31.2357, 30.0444]
    },
    preferences: {
      categories: ["electronics", "books"],
      notifications: true,
      language: "ar"
    }
  },
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef1"),
    name: "Sara Mohamed",
    email: "sara.mohamed@yahoo.com", 
    phone: "+201987654321",
    status: "active",
    age: 25,
    registrationDate: new Date("2023-08-20"),
    address: {
      street: "456 Corniche Street",
      city: "Alexandria",
      governorate: "Alexandria", 
      zipCode: "21500",
      coordinates: [29.9187, 31.2001]
    },
    preferences: {
      categories: ["fashion", "electronics"],
      notifications: false,
      language: "en"
    }
  }
])

db.products.insertMany([
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef2"),
    name: "iPhone 15 Pro",
    description: "Latest iPhone with advanced features",
    category: "electronics",
    subcategory: "smartphones",
    brand: "Apple",
    price: 45000,
    currency: "EGP",
    stock: 50,
    tags: ["smartphone", "ios", "premium", "5g"],
    specifications: {
      screen: "6.1 inch",
      storage: "128GB",
      ram: "8GB",
      camera: "48MP"
    },
    reviews: [
      {
        userId: ObjectId("64a1b2c3d4e5f6789abcdef0"),
        rating: 5,
        comment: "Excellent phone!",
        date: new Date("2023-09-15")
      }
    ],
    warehouse: {
      location: {
        type: "Point",
        coordinates: [31.3157, 30.0626] // New Cairo warehouse
      },
      address: "TechMart Warehouse, New Cairo"
    }
  }
])

db.orders.insertMany([
  {
    _id: ObjectId("64a1b2c3d4e5f6789abcdef3"),
    customerId: ObjectId("64a1b2c3d4e5f6789abcdef0"),
    orderNumber: "TM-2023-001",
    status: "delivered",
    orderDate: new Date("2023-09-10"),
    deliveryDate: new Date("2023-09-12"),
    items: [
      {
        productId: ObjectId("64a1b2c3d4e5f6789abcdef2"),
        name: "iPhone 15 Pro",
        quantity: 1,
        price: 45000,
        total: 45000
      }
    ],
    shipping: {
      address: {
        street: "123 Tahrir Square",
        city: "Cairo",
        governorate: "Cairo"
      },
      method: "express",
      cost: 50
    },
    payment: {
      method: "credit_card",
      cardType: "visa",
      last4: "1234"
    },
    total: 45050
  }
])`,
					examples: [
						{
							title: 'Comparison Query Operators',
							description: 'Basic filtering and comparison operations',
							code: `// Find users between 25-35 years old from major cities
db.users.find({
  age: { $gte: 25, $lte: 35 },
  "address.city": { $in: ["Cairo", "Alexandria", "Giza"] }
})

// Find expensive electronics products in stock
db.products.find({
  category: "electronics",
  price: { $gt: 30000 },
  stock: { $gt: 0 }
})

// Find products not from Apple or Samsung
db.products.find({
  brand: { $nin: ["Apple", "Samsung"] }
})

// Find users with specific status
db.users.find({
  status: { $ne: "inactive" }
})
`,
						},
						{
							title: 'Logical Query Operators',
							description:
								'Combining multiple conditions with logical operators',
							code: `// Find premium users OR users from major cities
db.users.find({
  $or: [
    { membershipType: "premium" },
    { "address.city": { $in: ["Cairo", "Alexandria"] } }
  ]
})

// Find products that are both discounted AND highly rated
db.products.find({
  $and: [
    { discount: { $gt: 0.1 } },
    { rating: { $gte: 4.5 } }
  ]
})

// Find users who are NOT young AND NOT from major cities
db.users.find({
  $nor: [
    { age: { $lt: 25 } },
    { "address.city": { $in: ["Cairo", "Alexandria"] } }
  ]
})

// Find products not matching specific criteria
db.products.find({
  name: { $not: /^iPhone/ }
})
`,
						},
						{
							title: 'Element Query Operators',
							description: 'Checking field existence and data types',
							code: `// Find users with complete profile (phone and coordinates)
db.users.find({
  phone: { $exists: true },
  "address.coordinates": { $exists: true }
})

// Find products without discount field
db.products.find({
  discount: { $exists: false }
})

// Find products with numeric prices
db.products.find({
  price: { $type: "number" }
})

// Find users with string names
db.users.find({
  name: { $type: "string" }
})
`,
						},
						{
							title: 'Evaluation Query Operators',
							description:
								'Advanced expression evaluation and pattern matching',
							code: `// Find products where price > stock * 1000
db.products.find({
  $expr: { $gt: ["$price", { $multiply: ["$stock", 1000] }] }
})

// Find users registered in current year
db.users.find({
  $expr: { $eq: [{ $year: "$registrationDate" }, { $year: new Date() }] }
})

// Find users with Gmail addresses
db.users.find({
  email: { $regex: /@gmail\\.com$/i }
})

// Find products starting with "iPhone"
db.products.find({
  name: { $regex: /^iPhone/i }
})

// Find users with Egyptian phone numbers
db.users.find({
  phone: { $regex: /^\\+20/ }
})

// Text search (requires text index)
db.products.find({
  $text: { $search: "advanced features" }
})
`,
						},
						{
							title: 'Array Query Operators',
							description: 'Querying arrays and array elements',
							code: `// Find products with specific tags
db.products.find({
  tags: { $all: ["smartphone", "premium", "5g"] }
})

// Find products with exactly 4 tags
db.products.find({
  tags: { $size: 4 }
})

// Find products with high-rated reviews
db.products.find({
  reviews: { $elemMatch: { rating: { $gte: 4 }, comment: { $exists: true } } }
})

// Find orders with expensive items
db.orders.find({
  items: { $elemMatch: { quantity: { $gt: 1 }, price: { $gt: 10000 } } }
})

// Find users with specific category preferences
db.users.find({
  "preferences.categories": { $in: ["electronics", "books"] }
})
`,
						},
						{
							title: 'Update Operators',
							description: 'Modifying documents with update operators',
							code: `// Update user status
db.users.updateOne(
  { email: "ahmed.hassan@gmail.com" },
  { $set: { status: "active" } }
)

// Increase product stock
db.products.updateOne(
  { name: "iPhone 15 Pro" },
  { $inc: { stock: 10 } }
)

// Add tag to product
db.products.updateOne(
  { name: "iPhone 15 Pro" },
  { $push: { tags: "new" } }
)

// Remove tag from product
db.products.updateOne(
  { name: "iPhone 15 Pro" },
  { $pull: { tags: "new" } }
)

// Add unique category preference
db.users.updateOne(
  { email: "ahmed.hassan@gmail.com" },
  { $addToSet: { "preferences.categories": "fashion" } }
)

// Remove phone field
db.users.updateOne(
  { email: "ahmed.hassan@gmail.com" },
  { $unset: { phone: "" } }
)

// Advanced: Update multiple documents
db.products.updateMany(
  { category: "electronics", stock: { $lt: 10 } },
  { $set: { stockStatus: "low" } }
)

// Advanced: Conditional updates with $cond
db.products.updateMany(
  { category: "electronics" },
  { 
    $set: { 
      priceCategory: {
        $cond: {
          if: { $gte: ["$price", 50000] },
          then: "premium",
          else: {
            $cond: {
              if: { $gte: ["$price", 20000] },
              then: "mid-range",
              else: "budget"
            }
          }
        }
      }
    }
  }
)

// Advanced: Array operations with conditions
db.products.updateMany(
  { "reviews.rating": { $lt: 2 } },
  { $pull: { reviews: { rating: { $lt: 2 } } } }
)

// Advanced: Increment with conditions
db.products.updateMany(
  { stock: { $gt: 0 } },
  { $inc: { viewCount: 1 } }
)
`,
						},
						{
							title: 'Complex Combined Queries',
							description: 'Real-world scenarios combining multiple operators',
							code: `// Find active premium users from major cities with electronics preference
db.users.find({
  $and: [
    { status: "active" },
    { membershipType: "premium" },
    { "address.city": { $in: ["Cairo", "Alexandria"] } },
    { "preferences.categories": "electronics" }
  ]
})

// Find expensive electronics with good stock and high ratings
db.products.find({
  $and: [
    { category: "electronics" },
    { price: { $gt: 30000 } },
    { stock: { $gte: 10 } },
    { rating: { $gte: 4.0 } }
  ]
})

// Find orders with multiple expensive items from premium users
db.orders.find({
  $and: [
    { "items": { $elemMatch: { price: { $gt: 20000 } } } },
    { "items": { $size: { $gt: 1 } } }
  ]
})

// Find users with complete profiles and specific preferences
db.users.find({
  $and: [
    { phone: { $exists: true } },
    { "address.coordinates": { $exists: true } },
    { "preferences.categories": { $size: { $gte: 2 } } },
    { age: { $gte: 18 } }
  ]
})

// Advanced: Find products with complex criteria
db.products.find({
  $and: [
    { category: { $in: ["electronics", "smartphones"] } },
    { price: { $gte: 10000, $lte: 100000 } },
    { stock: { $gt: 0 } },
    { 
      $or: [
        { brand: { $in: ["Apple", "Samsung", "Huawei"] } },
        { tags: { $all: ["5g", "premium"] } }
      ]
    },
    { "reviews.rating": { $gte: 4.0 } }
  ]
})

// Advanced: Find high-value customers with specific behavior
db.users.find({
  $and: [
    { status: "active" },
    { age: { $gte: 25, $lte: 65 } },
    { 
      $or: [
        { "preferences.categories": { $size: { $gte: 3 } } },
        { membershipType: "premium" }
      ]
    },
    { "address.city": { $exists: true } },
    { phone: { $exists: true } }
  ]
})

// Advanced: Find orders with delivery optimization criteria
db.orders.find({
  $and: [
    { status: { $in: ["pending", "processing"] } },
    { total: { $gte: 5000 } },
    { 
      $or: [
        { "shipping.method": "express" },
        { "payment.method": "credit_card" }
      ]
    },
    { "items": { $elemMatch: { quantity: { $gte: 2 } } } }
  ]
})
`,
						},
						{
							title: 'Advanced Query Patterns & Best Practices',
							description:
								'Professional query patterns and optimization techniques',
							code: `// 1. Efficient Range Queries with Indexes
// GOOD: Use compound index efficiently
db.products.find({
  category: "electronics",      // Equality first
  brand: "Apple",              // Equality second
  price: { $gte: 30000, $lte: 100000 }  // Range last
}).sort({ price: 1 })

// 2. Pagination with Skip and Limit
db.products.find({ category: "electronics" })
  .sort({ price: -1 })
  .skip(20)                    // Skip first 20 results
  .limit(10)                   // Return next 10

// 3. Projection for Performance
db.users.find(
  { "address.city": "Cairo" },
  { 
    name: 1, 
    email: 1, 
    "address.city": 1,
    _id: 0                      // Exclude _id for better performance
  }
)

// 4. Aggregation-like queries with $expr
db.orders.find({
  $expr: {
    $and: [
      { $gte: ["$total", 10000] },
      { $lte: [{ $divide: [{ $subtract: ["$deliveryDate", "$orderDate"] }, 1000 * 60 * 60 * 24] }, 7] }
    ]
  }
})

// 5. Text Search with Filters
db.products.find({
  $text: { $search: "smartphone" },
  category: "electronics",
  price: { $gte: 10000 }
}).sort({ score: { $meta: "textScore" } })

// 6. Geospatial Queries
db.users.find({
  "address.location": {
    $nearSphere: {
      $geometry: {
        type: "Point",
        coordinates: [31.2357, 30.0444]  // Cairo coordinates
      },
      $maxDistance: 10000  // 10km radius
    }
  },
  status: "active"
})

// 7. Array Element Matching with Multiple Conditions
db.products.find({
  reviews: {
    $elemMatch: {
      rating: { $gte: 4 },
      "comment": { $regex: /excellent|great|amazing/i },
      "date": { $gte: new Date("2023-01-01") }
    }
  }
})

// 8. Existence and Type Checking
db.users.find({
  $and: [
    { email: { $exists: true, $type: "string" } },
    { phone: { $exists: true, $type: "string" } },
    { "address.coordinates": { $exists: true, $type: "array" } }
  ]
})

// 9. Complex Logical Operations
db.products.find({
  $and: [
    { category: "electronics" },
    {
      $or: [
        { brand: { $in: ["Apple", "Samsung"] } },
        { price: { $gte: 50000 } },
        { tags: { $all: ["premium", "5g"] } }
      ]
    },
    { stock: { $gt: 0 } }
  ]
})

// 10. Performance Monitoring Queries
// Check if query uses index
db.products.find({
  category: "electronics",
  price: { $gte: 30000 }
}).explain("executionStats")

// Monitor slow queries
db.system.profile.find({
  "ns": "TechMart.products",
  "millis": { $gt: 100 }
}).sort({ ts: -1 }).limit(10)
`,
						},
						{
							title: 'Bulk Operations & Batch Processing',
							description: 'Efficient bulk operations for large datasets',
							code: `// 1. Bulk Write Operations
const bulkOps = [
  {
    updateOne: {
      filter: { name: "iPhone 15 Pro" },
      update: { $inc: { stock: 5 } }
    }
  },
  {
    updateOne: {
      filter: { name: "Samsung Galaxy S24" },
      update: { $set: { price: 35000 } }
    }
  },
  {
    insertOne: {
      document: {
        name: "Google Pixel 8",
        category: "electronics",
        price: 28000,
        stock: 15
      }
    }
  }
];

db.products.bulkWrite(bulkOps);

// 2. Batch Updates with Conditions
db.products.updateMany(
  { 
    category: "electronics",
    stock: { $lt: 10 },
    price: { $gte: 20000 }
  },
  { 
    $set: { 
      stockStatus: "critical",
      lastRestockDate: new Date()
    }
  }
);

// 3. Bulk Array Operations
db.users.updateMany(
  { "preferences.categories": { $exists: true } },
  { 
    $addToSet: { 
      "preferences.categories": { 
        $each: ["electronics", "fashion"] 
      } 
    }
  }
);

// 4. Conditional Bulk Updates
db.products.updateMany(
  { category: "electronics" },
  [
    {
      $set: {
        priceCategory: {
          $switch: {
            branches: [
              { case: { $gte: ["$price", 50000] }, then: "premium" },
              { case: { $gte: ["$price", 20000] }, then: "mid-range" },
              { case: { $gte: ["$price", 5000] }, then: "budget" }
            ],
            default: "economy"
          }
        }
      }
    }
  ]
);

// 5. Bulk Data Cleanup
db.products.updateMany(
  { "reviews.rating": { $lt: 1 } },
  { $pull: { reviews: { rating: { $lt: 1 } } } }
);

// 6. Batch Status Updates
db.orders.updateMany(
  { 
    status: "pending",
    orderDate: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
  },
  { $set: { status: "cancelled", cancellationReason: "timeout" } }
);

// 7. Bulk Field Addition
db.users.updateMany(
  { "preferences.categories": { $exists: true } },
  { 
    $set: { 
      "preferences.lastUpdated": new Date(),
      "preferences.version": 2
    }
  }
);

// 8. Performance Monitoring for Bulk Operations
const startTime = new Date();
const result = db.products.updateMany(
  { category: "electronics" },
  { $inc: { viewCount: 1 } }
);
const endTime = new Date();

print("Updated " + result.modifiedCount + " documents");
print("Time taken: " + (endTime - startTime) + " ms");
`,
						},
					],
				},
			},
		},
		{
			id: 2,
			title: 'Aggregation Framework',
			duration: '60 min',
			icon: <BarChart3 className='w-6 h-6' />,
			content: {
				description:
					"Learn how to process and analyze your data with MongoDB's powerful Aggregation Framework.",
				explanation: `The Aggregation Framework is one of MongoDB's most powerful features. It allows you to process data records and return computed results. Think of it as a data processing pipeline, where documents from a collection pass through multiple stages, being transformed at each step.

This is essential for tasks like generating reports, performing complex data analysis, and transforming data for different application needs.`,
				topics: [
					'Understanding aggregation pipelines and stages.',
					'Filtering data with `$match`.',
					'Grouping and aggregating data with `$group`.',
					'Reshaping documents with `$project`.',
					'Sorting and limiting results with `$sort` and `$limit`.',
					'Deconstructing arrays with `$unwind`.',
					'Joining collections with `$lookup`.',
					'Building a complete, multi-stage pipeline.',
				],
				project: {
					examples: [
						{
							title: 'The $match Stage: Filtering Documents',
							description:
								'`$match` is like the `find()` method, but for the aggregation pipeline. It filters documents to pass only those that match the specified condition(s) to the next pipeline stage.',
							code: `// Find all products in the 'electronics' category with a price less than 500
  db.products.aggregate([
    { 
      $match: { 
        category: "electronics",
        price: { $lt: 500 } 
      } 
    }
  ])`,
						},
						{
							title: 'The $group Stage: Grouping and Aggregating',
							description:
								'`$group` separates documents into groups according to a specified "group key". It can then perform aggregate functions on each group, like calculating sums, averages, or counting documents.',
							code: `// Group products by category and calculate the number of products and average price for each category
  db.products.aggregate([
    {
      $group: {
        _id: "$category", // The field to group by
        numProducts: { $sum: 1 }, // Count documents in each group
        avgPrice: { $avg: "$price" } // Calculate the average price for each group
      }
    }
  ])`,
						},
						{
							title: 'The $project Stage: Reshaping Documents',
							description:
								'`$project` is used to reshape documents. You can include, exclude, or rename fields, and even create new computed fields.',
							code: `// Show only the product name and price, and add a new field 'salePrice'
  db.products.aggregate([
    { $match: { category: "laptops" } },
    { 
      $project: { 
        _id: 0, // Exclude the default _id field
        productName: "$name", // Rename 'name' to 'productName'
        price: 1, // Include the 'price' field
        salePrice: { $multiply: ["$price", 0.8] } // Add a new field 'salePrice' with a 20% discount
      } 
    }
  ])`,
						},
						{
							title: 'The $sort and $limit Stages: Ordering and Pagination',
							description:
								'`$sort` orders documents, while `$limit` restricts the number of documents passed to the next stage. They are often used together for "top N" queries.',
							code: `// Find the 5 most expensive electronics, sorted by price descending
  db.products.aggregate([
    { $match: { category: "electronics" } },
    { $sort: { price: -1 } }, // Sort by price in descending order
    { $limit: 5 } // Pass only the first 5 documents to the next stage
  ])`,
						},
						{
							title: 'The $unwind Stage: Deconstructing Arrays',
							description:
								'`$unwind` deconstructs an array field from the input documents to output a document for each element. This is useful for processing individual array items.',
							code: `// Create a separate document for each tag in a product's 'tags' array
  db.products.aggregate([
    { $match: { name: "Pro Smartphone" } },
    { $unwind: "$tags" }
  ])
  
  /* 
  If the original product was:
  { name: "Pro Smartphone", tags: ["camera", "4k", "fast"] }
  
  The output will be 3 documents:
  { name: "Pro Smartphone", tags: "camera" }
  { name: "Pro Smartphone", tags: "4k" }
  { name: "Pro Smartphone", tags: "fast" }
  */`,
						},
						{
							title: 'The $lookup Stage: Joining Collections',
							description:
								'`$lookup` performs a left outer join to another collection, allowing you to combine data from multiple collections in a single pipeline.',
							code: `// For each order, find the customer details from the 'users' collection
  db.orders.aggregate([
    {
      $lookup: {
        from: "users", // The collection to join with
        localField: "customerId", // Field from the input documents (orders)
        foreignField: "_id", // Field from the documents of the "from" collection (users)
        as: "customerDetails" // The name for the new array field to add
      }
    }
  ])`,
						},
						{
							title: 'Putting It All Together: A Multi-Stage Pipeline',
							description:
								'This example combines multiple stages to perform a more complex analysis: find the total revenue per category for products that have been reviewed, and sort the results.',
							code: `// A pipeline to calculate total revenue per product category
  db.products.aggregate([
    // Stage 1: Filter for products that have at least one review
    {
      $match: { 
        "reviews.0": { $exists: true } 
      }
    },
  
    // Stage 2: Group by category and calculate total value of sold items
    // (Assuming 'sold' field tracks number of units sold)
    {
      $group: {
        _id: "$category",
        totalRevenue: { $sum: { $multiply: ["$price", "$sold"] } }
      }
    },
    
    // Stage 3: Sort the categories by total revenue in descending order
    {
      $sort: { 
        totalRevenue: -1 
      }
    },
  
    // Stage 4: Reshape the output for clarity
    {
      $project: {
        _id: 0,
        category: "$_id",
        revenue: "$totalRevenue"
      }
    }
  ])`,
						},
					],
				},
			},
		},
		{
			id: 3,
			title: 'Indexing & Performance',
			duration: '50 min',
			icon: <Zap className='w-6 h-6' />,
			content: {
				description:
					'Optimize MongoDB performance through strategic indexing, query optimization, and performance monitoring.',
				explanation: `Indexing in MongoDB is a data structure that improves the speed of data retrieval operations by providing quick access to documents based on specific field values. Think of indexes as the table of contents in a book - instead of reading through every page to find what you need, you can quickly jump to the right section.

What is Indexing?
• Data Structure: Special data structures that store a subset of document data
• Performance Boost: Dramatically reduces query execution time
• Storage Trade-off: Indexes consume additional disk space and memory
• Write Impact: Indexes slightly slow down write operations (insert/update/delete)

Types of Indexes:
• Single Field Indexes: Index on one field (most common)
• Compound Indexes: Index on multiple fields in a specific order
• Multikey Indexes: Automatically created for array fields
• Geospatial Indexes: For location-based queries (2dsphere, 2d)
• Text Indexes: For full-text search capabilities
• Hashed Indexes: For hash-based sharding
• Sparse Indexes: Only include documents that have the indexed field
• Partial Indexes: Only include documents that match a filter expression
• TTL Indexes: Automatically delete documents after a specified time

Performance Impact:
• Query Speed: Can reduce query time from seconds to milliseconds
• Memory Usage: Indexes are kept in memory for fast access
• Storage Space: Each index requires additional disk space
• Write Performance: Each index must be updated on write operations`,
				topics: [
					'Index types and creation',
					'Query optimization',
					'Explain plans and profiling',
					'Compound and partial indexes',
				],
				project: {
					title: 'TechMart Performance Optimization',
					description:
						'Complete indexing strategy and performance monitoring for the e-commerce platform',
					examples: [
						{
							title: 'Strategic Index Creation',
							description:
								'Comprehensive indexing strategy for TechMart collections',
							code: `// TechMart Index Strategy - Create all essential indexes

// Users Collection Indexes
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ status: 1, "address.city": 1, age: 1 }) // ESR Rule
db.users.createIndex({ "address.location": "2dsphere" })
db.users.createIndex({ phone: 1 }, { sparse: true })
db.users.createIndex({ registrationDate: -1 })
db.users.createIndex({ "preferences.categories": 1 })

// Products Collection Indexes  
db.products.createIndex({ category: 1, price: 1 })
db.products.createIndex({ brand: 1, category: 1 })
db.products.createIndex({ tags: 1 }) // Multikey index for array
db.products.createIndex({ name: "text", description: "text" })
db.products.createIndex({ "warehouse.location": "2dsphere" })
db.products.createIndex({ price: -1, stock: -1 })
db.products.createIndex({ "reviews.rating": -1 })

// Orders Collection Indexes
db.orders.createIndex({ customerId: 1, orderDate: -1 })
db.orders.createIndex({ status: 1, orderDate: -1 })
db.orders.createIndex({ orderNumber: 1 }, { unique: true })
db.orders.createIndex({ "items.productId": 1 })
db.orders.createIndex({ 
  status: 1, 
  orderDate: -1, 
  total: -1 
}) // Compound for reporting

// Partial Indexes for optimization
db.orders.createIndex(
  { customerId: 1, deliveryDate: -1 },
  { 
    partialFilterExpression: { 
      status: { $in: ["delivered", "completed"] } 
    }
  }
)

db.products.createIndex(
  { category: 1, price: 1 },
  { 
    partialFilterExpression: { 
      stock: { $gt: 0 } 
    }
  }
)

// TTL Index for user sessions
db.sessions.createIndex(
  { lastActivity: 1 },
  { expireAfterSeconds: 86400 } // 24 hours
)`,
						},
						{
							title: 'Query Performance Analysis',
							description: 'Analyze and optimize TechMart query performance',
							code: `// Performance Analysis for TechMart Queries

// 1. Analyze product search query
db.products.find({
  category: "electronics",
  price: { $gte: 1000, $lte: 50000 },
  stock: { $gt: 0 }
}).sort({ price: 1 }).explain("executionStats")

// Expected result with proper indexing:
// {
//   "executionStats": {
//     "stage": "IXSCAN",           // Index scan (good)
//     "indexName": "category_1_price_1",
//     "totalDocsExamined": 50,     // Low examination
//     "totalDocsReturned": 50,     // Good ratio
//     "executionTimeMillis": 5     // Fast execution
//   }
// }

// 2. Analyze customer order history query
db.orders.find({
  customerId: ObjectId("64a1b2c3d4e5f6789abcdef0"),
  status: { $in: ["delivered", "completed"] }
}).sort({ orderDate: -1 }).explain("executionStats")

// 3. Geographic customer query analysis
db.users.find({
  "address.location": {
    $nearSphere: {
      $geometry: {
        type: "Point",
        coordinates: [31.2357, 30.0444]
      },
      $maxDistance: 10000
    }
  },
  status: "active"
}).explain("executionStats")

// 4. Text search performance
db.products.find({
  $text: { $search: "iPhone smartphone" },
  category: "electronics"
}).explain("executionStats")

// Performance optimization techniques:

// GOOD: Use indexes effectively
db.products.find({
  category: "electronics",      // Index prefix
  brand: "Apple",              // Index continuation  
  price: { $gte: 30000 }       // Range at end
})

// BAD: Cannot use compound index efficiently
db.products.find({
  price: { $gte: 30000 },      // Range first
  category: "electronics"      // Equality after range
})

// GOOD: Projection to reduce data transfer
db.users.find(
  { "address.city": "Cairo", status: "active" },
  { 
    name: 1, 
    email: 1, 
    "address.city": 1,
    _id: 0 
  }
)

// GOOD: Limit results for pagination
db.products.find({ category: "electronics" })
  .sort({ price: -1 })
  .skip(20)
  .limit(10)`,
						},
						{
							title: 'Database Profiling & Monitoring',
							description:
								'Monitor TechMart database performance in production',
							code: `// Production Monitoring Setup for TechMart

// 1. Enable profiling for slow operations (>50ms for production)
db.setProfilingLevel(1, { slowms: 50 })

// 2. Monitor slow queries
db.system.profile.find({
  "ns": { $regex: "TechMart\\." },
  "millis": { $gt: 100 }
}).sort({ ts: -1 }).limit(10)

// 3. Find queries that don't use indexes
db.system.profile.find({
  "planSummary": "COLLSCAN",
  "ns": { $regex: "TechMart\\." }
}).sort({ ts: -1 })

// 4. Analyze index usage statistics
db.products.aggregate([
  { $indexStats: {} }
]).forEach(stat => {
  print("Index: " + stat.name);
  print("Usage count: " + stat.accesses.ops);
  print("Since: " + stat.accesses.since);
  print("---");
})

// 5. Monitor collection statistics
function analyzeCollection(collectionName) {
  const stats = db[collectionName].stats();
  return {
    collection: collectionName,
    documentCount: stats.count,
    avgDocSize: Math.round(stats.avgObjSize),
    totalSize: Math.round(stats.size / 1024 / 1024) + " MB",
    indexSize: Math.round(stats.totalIndexSize / 1024 / 1024) + " MB",
    indexCount: stats.nindexes
  };
}

// Analyze all TechMart collections
["users", "products", "orders"].forEach(collection => {
  printjson(analyzeCollection(collection));
});

// 6. Real-time performance monitoring query
db.currentOp({
  "active": true,
  "ns": { $regex: "TechMart\\." },
  "secs_running": { $gt: 5 }
})

// 7. Index efficiency analysis
function analyzeIndexEfficiency() {
  const collections = ["users", "products", "orders"];
  
  collections.forEach(collName => {
    print("\\n=== " + collName + " ===");
    
    db[collName].getIndexes().forEach(index => {
      const indexName = index.name;
      if (indexName === "_id_") return;
      
      // Get index stats
      const stats = db[collName].aggregate([
        { $indexStats: {} },
        { $match: { name: indexName } }
      ]).toArray()[0];
      
      if (stats) {
        print("Index: " + indexName);
        print("Usage: " + stats.accesses.ops + " operations");
        print("Size: " + Math.round(index.size / 1024) + " KB");
        
        // Check if index is being used
        if (stats.accesses.ops === 0) {
          print("⚠️  WARNING: Unused index - consider dropping");
        }
      }
    });
  });
}

analyzeIndexEfficiency();`,
						},
						{
							title: 'Advanced Index Strategies',
							description:
								'Specialized indexing techniques for complex scenarios',
							code: `// Advanced Indexing Strategies for TechMart

// 1. Compound Index with ESR Rule
// Query: Active users in specific cities, sorted by registration date, age > 18
db.users.createIndex({
  status: 1,              // Equality (E)
  "address.city": 1,      // Equality (E)  
  registrationDate: -1,   // Sort (S)
  age: 1                  // Range (R)
})

// This index supports multiple query patterns:
// - Find by status only: ✅ Uses index
// - Find by status + city: ✅ Uses index  
// - Find by status + city + sort by date: ✅ Uses index
// - Find by status + city + age range + sort: ✅ Full index usage

// 2. Partial Index for active premium customers
db.users.createIndex(
  { 
    "preferences.categories": 1,
    "address.governorate": 1 
  },
  { 
    partialFilterExpression: {
      $and: [
        { status: "active" },
        { "preferences.notifications": true },
        { registrationDate: { $gte: new Date("2023-01-01") } }
      ]
    }
  }
)

// 3. Sparse Index for optional fields
db.users.createIndex(
  { phone: 1 },
  { 
    sparse: true,
    unique: true 
  }
)

// 4. Case-insensitive text index with weights
db.products.createIndex(
  {
    name: "text",
    description: "text",
    "specifications.brand": "text"
  },
  {
    weights: {
      name: 10,           // Name has highest weight
      description: 5,     // Description medium weight  
      "specifications.brand": 8  // Brand high weight
    },
    default_language: "english",
    language_override: "language"
  }
)

// 5. Geospatial compound index for delivery optimization
db.orders.createIndex({
  "shipping.address.location": "2dsphere",
  status: 1,
  orderDate: -1
})

// This supports location + status queries:
db.orders.find({
  "shipping.address.location": {
    $nearSphere: {
      $geometry: {
        type: "Point",
        coordinates: [31.2357, 30.0444]
      },
      $maxDistance: 5000
    }
  },
  status: "pending"
}).sort({ orderDate: -1 })

// 6. Time-series index for analytics
db.orderAnalytics.createIndex({
  date: 1,
  "metrics.category": 1,
  "metrics.city": 1
})

// 7. Background index creation for production
db.products.createIndex(
  { brand: 1, category: 1, price: -1 },
  { background: true }  // Don't block other operations
)

// 8. Index with collation for Arabic text
db.products.createIndex(
  { nameArabic: 1 },
  { 
    collation: { 
      locale: "ar", 
      strength: 2 
    }
  }
)`,
						},
					],
				},
			},
		},
	];

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
								<h1 className='text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6'>
									Day 2
								</h1>
								<h2 className='text-3xl md:text-5xl font-bold text-[#13AA52] mb-8'>
									Advanced MongoDB & Real-World Applications
								</h2>
								<p className='text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed'>
									Master advanced MongoDB concepts including complex queries,
									aggregation pipelines, indexing strategies, and performance
									optimization techniques for production environments.
								</p>

								<motion.button
									onClick={scrollToContent}
									className='inline-flex items-center gap-2 bg-[#13AA52] hover:bg-[#0F8A42] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}>
									<ChevronDown className='w-5 h-5' />
									Explore Day 2 Content
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
									3 intensive sessions covering advanced MongoDB techniques and
									optimization
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

												{/* Explanation */}
												{session.content.explanation && (
													<div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6'>
														<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
															<Target className='w-5 h-5 text-blue-600 dark:text-blue-400' />
															Detailed Explanation
														</h5>
														<div className='text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line'>
															{session.content.explanation}
														</div>
													</div>
												)}

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

												{/* Examples for each session */}
												{session.content?.project?.examples && (
													<div className='space-y-6'>
														{session.content.project.examples.map(
															(example, exampleIndex) => (
																<div
																	key={exampleIndex}
																	className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6'>
																	<h5 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
																		{example.title}
																	</h5>
																	<p className='text-gray-600 dark:text-gray-300 mb-6'>
																		{example.description}
																	</p>
																	<SyntaxHighlighter
																		language='javascript'
																		style={tomorrow}
																		customStyle={{
																			background: 'transparent',
																			fontSize: '14px',
																			borderRadius: '8px',
																		}}>
																		{example.code}
																	</SyntaxHighlighter>
																</div>
															)
														)}
													</div>
												)}

												{/* Try It Box for each session */}
												<div className='bg-gradient-to-r from-[#13AA52]/20 to-blue-500/20 border border-[#13AA52]/30 rounded-xl p-6'>
													<div className='flex items-center gap-3 mb-4'>
														<Play className='w-6 h-6 text-[#13AA52]' />
														<h5 className='text-lg font-semibold text-gray-900 dark:text-white'>
															Practice These Concepts
														</h5>
													</div>
													<p className='text-gray-600 dark:text-gray-300 mb-4'>
														Practice these {session.title.toLowerCase()}{' '}
														techniques in your MongoDB environment to reinforce
														your learning.
													</p>
													<button className='inline-flex items-center gap-2 bg-[#13AA52] hover:bg-[#0F8A42] text-white px-4 py-2 rounded-lg font-medium transition-colors'>
														<Database className='w-4 h-4' />
														Open MongoDB Shell
													</button>
												</div>
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
										Take a 15-minute break to process these advanced concepts
										before moving on!
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
									Day 2 Summary
								</h3>
								<div className='grid md:grid-cols-2 gap-8'>
									<div>
										<h4 className='text-xl font-semibold text-[#13AA52] mb-4'>
											What You've Mastered
										</h4>
										<ul className='space-y-3'>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#13AA52] mt-0.5 flex-shrink-0' />
												<span>
													Advanced querying with complex operators and regular
													expressions
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#13AA52] mt-0.5 flex-shrink-0' />
												<span>
													Aggregation pipelines for complex data transformations
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#13AA52] mt-0.5 flex-shrink-0' />
												<span>
													Strategic indexing and performance optimization
													techniques
												</span>
											</li>
											<li className='flex items-start gap-3 text-gray-600 dark:text-gray-300'>
												<CheckCircle className='w-5 h-5 text-[#13AA52] mt-0.5 flex-shrink-0' />
												<span>
													Query analysis and profiling for production
													environments
												</span>
											</li>
										</ul>
									</div>
									<div>
										<h4 className='text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4'>
											Ready for Production
										</h4>
										<p className='text-gray-600 dark:text-gray-300 mb-6'>
											You now have the advanced skills needed to build
											efficient, scalable MongoDB applications in production
											environments. These techniques will help you handle
											complex data scenarios and optimize performance at scale.
										</p>
										<div className='flex gap-4'>
											<button className='inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
												Course Resources
												<TrendingUp className='w-5 h-5' />
											</button>
											<button className='inline-flex items-center gap-2 bg-[#13AA52] hover:bg-[#0F8A42] text-white px-6 py-3 rounded-lg font-semibold transition-colors'>
												Practice Labs
												<Target className='w-5 h-5' />
											</button>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</section>
				</Suspense>
			</main>
		</div>
	);
}
