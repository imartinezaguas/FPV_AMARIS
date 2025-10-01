import { FundRepository } from "../../domain/repositories/fund-repository";
import { Fund } from "../../domain/user";

export class GetFundsUseCase{
  constructor(private repo:FundRepository){}

  execute(): Promise<Fund[]>{
    return this.repo.getFunds();
  }
}
