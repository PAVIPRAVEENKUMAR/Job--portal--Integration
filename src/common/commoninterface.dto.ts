export interface JobPostResult {
  externalJobId?: string;
  id?: string;
  status: 'SUCCESS' | 'FAILED';
  error?: any;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  userId: string;
  refreshTokenExpiresAt: Date | undefined;
}
