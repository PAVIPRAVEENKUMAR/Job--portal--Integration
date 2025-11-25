import { Injectable } from '@nestjs/common';

@Injectable()
export class MockPrismaService {
  private tokenStore: any[] = [];
  private jobLogStore: any[] = [];

  // --- Mock for oAuthtoken / oAuthToken used across services ---
  oAuthtoken = {
    upsert: async (params: any) => {
      const { create, update, where } = params;
      const existingIndex = this.tokenStore.findIndex(
        (t) =>
          t.provider === where.userId_provider?.provider &&
          t.userId === where.userId_provider?.userId,
      );

      if (existingIndex !== -1) {
        this.tokenStore[existingIndex] = {
          ...this.tokenStore[existingIndex],
          ...update,
        };
        return this.tokenStore[existingIndex];
      }

      const newToken = { ...create, createdAt: new Date() };
      this.tokenStore.push(newToken);
      return newToken;
    },

    findMany: async () => {
      return this.tokenStore;
    },

    findFirst: async (params: any) => {
      const { where } = params;

      const filtered = this.tokenStore.filter(
        (t) =>
          (!where.provider || t.provider === where.provider) &&
          (!where.token || t.accessToken === where.token),
      );

      if (filtered.length === 0) return null;

      return filtered.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      )[0];
    },

    update: async (params: any) => {
      const { where, data } = params;

      const index = this.tokenStore.findIndex((t) => t.id === where.id);
      if (index === -1) return null;

      this.tokenStore[index] = { ...this.tokenStore[index], ...data };
      return this.tokenStore[index];
    },
  };

  // Alias for cases using oAuthToken name
  oAuthToken = this.oAuthtoken;

  // --- Mock for jobSyncOperationLog ---
  jobSyncOperationLog = {
    create: async (params: any) => {
      const logEntry = { ...params.data, createdAt: new Date() };
      this.jobLogStore.push(logEntry);
      return logEntry;
    },

    update: async (params: any) => {
      const index = this.jobLogStore.findIndex(
        (log) => log.id === params.where.id,
      );
      if (index !== -1) {
        this.jobLogStore[index] = {
          ...this.jobLogStore[index],
          ...params.data,
        };
        return this.jobLogStore[index];
      }
      return null;
    },
  };
}
