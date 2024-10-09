export const convertToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});
};

const BASE_SIZE = 1024000; // 1MB (썸네일 작업 유무 기준 사이즈)
const COMP_SIZE = 512000; // 100KB (썸네일 작업 결과물 목표 사이즈)

export const getCompressedImgFile = (file: File): Promise<File> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement('canvas');
				let { width, height } = img;
				const size = file.size;

				if (size <= BASE_SIZE) {
					resolve(file);
					return;
				}

				const ratio = Math.sqrt(size / COMP_SIZE);
				width = width / ratio;
				height = height / ratio;

				canvas.width = width;
				canvas.height = height;
				const ctx = canvas.getContext('2d');
				ctx?.drawImage(img, 0, 0, width, height);

				canvas.toBlob(
					(blob) => {
						if (blob) {
							const compressedFile = new File([blob], file.name, {
								type: 'image/jpeg',
								lastModified: file.lastModified,
							});
							resolve(compressedFile);
						} else {
							reject(new Error('Canvas to Blob conversion failed'));
						}
					},
					'image/jpeg',
					0.9,
				);
			};
			img.onerror = reject;
			img.src = e.target?.result as string;
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
};
