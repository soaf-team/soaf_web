import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { IAlbumDetail } from '@/types';

interface Props {
	name: string;
	artist: string;
}

export const useMusicDetailQuery = ({ name, artist }: Props) => {
	const fetchMusic = async () => {
		try {
			const response = await axios.get(
				`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${import.meta.env.VITE_LAST_FM_API_KEY}&artist=${artist}&album=${name}&format=json`,
			);

			return response.data;
		} catch (error) {
			console.error(error);
		}
	};

	const { data } = useQuery({
		queryKey: ['music', name, artist],
		queryFn: fetchMusic,
		staleTime: Infinity,
		select: (data) => data.album,
	});

	return {
		musicInfo: data as IAlbumDetail,
	};
};
