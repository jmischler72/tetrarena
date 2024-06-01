import { FirebaseService } from './firebase/FirebaseService';

export async function getUsername(userId: string) {
	const infos = await FirebaseService.getUserInfos(userId);
	return infos?.username || 'Guest-' + userId.substring(0, 6);
}

export async function getRank(userId: string) {
	const infos = await FirebaseService.getUserInfos(userId);
	return infos?.rank || 500;
}
