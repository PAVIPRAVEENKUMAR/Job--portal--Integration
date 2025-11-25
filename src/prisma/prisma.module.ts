import { Module } from '@nestjs/common';
import { MockPrismaService } from './mock-prisma.service';

@Module({
  providers: [MockPrismaService],
  exports: [MockPrismaService],
})
export class PrismaModule {}
