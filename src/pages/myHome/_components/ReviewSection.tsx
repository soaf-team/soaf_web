import { Textarea } from '@/components';
import { cn } from '@/utils';
import { useEffect, useRef } from 'react';

interface Props {
	placeholder?: string;
	title: string;
	className?: string;
	value: string;
	maxLength?: number;
	onChange: (value: string) => void;
	readOnly?: boolean;
}

export const ReviewSection = ({
	placeholder,
	title,
	className,
	value,
	maxLength = 1000,
	onChange,
	readOnly,
}: Props) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const autoResizeTextarea = () => {
		const textarea = textareaRef.current;

		if (textarea) {
			textarea.style.height = '20px';
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	};

	useEffect(() => {
		autoResizeTextarea();
	}, [value]);

	return (
		<div className="flex flex-col gap-[16px]">
			<p className="head6sb">{title}</p>

			<Textarea
				ref={textareaRef}
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				maxLength={maxLength}
				className={cn(
					'min-h-0 p-0 border-none rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 body2',
					className,
				)}
				onInput={autoResizeTextarea}
				readOnly={readOnly}
			/>

			<div className="w-full h-px bg-border" />
		</div>
	);
};
