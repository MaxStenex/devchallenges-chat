import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { jwtConstants } from "./constants";
import type { Request } from "express";

export const cookieAuthTokenName = "auth_token";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { id: payload.sub };
  }

  private static extractJWT(req: Request): string | null {
    if (
      req.cookies &&
      cookieAuthTokenName in req.cookies &&
      req.cookies[cookieAuthTokenName].length > 0
    ) {
      return req.cookies[cookieAuthTokenName];
    }
    return null;
  }
}
