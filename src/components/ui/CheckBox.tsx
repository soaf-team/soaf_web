import { Checked, CheckIcon, NoneCheck } from '@/assets';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	label?: React.ReactNode;
	isChecked?: boolean;
}

const CheckBox = ({
	style,
	className = '',
	label,
	isChecked = false,
	onClick,
	...props
}: Props) => {
	return (
		<div className="flex items-center gap-[8px]">
			<div
				className={`${className} w-6 h-6 rounded-lg flex items-center justify-center
                    ${isChecked ? 'bg-main_gradient' : 'bg-gray100'}
        `}
			>
				<button
					type="button"
					className="flex items-center"
					style={style}
					onClick={onClick}
					{...props}
				>
					<img src={CheckIcon} width={15} alt="checkbox" />
				</button>
			</div>

			{label && <span>{label}</span>}
		</div>
	);
};

const Check = ({ isChecked, label, onClick, className, ...props }: Props) => {
	return (
		<div className="flex items-center gap-[8px]">
			<button type="button" className={className} onClick={onClick} {...props}>
				<img
					src={isChecked ? Checked : NoneCheck}
					width={24}
					alt="check-icon"
				/>
			</button>

			{label && <span>{label}</span>}
		</div>
	);
};

export { CheckBox, Check };
