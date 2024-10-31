export async function getImageFromPresignedUrl(presignedUrl: string) {
	try {
		const response = await fetch(presignedUrl);
		if (!response.ok) throw new Error('이미지 다운로드 실패');

		const blob = await response.blob();
		const fileName = presignedUrl.split('/').pop() || 'image.jpg';
		const file = new File([blob], fileName, { type: blob.type });
		return file;
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}
