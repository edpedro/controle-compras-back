import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post('register')
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }
  @Get()
  getAll() {
    return this.invoiceService.getAll();
  }

  @Get(':id')
  getFindId(@Param('id') id: string) {
    return this.invoiceService.getFindId(id);
  }

  @Patch('edit/:id')
  update(@Body() updateInvoiceDto: UpdateInvoiceDto, @Param('id') id: string) {
    return this.invoiceService.updateInvoice(updateInvoiceDto, id);
  }

  @Delete('edit/:id')
  delete(@Param('id') id: string) {
    return this.invoiceService.removeInvoice(id);
  }
}
