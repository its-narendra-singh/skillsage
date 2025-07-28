import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto, LoginUserDto } from '../user/user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { };

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const hashed = await this.authService.hashPassword(createUserDto.password);
        const user = await this.userService.create({ ...createUserDto, password: hashed });
        return { message: 'User registered successfully', user };
    };

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        const user = await this.userService.findByEmail(loginUserDto.email);

        if (!user) {
            return {
                success: false,
                message: 'Invalid credentials',
            }
        };

        const isMatch = await this.authService.comparePasswords(loginUserDto.password, user.password);


        if (!isMatch) {
            return {
                success: false,
                message: 'Invalid credentials',
            }
        };

        const token = await this.authService.generateToken({ sub: user._id, role: user.role });
        return { access_token: token };
    };
}
