import { BadRequestException, Body, Controller, InternalServerErrorException, Post, Request, Res, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/RegisterDto';
import { hashPassword } from '../../util/crypto';
import { signToken } from '../../util/jwt';
import { SetTokenHeader } from '../../interceptor/setTokenHeader.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  @UseInterceptors(new SetTokenHeader())
  async register(@Request() request, @Body() body: RegisterDto) {
    const { nivel } = request;

    const { username, password } = body;

    //verify that a user with the same username doesnt already exists:
    const user = await this.userService.findByUsername(username, nivel);

    if (user) throw new BadRequestException('username already in use');
    //create the user:
    //1: hash the password
    const hashedPassword = await hashPassword(password);

    const newUser = await this.userService.insertNewUser({ username, password: hashedPassword }, nivel);
    if (!newUser.insertedId) throw new InternalServerErrorException('no se pudo procesar la petición');

    //generamos el nuevo token:
    const token = signToken({ _id: newUser.insertedId });

    return token;
  }
  async login(@Request() request) {}
}
