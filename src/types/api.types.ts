export interface ApiKeyResponse {
  apiKey: string;
}

export interface StoredData {
  id: string;
  userId: string;
  data: Record<string, any>;
  createdAt: string;
}