import { Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { BankStatementService } from './bank-statement.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('bank-statement')
export class BankStatementController {
  constructor(private readonly bankStatementService: BankStatementService) { }

  @Post('/process-csv')
  @UseInterceptors(FileInterceptor('file'))
  async processCSV(@Req() req) {

    if (!!req.file) {
      this.bankStatementService.processCSV(req.file.path);
    } else {
      this.bankStatementService.processCSV(req.body.filePath);
    }

    return 'CSV processing initiated.';
  }

  @Post('/process-xml')
  @UseInterceptors(FileInterceptor('file'))
  async processXML(@Req() req) {
    if (!!req.file) {
      this.bankStatementService.processXML(req.file.path);
    } else {
      this.bankStatementService.processXML(req.body.filePath);
    }
    return 'XML processing initiated.';
  }
}
