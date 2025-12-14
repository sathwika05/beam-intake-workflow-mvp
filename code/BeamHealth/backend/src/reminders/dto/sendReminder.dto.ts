import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber} from "class-validator";


export class SendReminderDto{

    @IsNotEmpty()
    @Type(() => Number)     // transforms "5" → 5
    @IsNumber()
    appointmentId:number
}

