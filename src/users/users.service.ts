import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import prisma from "../database/database.module.js";
import { Config } from '../config/config.js';

import { UserDto } from "../common/dto/user.dto.js";

export class UserService {
    constructor(public userRepository = prisma.user) {}
    
    findOne(email: string) {
        return this.userRepository.findFirst({ where: { email } });
    }

    async createUser(user: UserDto) {
        const userExists = await this.findOne(user.email);
        if(userExists) return { error: 'User already exists' }

        return this.userRepository.create({ data: {
            email: user.email,
            password: await bcrypt.hash(user.password, 10)
        } })
        .then((user) => user)
        .catch(() => {
            return {error: 'Unable to create user'}
        });
    }

    async loginUser(user: UserDto) {
        const userExists = await this.findOne(user.email);
        if(userExists === null) return { error: 'User not found' }
        
        const isMatch = bcrypt.compareSync(user.password, userExists.password);
        if(!isMatch) return { error: 'Invalid password' };

        const token = jwt.sign({ id: userExists.id?.toString(), email: userExists.email }, Config.get<string>('JWT_SECRET'), {
            expiresIn: Config.get<string>('JWT_EXPIRES_IN'),
        });
     
        return { user: { id: userExists.id, email: userExists.email }, token: token }; 
    }

    deleteUser(id: number) {
        return this.userRepository.delete({ where: { id } })
        .then(() => { return { message: 'User deleted' } })
        .catch(() => {
            return {error: 'User not found'}
        });
    }
}