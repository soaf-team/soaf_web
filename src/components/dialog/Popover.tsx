import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/utils';
import { PencilIcon, TrashIcon } from '@/assets';

const Popover = DialogPrimitive.Root;
const PopoverTrigger = DialogPrimitive.Trigger;

interface CustomDialogContentProps
	extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
	triggerRef: React.RefObject<HTMLButtonElement>;
	onEdit: () => void;
	onDelete: () => void;
}

const CustomPopoverContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	CustomDialogContentProps
>(({ className, children, triggerRef, onEdit, onDelete, ...props }, ref) => {
	const [position, setPosition] = React.useState({ top: 0, right: 0 });

	React.useEffect(() => {
		const updatePosition = () => {
			if (triggerRef.current) {
				const rect = triggerRef.current.getBoundingClientRect();
				setPosition({
					top: rect.bottom + window.scrollY,
					right: window.innerWidth - (rect.right + window.scrollX),
				});
			}
		};

		updatePosition();
		window.addEventListener('resize', updatePosition);
		window.addEventListener('scroll', updatePosition);

		return () => {
			window.removeEventListener('resize', updatePosition);
			window.removeEventListener('scroll', updatePosition);
		};
	}, [triggerRef]);

	return (
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
			<DialogPrimitive.Content
				ref={ref}
				className={cn(
					'fixed z-50 rounded-[12px] bg-white px-[16px] py-[20px] shadow-lg gap-[12px] flex flex-col items-center',
					'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
					className,
				)}
				{...props}
				style={{
					top: `${position.top}px`,
					right: `${position.right}px`,
				}}
			>
				<PopoverClose className="flex gap-[4px] items-center" onClick={onEdit}>
					<span className="text-[16px] font-medium">수정</span>
					<img src={PencilIcon} alt="pencil" className="w-[14px] h-[14px]" />
				</PopoverClose>
				<hr className="w-full h-[1px] bg-gray200 border-none" />
				<PopoverClose
					className="flex gap-[4px] items-center"
					onClick={onDelete}
				>
					<span className="text-[16px] font-medium text-[#ff3c3c]">삭제</span>
					<img src={TrashIcon} alt="trash" className="w-[14px] h-[14px]" />
				</PopoverClose>
				<DialogPrimitive.Title className="sr-only">
					다이어리 수정/삭제 팝오버
				</DialogPrimitive.Title>
				<DialogPrimitive.Description className="sr-only">
					다이어리 수정/삭제 팝오버
				</DialogPrimitive.Description>
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	);
});
CustomPopoverContent.displayName = 'CustomPopoverContent';

const PopoverClose = DialogPrimitive.Close;

export { Popover, PopoverTrigger, CustomPopoverContent, PopoverClose };
