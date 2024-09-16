import { useEffect } from 'react';

import { create } from 'zustand';

type BottomTabStore = {
	isOpen: boolean;
	handleOpen: () => void;
	handleClose: () => void;
};

const useBottomTab = create<BottomTabStore>((set) => ({
  isOpen: !window.location.pathname.includes("myHome"),
  handleOpen: () => set({ isOpen: true }),
  handleClose: () => set({ isOpen: false }),
}));

export const useBottomTabStore = () => {
	const { isOpen, handleOpen, handleClose } = useBottomTab();

  useEffect(() => {
    if (window.location.pathname.includes("myHome")) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [handleOpen, handleClose, window.location.pathname]);

	return { isOpen, handleOpen, handleClose };
};
