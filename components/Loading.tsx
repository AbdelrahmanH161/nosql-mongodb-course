export default function Loading() {
	return (
		<div className='fixed inset-0 z-[100] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm flex items-center justify-center'>
			<div className='text-center'>
				<div className='relative w-32 h-32 mx-auto mb-4 flex items-center justify-center animate-pulse'>
					<div className='w-24 h-24 bg-[#13AA52] rounded-xl flex items-center justify-center animate-spin'>
						<span className='text-white font-bold text-4xl'>M</span>
					</div>
				</div>
				<div className='text-gray-700 dark:text-gray-300 text-lg font-medium animate-fade-in'>
					Loading MongoDB Course...
				</div>
				<div className='text-gray-500 dark:text-gray-400 text-sm mt-2 animate-fade-in-delayed'>
					Please wait while we prepare your learning experience
				</div>
			</div>
		</div>
	);
}
