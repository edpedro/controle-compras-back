import { Module } from '@nestjs/common';
import { InvoiceModule } from './invoice/invoice.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [InvoiceModule],
  providers: [PrismaService],
})
export class AppModule {}
