import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/utils';
import { DeleteInput } from '@/assets';

const inputVariants = cva(
	`flex items-center bg-transparent gap-[4px] w-full text-gray600`,
	{
		variants: {
			variant: {
				box: 'border-gray100 border border-solid rounded-[16px] p-[12px]',
				underline: 'border-b-2 border-primary border-solid',
				ghost: '',
			},
			size: {
				lg: 'h-[52px] label1',
				md: 'h-[48px] label2',
				sm: 'h-[44px] body2',
			},
		},
	},
);

type InputProps = {
	variant?: 'box' | 'underline' | 'ghost';
	size?: 'md' | 'sm' | 'lg';
	className?: string;
	leftSlot?: React.ReactNode;
	rightSlot?: React.ReactNode | 'reset';
	value: string;
	onChange: (value: string) => void;
	isResetButton?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'>;

const Input = (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
	const {
		variant = 'underline',
		size = 'md',
		className,
		leftSlot,
		rightSlot,
		value,
		onChange,
		isResetButton,
		...rest
	} = props;

	const isValue = !!value;

	return (
		<div className={cn(inputVariants({ variant, size, className }))}>
			{leftSlot != null ? leftSlot : null}
			<input
				ref={ref}
				{...rest}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="outline-none shadow-none border-none appearance-none bg-transparent flex-1 placeholder:text-gray300"
			/>
			{isResetButton && (
				<ResetButton
					visible={isValue}
					onClick={() => {
						onChange('');
						//@ts-ignore
						ref?.current.focus();
					}}
				/>
			)}
			{rightSlot != null ? rightSlot : null}
		</div>
	);
};

const _Input = forwardRef<HTMLInputElement, InputProps>(Input);
export { _Input as Input };

type ResetButtonProps = {
	visible: boolean;
	onClick: () => void;
};

const ResetButton = ({ visible, onClick }: ResetButtonProps) => {
	if (!visible) return null;
	return <img src={DeleteInput} alt="reset_icon" onClick={onClick} />;
};
