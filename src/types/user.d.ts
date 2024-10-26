export interface User {
	id: string;
	name: string;
	percent: number;
	status: string | null;
}

export type MatchingUser = {
	score: number;
	userId: string;
	userName: string;
};
