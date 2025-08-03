'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
	return (
		<footer className='bg-gray-900 dark:bg-gray-950 text-white py-16'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid md:grid-cols-3 gap-8'>
					{/* Contact Info */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}>
						<h3 className='text-xl font-bold mb-6'>Contact Information</h3>
						<div className='space-y-4'>
							<div className='flex items-center space-x-3'>
								<Mail className='w-5 h-5 text-[#13AA52]' />
								<span>geo.abdelrahmanem@gmail.com</span>
							</div>
							<div className='flex items-center space-x-3'>
								<Phone className='w-5 h-5 text-[#13AA52]' />
								<span>+201115275161</span>
							</div>
							<div className='flex items-center space-x-3'>
								<MapPin className='w-5 h-5 text-[#13AA52]' />
								<span>Aswan, Egypt</span>
							</div>
						</div>
					</motion.div>

					{/* Quick Links */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}>
						<h3 className='text-xl font-bold mb-6'>Quick Links</h3>
						<div className='space-y-2'>
							{[
								{
									name: 'Home',
									href: '/',
								},
								{
									name: 'Day 1',
									href: '/day-1',
								},
								{
									name: 'Day 2',
									href: '/day-2',
								},
							].map((link) => (
								<a
									key={link.name}
									href={link.href}
									className='block text-gray-400 hover:text-[#13AA52] transition-colors'>
									{link.name}
								</a>
							))}
						</div>
					</motion.div>

					{/* About */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}>
						<h3 className='text-xl font-bold mb-6'>About This Course</h3>
						<p className='text-gray-400 leading-relaxed'>
							A comprehensive 2-day intensive course designed to take you from
							MongoDB beginner to confident practitioner with hands-on
							experience and real-world projects.
						</p>
					</motion.div>
				</div>

				<div className='border-t border-gray-800 mt-12 pt-8 text-center'>
					<p className='text-gray-400'>
						© 2025 MongoDB Course by Abdelrahman Hossam. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
