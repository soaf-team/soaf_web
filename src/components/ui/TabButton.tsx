import { motion } from 'framer-motion';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	active?: boolean;
}

export const TabButton = ({ children, active = false, ...props }: Props) => {
	return (
		<button
			{...props}
			type="button"
			className={`flex items-center justify-center 
        relative p-[16px] w-full label2
        border-b border-gray300/20
        ${active ? 'text-black' : 'text-gray200'} 
      `}
		>
			{children}
			{active && (
				<motion.div
					layoutId="tab"
					className="absolute z-10 -bottom-[1px] h-[2px] w-full bg-primary"
				/>
			)}
		</button>
	);
};
