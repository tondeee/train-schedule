// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateTrainDto } from './create-train.dto';

export class UpdateTrainDto extends PartialType(CreateTrainDto) {}
