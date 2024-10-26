export interface Position {
	x: number;
	y: number;
}

export type InteriorType = 'interior' | 'hobby';

export type InteriorName =
	| 'books'
	| 'movie'
	| 'music'
	| 'picture'
	| 'plant'
	| 'sofa'
	| 'windowDay'
	| 'windowNight'
	| 'youtube'
	| 'empty';

export interface Interior {
	type: InteriorType;
	_id: string;
	name: InteriorName;
	x: number;
	y: number;
	visible: boolean;
}
