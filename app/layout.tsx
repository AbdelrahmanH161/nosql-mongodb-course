import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeProvider from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Learn NoSQL & MongoDB in 2 Days | Professional Course',
	description:
		'Master MongoDB and NoSQL databases with our comprehensive 2-day intensive course. Hands-on learning with real-world projects.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<ThemeProvider>
					<Navbar />
					{children}
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
