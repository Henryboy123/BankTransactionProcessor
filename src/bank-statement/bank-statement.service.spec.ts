import { Test, TestingModule } from '@nestjs/testing';
import { BankStatementService } from './bank-statement.service';

describe('BankStatementService', () => {
  let service: BankStatementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankStatementService],
    }).compile();

    service = module.get<BankStatementService>(BankStatementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
