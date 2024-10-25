export const extractYouTubeVideoId = (url: string): string | null => {
	const regExp =
		/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
	const match = url.match(regExp);

	if (match && match[7].length === 11) {
		return match[7];
	}

	// URL에 v 파라미터가 없는 경우, URL의 마지막 부분을 ID로 간주
	const shortUrlRegExp =
		/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
	const shortMatch = url.match(shortUrlRegExp);

	if (shortMatch && shortMatch[2].length === 11) {
		return shortMatch[2];
	}

	return null;
};
