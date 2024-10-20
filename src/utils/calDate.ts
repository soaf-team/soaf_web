import dayjs from 'dayjs';

export const detailDate = (date: string) => {
	const now = dayjs();
	const targetDate = dayjs(date);
	const years = now.diff(targetDate, 'year');
	targetDate.add(years, 'years');

	if (years > 1) return `${years}년 전`;

	const months = now.diff(targetDate, 'month');
	targetDate.add(months, 'months');

	if (months > 1) return `${months}개월 전`;

	const weeks = now.diff(targetDate, 'week');
	targetDate.add(weeks, 'weeks');

	if (weeks > 1) return `${weeks}주 전`;

	const days = now.diff(targetDate, 'day');
	targetDate.add(days, 'days');

	if (days > 1) return `${days}일 전`;

	const hours = now.diff(targetDate, 'hour');
	targetDate.add(hours, 'hours');

	if (hours > 1) return `${hours}시간 전`;

	const minutes = now.diff(targetDate, 'minute');
	targetDate.add(minutes, 'minutes');

	if (minutes > 1) return `${minutes}분 전`;

	return `방금 전`;
};

export const formatDateTime = (utcTimeString: string): string => {
	if (!utcTimeString) {
		return '오늘 오전 12:00';
	}

	const date = new Date(utcTimeString);
	const today = new Date();

	const isToday =
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear();

	if (isToday) {
		// 오늘 날짜인 경우 시간만 표시
		const timeFormatter = new Intl.DateTimeFormat('ko-KR', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		});
		return `오늘 ${timeFormatter.format(date)}`;
	} else {
		// 다른 날짜의 경우 날짜만 표시
		const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
			month: 'long',
			day: 'numeric',
		});
		return dateFormatter.format(date);
	}
};
