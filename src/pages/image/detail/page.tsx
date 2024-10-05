/* eslint-disable react/prop-types */

import { PageLayout, XButton } from '@/components';
import { ActivityComponentType } from '@stackflow/react';

type ImageDetailPageParams = {
	src: string;
	alt: string;
};

const ImageDetailPage: ActivityComponentType<ImageDetailPageParams> = ({
	params,
}) => {
	const { src, alt } = params;

	return (
		<PageLayout
			header={{
				rightSlot: <XButton />,
			}}
			className="px-0 flex flex-col items-center pb-[56px]"
		>
			<img src={src} alt={alt} className="w-full" />
		</PageLayout>
	);
};

export default ImageDetailPage;

ImageDetailPage.displayName = 'ImageDetailPage';
