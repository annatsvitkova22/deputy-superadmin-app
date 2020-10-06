export interface Appeal {
    id?: string;
    title: string;
    description: string;
    userId: string;
    deputyId: string;
    fileImageUrl?: string[];
    fileUrl?: string[];
    isRead?: boolean;
}

export interface ConfirmMessage {
    id: string;
    appealId: string;
    date: number;
    loadedFiles: UploadFile[];
    message: string;
    isRead?: boolean;
}

export interface UploadFile {
    imageUrl: string;
    pathFile: string;
}

export interface ConfirmAppealGroup {
    appeal: Appeal;
    confirm: ConfirmMessage;
    isReject?: boolean;
}

export interface District {
    id: string;
    name: string;
}

export interface Party {
    id: string;
    name: string;
}