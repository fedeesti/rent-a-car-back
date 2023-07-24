import { config } from 'dotenv';
import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

config();

export const validateFile = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: /(jpg|jpeg|png|svg)$/,
  })
  .addMaxSizeValidator({
    maxSize: parseInt(process.env.MAX_FILE_SIZE),
  })
  .build({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });
