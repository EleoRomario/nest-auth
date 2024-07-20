import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException
} from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const client = request.user;

  if (!client) {
    throw new InternalServerErrorException('No se pudo obtener el usuario');
  }
  return client;
});
