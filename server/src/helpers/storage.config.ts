import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

// Multer configuration
export const multerConfig = {
  dest: 'uploads',
};

// Multer upload options
export const multerOptions = {
  // Enable file size limits
  limits: {
    fileSize: 1000 * 1000 * 1,
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, cb: any) => {
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      let uploadPath = multerConfig.dest + `/${year}/${month}`;

      if (req.url.includes('articles')) {
        const articleId = req.params.id;

        if (!articleId) {
          cb(
            new HttpException('Article ID is missing', HttpStatus.BAD_REQUEST),
            null,
          );
          return;
        }

        uploadPath = uploadPath + `/articles/article__${articleId}`;
      }

      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    // File modification details
    filename: (req: any, file: any, cb: any) => {
      // Calling the callback passing the random name generated with the original extension name
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};
