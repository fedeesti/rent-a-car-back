import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

export const multerOptions = {
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE),
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|svg)$/)) {
      cb(null, true);
    } else {
      cb(new BadRequestException(`Unsupported file type ${extname(file.originalname)}`), false);
    }
  },
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      cb(null, process.env.UPLOAD_FILE_LOCATION);
    },
    filename: (req: any, file: any, cb: any) => {
      cb(null, Date.now() + extname(file.originalname));
    },
  }),
};
