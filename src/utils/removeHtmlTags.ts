export function removeHtmlTags(input: string) {
	return input.replace(/<[^>]*>/g, '');
}
