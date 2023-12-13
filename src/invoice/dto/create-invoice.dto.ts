import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInvoiceDto {
  @IsString({ message: "O campo 'Nome' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Nome' não pode estar vazio." })
  readonly name: string;

  @IsString({ message: "O campo 'Data' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Data' não pode estar vazio." })
  readonly date: string;

  @IsString({ message: "O campo 'Cartão' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Cartão' não pode estar vazio." })
  readonly card: string;

  @IsNumber({}, { message: "O campo 'Parcelas' deve ser uma Numero." })
  @IsNotEmpty({ message: "O campo 'Parcelas' não pode estar vazio." })
  readonly tranches: number;

  @IsNumber({}, { message: "O campo 'Valor' deve ser uma Numero." })
  @IsNotEmpty({ message: "O campo 'Valor' não pode estar vazio." })
  readonly value: number;

  @IsString({ message: "O campo 'Obs' deve ser uma string." })
  @IsNotEmpty({ message: "O campo 'Obs' não pode estar vazio." })
  readonly obs: string;
}
