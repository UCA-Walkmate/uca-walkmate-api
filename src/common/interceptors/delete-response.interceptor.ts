import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DeleteResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        
        if (request.method === 'DELETE') {
            return next.handle().pipe(
                map(data => {
                    const response = context.switchToHttp().getResponse();

                    // Check if the status code is 200
                    if (response.statusCode === HttpStatus.OK) {
                        return {
                            message: 'Resource deleted successfully',
                            affected: data,
                        };
                    }

                    return data;
                }),
            );
        }

        return next.handle();
    }
}