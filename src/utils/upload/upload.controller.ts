import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  @Post('uploadStream')
  async uploadBase64File(@Body() body) {
    const base64Data = body.file;
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const fileType = matches[1];
    const base64Encoded = matches[2];

    const fileName = `file_${Date.now()}.${fileType.split('/')[1]}`;

    const filePath = path.join(__dirname, '../uploads', fileName);

    fs.writeFileSync(filePath, base64Encoded, 'base64');

    return { filename: fileName, filePath };
  }

  @Post('uploadFile')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = file.originalname.split('.')[0];
          const fileExt = file.originalname.split('.')[1];
          const newFileName =
            fileName.split(' ').join('_') + '_' + Date.now() + '.' + fileExt;

          cb(null, newFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(
            { message: 'Only images are allowed', name: 'InvalidFile' },
            false,
          );
        } else {
          cb(null, true);
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      return { file: file.filename };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
