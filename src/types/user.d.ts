export interface User {
	id: string;
	name: string;
	email: string;
	percent: number;
	alarm: boolean;
	sns: string;
	status: string | null;
}

export type MatchingUser = {
	score: number;
	userId: string;
	userName: string;
};

export interface BlockedUser {
	id: string;
	email: string;
	name: string;
}
