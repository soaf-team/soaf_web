export interface SoafResponseType {
	_id: string;
	senderId: string;
	receiverId: string;
	message: string;
	status: string; // TODO: enum
	lastRequestDate: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface SoafRequestPayloadType {
	receiverId: string;
	message: string;
}
