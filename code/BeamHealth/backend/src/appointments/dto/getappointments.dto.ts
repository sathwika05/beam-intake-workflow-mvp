// src/appointments/dto/get-appointments.dto.ts
import { IsOptional, IsIn, IsDateString, ValidateIf } from 'class-validator';

export class GetAppointmentsDto {
  @IsOptional()
  @IsIn(['start_time'])
  sortBy?: 'start_time' = 'start_time';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'asc';

  // single-day filter
  @IsOptional()
  @IsDateString()
  date?: string;

  // range filters (from + to)
  @ValidateIf(o => !o.date) // only validate if date is not provided
  @IsOptional()
  @IsDateString()
  from?: string;

  @ValidateIf(o => !o.date)
  @IsOptional()
  @IsDateString()
  to?: string;
}
