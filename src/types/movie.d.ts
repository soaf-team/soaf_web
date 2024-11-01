import { RatingType } from './rating';

export interface MovieList {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
}

export interface Movie {
	adult: boolean;
	backdrop_path?: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title?: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

interface Genre {
	id: number;
	name: string;
}

export interface Credits {
	id: number;
	cast: Cast[];
	crew: Crew[];
}

export interface Cast {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
}

export interface Crew {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	credit_id: string;
	department: string; // Directing의 경우 감독
	job: string;
}

interface ProductionCompany {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
}

interface ProductionCountry {
	iso_3166_1: string;
	name: string;
}

interface SpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface MovieDetail {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: null;
	budget: number;
	genres: Genre[];
	homepage: string;
	id: number;
	imdb_id: string;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: ProductionCompany[];
	production_countries: ProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: SpokenLanguage[];
	status: string;
	tagline: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	credits: Credits;
}

export interface MyMovie {
	_id: string;
	category: string;
	review?: string;
	content: MovieContent;
	userId: string;
	createdAt: string;
	updatedAt: string;
}

export interface MovieContent {
	imageUrl: string;
	title: string;
	director: string;
	releaseDate: string;
	actors: string[];
	story: string;
	genre: string;
	rating: RatingType;
}
