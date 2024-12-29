export interface DocumentResponse {
    id: number;
    name: string;
    url: string;
    tags: string;
    isMark: boolean;
    folder: string;
    description: string;
    createdAt: string;
    createdBy: string;
}

export interface DocumentRequest {
    name: string;
    url: string;
    folder: string;
    tags: string;
    description: string;
}
