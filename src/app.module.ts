import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankStatementService } from './bank-statement/bank-statement.service';
import { BankStatementController } from './bank-statement/bank-statement.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AppController, BankStatementController],
  providers: [AppService, BankStatementService],
})
export class AppModule {}
