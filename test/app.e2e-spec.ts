import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  pactum.request.setBaseUrl('http://localhost:3333');

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    app.listen(3333);

    prisma = await app.get(PrismaService);
    await prisma.cleanDb();
  });

  afterAll(async () => {
    app.close();
  });

  describe('Auth', () => {
    const authDto: AuthDto = {
      email: 'testemail@dropjar.com',
      password: 'testpassword',
    };
    const authDtoWithoutEmail: { email: string } = { email: authDto.email };
    const authDtoWithoutPassword: { password: string } = {
      password: authDto.password,
    };
    const authDtoWithInvalidEmail: AuthDto = {
      ...authDto,
      email: 'invalid.email.com',
    };

    describe('Signup', () => {
      it('Should not signup if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(authDtoWithoutEmail)
          .expectStatus(400);
      });

      it('Should not signup if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(authDtoWithoutPassword)
          .expectStatus(400);
      });

      it('Should accept a valid email', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(authDtoWithInvalidEmail)
          .expectStatus(400);
      });

      it('Should signup a user', async () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(authDto)
          .expectStatus(201)
          .expectJsonLike({
            id: /^\d+$/,
            email: 'testemail@dropjar.com',
          });
      });

      it('Should not signup the same user twice', async () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(authDto)
          .expectStatus(400)
          .expectJsonLike({
            message: "typeof $V == 'string'",
          });
      });
    });

    describe('Signin', () => {
      it('Should signin a user', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(authDto)
          .expectStatus(200)
          .expectJsonLike({
            token: /^[a-zA-Z0-9-_\.]+$/,
          });
      });
    });
  });

  describe('Users', () => {
    describe('Get me', () => {});
    describe('Edit me', () => {});
  });

  describe('Bookmarks', () => {
    describe('Create bookmarks', () => {});
    describe('Get bookmarks', () => {});
    describe('Edit bookmarks', () => {});
  });
});
