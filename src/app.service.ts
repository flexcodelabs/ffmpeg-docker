import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import { VIDEOS } from './core/system/system.configuration';

@Injectable()
export class AppService {
  createVideo = (name: number) => {
    let finished = false;
    ffmpeg()
      .on('start', (commandLine: string) =>
        console.log('Started with: ' + commandLine),
      )
      .addInput('./image.jpg')
      .addInput('./audio.mp3')
      .save(`${VIDEOS}/${name}.mp4`)
      .on('end', () => {
        finished = true;
        return true;
      })
      .on('error', (error) => {
        throw new Error(error);
      });
    if (finished) {
      return finished;
    }
  };
}
