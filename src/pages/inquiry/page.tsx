import { BackButton, PageLayout } from '@/components';

const InquiryPage = () => {
	return (
		<PageLayout
			header={{
				title: <h2 className="head6b">문의하기</h2>,
				leftSlot: {
					component: <BackButton />,
				},
			}}
		>
			<div className="w-full h-full">
				<iframe
					src="https://docs.google.com/forms/d/e/1FAIpQLSfgiLGQcR7eZZysDroNSjN37dzxZ57A2JL3Eo9x048RJsbfHw/viewform?embedded=true"
					className="w-full h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
					title="inquiry"
					allowFullScreen
				/>
			</div>
		</PageLayout>
	);
};

export default InquiryPage;
InquiryPage.displayName = 'InquiryPage';
