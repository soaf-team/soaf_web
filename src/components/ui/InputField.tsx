import {
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  ReactNode,
  useRef,
  useImperativeHandle,
  useState,
} from 'react';

import {cn} from '@/utils';
import { DeleteInput } from '@/assets';

export type InputFieldProps = {
  label?: ReactNode | string;
  rightSlot?: ReactNode;
  width?: number | string;
  containerClassName?: string;
  bottomText?: ReactNode | null;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputField = forwardRef(
  (
    {
      value: initialValue,
      onChange,
      rightSlot,
      label,
      className,
      autoComplete = 'off',
      width,
      containerClassName,
      bottomText,
      ...props
    }: InputFieldProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const isControlled = initialValue !== undefined;
    const [value, setValue] = useState(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (!isControlled) {
        setValue(newValue);
      }

      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setValue('');
      }

      onChange?.({
        target: {
          id: props.id,
          value: '',
          name: props.name,
        },
      } as React.ChangeEvent<HTMLInputElement>);

      if (innerRef) {
        innerRef.current?.focus();
      }
    };

    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    return (
      <div
        className={cn(
          'flex flex-col w-full h-full',
          containerClassName,
        )}
        style={{
          width,
        }}>
        {typeof label === 'string' ? <span className='text-sm'>{label}</span> : label}
        <div
          className={cn(
            "flex justify-between items-center",
            'py-1 min-h-[30px]',
            "border-b-2 border-solid border-gray100 focus-within:border-primary",
            className,
          )}
          style={{
            width,
          }}>
          <input
            ref={innerRef}
            value={isControlled ? initialValue : value}
            onChange={handleChange}
            autoComplete={autoComplete}
            className={cn(
              'focus:outline-none focus:placeholder:text-transparent',
              'bg-transparent placeholder:font-normal w-full',
              {'cursor-default': props.readOnly},
              {'cursor-not-allowed': props.disabled},
            )}
            disabled={props.readOnly || props.disabled}
            {...props}
          />
          {rightSlot ? (
            rightSlot
          ) : (
            <InitializeButton
              visible={
                !props.disabled &&
                !props.readOnly &&
                (isControlled ? !!initialValue : !!value)
              }
              onClick={handleClear}
            />
          )}
        </div>
        {bottomText && <div className='pt-1 pb-2 text-sm text-end font-medium'>{bottomText}</div>}
      </div>
    );
  },
);

InputField.displayName = 'InputField';

const InitializeButton = ({
  onClick,
  visible,
}: {
  onClick: () => void;
  visible: boolean;
}) => {
  if (!visible) {
    return null;
  }

  return (
    <img
      width={20}
      onClick={onClick}
      src={DeleteInput}
      alt='delete'
      className='cursor-pointer'
    />
  );
};