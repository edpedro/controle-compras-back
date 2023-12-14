import { PrismaService } from './../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { addMonths } from 'date-fns';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

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

  async getFindId(id: string) {
    const result = await this.prismaService.invoice.findFirst({
      where: {
        id,
      },
    });

    return result;
  }

  async updateInvoice(updateInvoiceDto: UpdateInvoiceDto, id: string) {
    const invoiceExits = await this.prismaService.invoice.findFirst({
      where: {
        id,
      },
    });

    if (!invoiceExits) {
      throw new HttpException('Dados não encontados', HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.prismaService.invoice.update({
        where: {
          id,
        },
        data: updateInvoiceDto,
      });

      return result;
    } catch (error) {
      throw new HttpException('Dados não atualizado', HttpStatus.BAD_REQUEST);
    }
  }

  async removeInvoice(id: string) {
    const invoiceExits = await this.prismaService.invoice.findFirst({
      where: {
        id,
      },
    });

    if (!invoiceExits) {
      throw new HttpException('Dados não encontados', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.prismaService.invoice.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException('Dados não atualizado', HttpStatus.BAD_REQUEST);
    }
  }
}
