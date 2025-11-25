import { IsEnum, IsJSON, IsNotEmpty, IsString } from 'class-validator';
import { OperationType } from '../job.enum';

export class CreateSyncLogDto {
  @IsString()
  @IsNotEmpty()
  jobId: string;

  @IsEnum(OperationType)
  operationType: OperationType;

  @IsNotEmpty()
  payload: any; // Keep it any for flexibility (JSON)

  @IsString()
  @IsNotEmpty()
  provider: string;
}
