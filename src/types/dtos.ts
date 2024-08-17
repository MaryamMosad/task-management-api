import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsISO8601,
  IsMongoId,
  IsPositive,
  ValidateIf,
} from "class-validator";
import { TaskPriorityEnum, TaskStatusEnum } from "./enums";
import { Transform } from "class-transformer";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  password: string;
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(250)
  description: string;

  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;

  @IsEnum(TaskPriorityEnum)
  priority: TaskPriorityEnum;

  @IsISO8601()
  dueDate: Date;
}

//Manually rewriting instead of using Partial in order for validation to work :(
export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(250)
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum;

  @IsOptional()
  @IsEnum(TaskPriorityEnum)
  priority?: TaskPriorityEnum;

  @IsOptional()
  @IsISO8601()
  dueDate?: Date;
}

export class PaginationQueryParams {
  @Transform((val) => +val.value)
  @IsPositive()
  @IsOptional()
  page: number;

  @Transform((val) => +val.value)
  @IsPositive()
  @IsOptional()
  limit: number;
}

export class TasksSearchQueryParams extends PaginationQueryParams {
  @ValidateIf((o) => !o.description)
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  title: string;

  @ValidateIf((o) => !o.title)
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  description: string;
}
export class TasksFilterQueryParams extends PaginationQueryParams {
  @ValidateIf((o) => !o.status)
  @IsOptional()
  @IsEnum(TaskPriorityEnum)
  priority: TaskPriorityEnum;

  @ValidateIf((o) => !o.priority)
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
