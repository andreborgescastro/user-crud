import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}
  async signIn(username: string, pass: string): Promise<any> {
    /* Simulação de uma operação de login onde é salvo no banco de
     dados a enha criptografada com salt*/

    const user = { username: 'usuario01', password: 'senha01' };
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    return result;
  }
}
