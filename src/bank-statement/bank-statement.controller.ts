import { Controller, Post, Body } from '@nestjs/common';
import { BankStatementService } from './bank-statement.service';

@Controller('bank-statement')
export class BankStatementController {
    constructor(private readonly bankStatementService: BankStatementService) { }

    @Post('/process-csv')
    async processCSV(@Body() body: { filePath: string }) {
        this.bankStatementService.processCSV(body.filePath);
        return 'CSV processing initiated.';
    }

    @Post('/process-xml')
    async processXML(@Body() body: { filePath: string }) {
        this.bankStatementService.processXML(body.filePath);
        return 'XML processing initiated.';
    }
}
