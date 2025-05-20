import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidateAnswerPipe implements PipeTransform {
  transform(value: Record<string, any>, metadata: ArgumentMetadata) {
    console.log('value', value);
    return value;
  }
}
