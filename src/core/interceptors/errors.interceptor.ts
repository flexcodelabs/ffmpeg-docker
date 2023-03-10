import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { errorSanitizer } from '../../shared/helpers/sanitize.error';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();

    let message: string;
    const detail = exception.detail;
    if (typeof detail === 'string' && detail?.includes('already exists')) {
      message = exception.table.split('_').join(' ') + ' with';
      message = exception.detail.replace('Key', message);
    } else {
      message = exception?.message?.includes('Bad Request Exception')
        ? exception?.response?.message?.join(',')
        : exception?.message || exception?.error;
    }
    message = message.split('(').join('');
    message = message.split(')').join('');
    message = message.split('=').join(' ');
    if (
      message.includes('Cannot POST') ||
      message.includes('Cannot GET') ||
      message.includes('Cannot PATCH') ||
      message.includes('Cannot DELETE') ||
      message.includes('Cannot PUT')
    ) {
      message = 'Oops 😢! Route not available.';
    }

    message = errorSanitizer(message);

    Logger.error(message, `${request?.method} ${request?.url}`, 'ERROR');
    return response && response.status
      ? response?.status(HttpStatus.BAD_REQUEST)?.json({ error: message })
      : response && response.json
      ? response.json({ error: message })
      : new Error(message);
  }
}
