import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger('AuthService');

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersRepository.findOne({ where: { email }, select: ['id', 'email', 'name', 'password'] });
        const isMatch = await bcrypt.compare(password, user.password);

        if (user && isMatch) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.role };

        return {
            token: this.jwtService.sign(payload),
        };
    }

    async signUp(signupDto: SignUpDto) {
        const { name, email, password } = signupDto;

        const userExists = await this.usersRepository.findOne({ where: { email } });

        if (userExists)
            throw new BadRequestException('User already exists');

        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);

        try {
            const newUser = this.usersRepository.create({
                name,
                email,
                password: hashedPass,
                roleId: 1
            });

            await this.usersRepository.save(newUser);

            return {
                message: 'User created successfully',
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email
                }
            };

        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Unexpected error');
        }

    }

}