import { SoafStatus } from './chat';

export interface SoafResponseType {
	_id: string;
	senderId: string;
	receiverId: string;
	message: string;
	status: SoafStatus;
	lastRequestDate: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface SoafRequestPayloadType {
	receiverId: string;
	message: string;
}
