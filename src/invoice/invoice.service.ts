import { PrismaService } from './../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { addMonths } from 'date-fns';

@Injectable()
export class InvoiceService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createInvoiceDto: CreateInvoiceDto) {
    try {
      const createDate = [];

      const data = { ...createInvoiceDto };

      let countDate = 0;

      for (let index = 0; index < data.tranches; index++) {
        data.value = createInvoiceDto.value / createInvoiceDto.tranches;

        if (countDate > 0) {
          data.date = addMonths(new Date(data.date), 1).toISOString();
        }

        const newCreate = await this.prismaService.invoice.create({ data });

        createDate.push(newCreate);

        countDate++;
      }

      return createDate;
    } catch (error) {
      throw new HttpException('Fatura não cadastrada', HttpStatus.BAD_REQUEST);
    }
  }
  async getAll() {
    const result = await this.prismaService.invoice.findMany();

    return result;
  }
}
