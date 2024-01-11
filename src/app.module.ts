import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankStatementService } from './bank-statement/bank-statement.service';
import { BankStatementController } from './bank-statement/bank-statement.controller';

@Module({
  imports: [],
  controllers: [AppController, BankStatementController],
  providers: [AppService, BankStatementService],
})
export class AppModule {}
