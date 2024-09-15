import { Divider, Textarea } from "@/components";
import { cn } from "@/utils";
import { useState, useEffect, useRef } from "react";

interface Props {
  placeholder?: string;
  title: string;
  className?: string;
  data?: string;
  maxLength?: number;
}

export const ReviewSection = ({
  placeholder,
  title,
  className,
  data,
  maxLength = 1000,
}: Props) => {
  const [value, setValue] = useState(data);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "20px";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResizeTextarea();
  }, []);

  return (
    <div className="flex flex-col gap-[16px]">
      <p className="head6sb">{title}</p>

      <Textarea
        ref={textareaRef}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={maxLength}
        className={cn(
          "min-h-0 p-0 border-none rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 body2",
          className
        )}
        onInput={autoResizeTextarea}
      />

      <Divider />
    </div>
  );
};
