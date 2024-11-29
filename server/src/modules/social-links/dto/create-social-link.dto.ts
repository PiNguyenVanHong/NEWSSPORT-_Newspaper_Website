import { IsString, IsUrl } from "class-validator";

export class CreateSocialLinkDto {
    
    @IsString()
    name: string;

    @IsUrl()
    url: string;
}
