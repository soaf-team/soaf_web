import { useEffect, useRef } from 'react';

export const useObserver = (callback: () => void) => {
	const contentRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!contentRef.current) return;

		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				callback();
			}
		}, options);

		observer.observe(contentRef.current);

		return () => {
			observer.disconnect();
		};
	}, [callback, contentRef]);

	return contentRef;
};

const options = {
	root: null,
	rootMargin: '0px',
	threshold: 0,
};
