import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components';
import { OverlayProps as Props } from '@/libs';
import { cn } from '@/utils';

interface OverlayProps extends Props {
  disabled?: boolean;
}

export const Overlay = ({ resolve, reject, disabled, children }: OverlayProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleClose('confirm');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleClose = (value: any) => {
    setIsVisible(false);
    setTimeout(() =>  resolve?.(value), 300); 
  };

  const handleReject = () => {
    setIsVisible(false);
    setTimeout(() => reject?.("close"), 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            className="fixed inset-0 z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleReject}
          />
          <motion.div
            className={cn(
              'fixed bottom-0 left-0 right-0 z-[9999]',
              'pt-6 px-[18px] pb-2 max-w-window',
              'rounded-t-[28px] bg-white shadow-overlay',
            )}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }}
          >
            {children}
            <Button
                size="sm"
                onClick={() =>disabled ? {} : handleClose('confirm')}
                className={cn('w-full', disabled && 'cursor-not-allowed bg-gray100')}
              >
                확인
              </Button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};