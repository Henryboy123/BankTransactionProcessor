import { Test, TestingModule } from '@nestjs/testing';
import { BankStatementController } from './bank-statement.controller';

describe('BankStatementController', () => {
  let controller: BankStatementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankStatementController],
    }).compile();

    controller = module.get<BankStatementController>(BankStatementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
