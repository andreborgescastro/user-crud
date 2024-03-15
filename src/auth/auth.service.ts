import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor() {}
  async signIn(username: string, pass: string): Promise<any> {
    /* Simulação de uma operação de login onde é salvo no banco de
     dados a enha criptografada com salt*/
    const user = {
      username: 'usuario01',
      password: '$2a$10$zZy8RiqVMBtwg2LAMRmvM.wWc9n/0DyYWuQU7F4lxdmM3QOR3iyTS',
    };
    const isAuthorized = await this.compareEncrypted(pass, user.password);
    if (!isAuthorized) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    return result;
  }

  /* Função que representaria um módulo específico para criptografia.
   * levando em consideração a redução de complexidade
   * resolvi condensar a operação em uma única função.
   */

  async encrypt(value: string): Promise<string> {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    return await bcrypt.hash(value, salt);
  }

  async compareEncrypted(
    value: string,
    encryptedValue: string,
  ): Promise<boolean> {
    return await bcrypt.compare(value, encryptedValue);
  }
}
