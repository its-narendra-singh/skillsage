import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { };

    private saltRounds = 10;

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    };

    async comparePasswords(plan: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(plan, hashed);
    };

    async generateToken(payload: any): Promise<string> {
        return this.jwtService.signAsync(payload);
    };
}
