export interface MusicList {
	results: Music[];
}

export interface Music {
	'opensearch:Query': OpensearchQuery;
	'opensearch:totalResults': string;
	'opensearch:startIndex': string;
	'opensearch:itemsPerPage': string;
	albummatches: Albummatches;
	'@attr': Attr;
}

interface OpenSearchQuery {
	#text: string;
	role: string;
	searchTerms: string;
	startPage: string;
}

interface Albummatches {
	album: Album[];
}

interface Album {
	name: string;
	artist: string;
	url: string;
	image: AlbumImage[];
	streamable: string;
	mbid: string;
}

interface AlbumImage {
	'#text': string;
	size: string;
}

interface Attr {
	for: string;
}

export interface AlbumDetail {
	album: IAlbumDetail;
}

interface IAlbumDetail {
	artist: string;
	mbid: string;
	tags: Tag;
	name: string;
	image: AlbumImage[];
	tracks: Track[];
}

interface Tag {
	name: string;
	url: string;
}

export interface MyMusic {
	_id: string;
	category: string;
	review?: string;
	content: MusicContent;
	userId: string;
	createdAt: string;
	updatedAt: string;
}

// 백엔드에 전달할 데이터 타입
export interface MusicContent {
	imageUrl: string;
	title: string;
	artist: string;
}
