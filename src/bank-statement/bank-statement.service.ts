import { Injectable } from '@nestjs/common';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';
import * as xml2js from 'xml2js';

@Injectable()
export class BankStatementService {
  private transactionReferences = new Set<string>();
  private failedRecords = [];

  processCSV(filePath: string) {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        this.validateRecord(row);
      })
      .on('end', () => {
        this.generateReport();
      });
  }

  processXML(filePath: string) {
    const parser = new xml2js.Parser();

    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      parser.parseString(data, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }

        const records = result.records.record;
        records.forEach((record) => {
          const row = {
            Reference: record.$.reference,
            'Account Number': record.accountNumber[0],
            Description: record.description[0],
            'Start Balance': parseFloat(record.startBalance[0]),
            Mutation: parseFloat(record.mutation[0]),
            'End Balance': parseFloat(record.endBalance[0]),
          };

          this.validateRecord(row);
        });

        this.generateReport();
      });
    });
  }

  private validateRecord(record: Record<string, any>) {
    const normalizedRecord = {
      transactionReference: record.Reference,
      startBalance: parseFloat(record['Start Balance']),
      mutation: parseFloat(record.Mutation),
      endBalance: parseFloat(record['End Balance']),
      description: record.Description,
    };

    this.validateRecordEndBalance(normalizedRecord);

    if (this.transactionReferences.has(normalizedRecord.transactionReference)) {
      this.failedRecords.push({
        TransactionReference: normalizedRecord.transactionReference,
        Description: normalizedRecord.description,
        FailReason: 'refrance with the same value already exists',
      });
    } else {
      this.transactionReferences.add(normalizedRecord.transactionReference);
    }
  }

  private validateRecordEndBalance(record) {
    const calculatedEndBalance = record.startBalance + record.mutation;

    if (
      Math.round(calculatedEndBalance * 100) !==
      Math.round(record.endBalance * 100)
    ) {
      this.failedRecords.push({
        TransactionReference: record.transactionReference,
        Description: record.description,
        FailReason: "end balance doesn't match",
      });
    }
  }

  private generateReport(): void {
    console.log('Failed Records:');
    this.failedRecords.forEach((record) => {
      console.log(
        `Transaction Reference: ${record.TransactionReference}, Description: ${record.Description}`,
      );
    });
    this.transactionReferences.clear();
    this.failedRecords = [];
  }
}
