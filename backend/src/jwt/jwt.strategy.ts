import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import type { Request } from "express";
import { cookieAuthTokenName, envNames } from "src/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env[envNames.jwt_secret],
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
