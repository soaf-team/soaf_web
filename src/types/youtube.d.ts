export interface Youtube {
	kind: string;
	etag: string;
	items: Item[];
	pageInfo: PageInfo;
}

export interface Item {
	kind: string;
	etag: string;
	id: string;
	snippet: Snippet;
}

export interface Snippet {
	publishedAt: string;
	channelId: string;
	title: string;
	description: string;
	thumbnails: Thumbnails;
	channelTitle: string;
	categoryId: string;
	liveBroadcastContent: string;
	localized: Localized;
	defaultAudioLanguage: string;
}

export interface Thumbnails {
	default: Thumbnail;
	medium: Thumbnail;
	high: Thumbnail;
	standard: Thumbnail;
	maxres: Thumbnail;
}

export interface Thumbnail {
	url: string;
	width: number;
	height: number;
}

export interface Localized {
	title: string;
	description: string;
}

export interface PageInfo {
	totalResults: number;
	resultsPerPage: number;
}
