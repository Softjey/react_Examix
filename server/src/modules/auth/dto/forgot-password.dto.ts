import { IsEmail, IsUrl } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  email: string;

  @IsUrl({
    require_tld: false,
    require_protocol: true,
    allow_underscores: true,
    allow_fragments: true,
    allow_query_components: true,
  })
  redirectUrl: string;
}
