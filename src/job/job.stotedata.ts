import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OperationType, SyncStatus } from '@prisma/client';

@Injectable()
export class SyncLogService {
  constructor(private prisma: PrismaService) {}

  async logOperation({
    jobId,
    operationType,
    payload,
    provider,
  }: {
    jobId: string;
    operationType: OperationType;
    payload: any;
    provider: string;
  }) {
    return this.prisma.jobSyncOperationLog.create({
      data: {
        jobId,
        operationType,
        payload,
        provider,
      },
    });
  }

  async markSuccess(logId: string, response: any) {
    return this.prisma.jobSyncOperationLog.update({
      where: { id: logId },
      data: {
        status: 'SUCCESS',
        response,
      },
    });
  }

  async markFailed(logId: string, error: any) {
    return this.prisma.jobSyncOperationLog.update({
      where: { id: logId },
      data: {
        status: 'FAILED',
        error: typeof error === 'string' ? error : JSON.stringify(error),
      },
    });
  }
}