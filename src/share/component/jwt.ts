import jwt from "jsonwebtoken";

import { config } from "./config";
import { ITokenProvider, TokenPayload } from "@share/interface";

class JwtTokenService implements ITokenProvider {
  private readonly secretKey: string;
  private readonly expiresIn: string | number;

  constructor(secretKey: string, expiresIn: string | number) {
    this.secretKey = secretKey;
    this.expiresIn = expiresIn;
  }

  async generateToken(payload: TokenPayload): Promise<string> {
    return jwt.sign(payload, this.secretKey, {
      expiresIn: this.expiresIn,
    } as jwt.SignOptions);
  }

  async verifyToken(token: string): Promise<TokenPayload | null> {
    const decoded = jwt.verify(token, this.secretKey) as TokenPayload;
    return decoded;
  }
}

export const jwtProvider = new JwtTokenService(
  config.accessToken.secretKey,
  config.accessToken.expiresIn
);
