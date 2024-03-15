import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async signIn(username: string, pass: string): Promise<any> {
    /* Simulação de uma operação de login onde é salvo no banco de
     dados a enha criptografada com salt*/

    const user = {
      id: '031cce48-1597-48ba-ba9e-2aceadf20cc1',
      username: 'usuario01',
      password: '$2a$10$zZy8RiqVMBtwg2LAMRmvM.wWc9n/0DyYWuQU7F4lxdmM3QOR3iyTS',
    };
    const isAuthorized = await this.compareEncrypted(pass, user.password);
    if (!isAuthorized) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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
  private parseJwt(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const buffer = Buffer.from(base64, 'base64');
      const jsonPayload = decodeURIComponent(
        buffer
          .toString()
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(''),
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Não foi possível obter o token do cabeçalho');
    }
  }

  public extractUsernameFromHeader(header: any) {
    const jwt = this.extractTokenFromHeader(header);
    const jwtDecoded = this.parseJwt(jwt);
    const username = jwtDecoded.username;
    if (!username) {
      throw new Error('Não foi possível identificar o usuário!');
    }
    return username;
  }

  private extractTokenFromHeader(header: any): string | undefined {
    if (!header.authorization) {
      throw new Error('Não foi possível obter o token do cabeçalho');
    }
    return header.authorization.split(' ')[1];
  }
}
