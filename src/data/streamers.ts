export interface Streamer {
    id: string;
    name: string;
    image: string; // URL or local path
    platforms: {
        youtube?: string;
        twitch?: string;
        kick?: string;
    };
    color: string;
}

const BASE = import.meta.env.BASE_URL;

export const streamers: Streamer[] = [
    {
        id: 'bravoxv',
        name: 'Bravoxv',
        image: `${BASE}images/bravoxv.png`,
        platforms: {
            youtube: 'https://www.youtube.com/@Bravo-XV',
            twitch: 'https://www.twitch.tv/bravoxv_',
            kick: 'https://kick.com/bravoxv'
        },
        color: 'from-white/10 to-white/5'
    },
    {
        id: 'icegaming',
        name: 'iceGaming',
        image: `${BASE}images/icegaming.png`,
        platforms: {
            youtube: 'https://www.youtube.com/@ICEGAMINGCOMUNITY'
        },
        color: 'from-white/10 to-white/5'
    },
    {
        id: 'kronoxtoxity',
        name: 'KronoxToxity',
        image: `${BASE}images/kronoxtoxity.png`,
        platforms: {
            youtube: 'https://www.youtube.com/@Kronox_Toxity'
        },
        color: 'from-white/10 to-white/5'
    },
    {
        id: 'leo0dan',
        name: 'Leo0Dan',
        image: `${BASE}images/leo0dan.png`,
        platforms: {
            twitch: 'https://www.twitch.tv/leoodann'
        },
        color: 'from-white/10 to-white/5'
    }
];
