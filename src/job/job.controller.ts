import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProviderEnum } from 'src/common/provider.enum';
import { JobService } from './job.service';
import { UpdateJobOpeningDto } from './dto/updatejob.dto';
import { CreateJobOpeningDto } from './dto/job.dto';
import { SyncLogService } from './job.stotedata';
import { OperationType } from './job.enum';

@ApiTags('complex/jobpostings')
@Controller('complex/job')
export class JobController {
  constructor(
    private readonly jobService: JobService,
    private readonly syncLogService: SyncLogService,
  ) {}

  @Post('create/:provider')
  @ApiOperation({ summary: 'Create a job on the specified platform' })
  async createJob(
    @Param('provider') provider: ProviderEnum,
    @Body() body: CreateJobOpeningDto,
    @Param('accesstoken') accesstoken: string,
  ) {
    const job = await this.jobService.createJob(provider, body, accesstoken);
    await this.syncLogService.logOperation({
      jobId: job.id || 'mock-id',
      operationType: OperationType.CREATE,
      payload: body,
      provider: provider,
    });

    return job;
  }

  @Put('update/:provider')
  @ApiOperation({ summary: 'Update a job on the specified platform' })
  async updateJob(
    @Param('provider') provider: ProviderEnum,
    @Param('jobId') jobId: string,
    @Body() jobData: UpdateJobOpeningDto,
    @Param('accesstoken') accesstoken: string,
  ) {
    const job = await this.jobService.updateJob(
      provider,
      jobId,
      jobData,
      accesstoken,
    );
    await this.syncLogService.logOperation({
      jobId: job.id || 'mock-id',
      operationType: OperationType.UPDATE,
      payload: jobData,
      provider: provider,
    });

    return job;
  }

  @Put('close/:provider')
  @ApiOperation({ summary: 'Close a job on the specified platform' })
  async closeJob(
    @Param('provider') provider: ProviderEnum,
    @Param('jobId') jobId: string,
    @Param('accesstoken') accesstoken: string,
  ) {
    const job = await this.jobService.closeJob(provider, jobId, accesstoken);
    await this.syncLogService.logOperation({
      jobId: job.id || 'mock-id',
      operationType: OperationType.CLOSE,
      payload: {},
      provider: provider,
    });
    return job;
  }

  @Delete('delete/:provider')
  @ApiOperation({ summary: 'Delete a job on the specified platform' })
  async deleteJob(
    @Param('provider') provider: ProviderEnum,
    @Param('jobId') jobId: string,
    @Param('accesstoken') accesstoken: string,
  ) {
    const job = await this.jobService.deleteJob(provider, jobId, accesstoken);
    await this.syncLogService.logOperation({
      jobId: job.id || 'mock-id',
      operationType: OperationType.DELETE,
      payload: {},
      provider: provider,
    });
    return job;
  }
}
