import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { VIDEOS } from './core/system/system.configuration';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatus(): { status: string } {
    return { status: 'Up and Running ✅' };
  }

  @Get('images/icons/gear.png')
  icon(): { status: string } {
    return { status: 'Up and Running ✅' };
  }

  @Get('favicon.ico')
  gear(): { status: string } {
    return { status: 'Up and Running ✅' };
  }

  @Get('videos')
  generate(): any {
    const name = new Date().valueOf();
    this.appService.createVideo(name);
    return { name };
  }

  @Get('videos/:name')
  video(@Param('name') name: string, @Res() res: any): any {
    return res.sendFile(`${name}.mp4`, { root: VIDEOS });
  }
}
