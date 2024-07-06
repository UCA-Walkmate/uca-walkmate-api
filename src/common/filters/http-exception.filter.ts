import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const message = exception instanceof HttpException? (exception.getResponse() as any).message || exception.message
        : 'Internal server error';
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                message,
                timestamp: new Date().toISOString(),
                path: request.url
            });
    }

}