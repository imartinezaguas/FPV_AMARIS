import { LoginUseCase } from './../application/uses-case/login.usecase';
import { InjectionToken } from '@angular/core';
import { AuthRepository } from '../domain/repositories/auth-repository';
import { AuthRepositoryImpl } from './repositories/auth-repository.impl';
import { FundRepository } from '../domain/repositories/fund-repository';
import { FundRepositoryImpl } from './repositories/fund-repository-impl';
import { GetFundsUseCase } from '../application/uses-case/get-fuds.usecase';
import { SubscribeFundUseCase } from '../application/uses-case/subscribe-fund.usecase';
import { CancelFundUseCase } from '../application/uses-case/cancel-fund.usescase';
import { TransactionRepository } from '../domain/repositories/transaction-respository';
import { TransactionRepositoryImpl } from './repositories/transaction-repository-impl';
import { GetTransactionsUseCase } from '../application/uses-case/get-transaction.usescase';
import { UserRepositoryImpl } from './repositories/user-repository-impl';
import { UserRepository } from '../domain/repositories/user-repository';
import { ChangePasswordUseCase } from '../application/uses-case/change-password.usecase';
import { GetUsersUseCase } from '../application/uses-case/get-users.uses.case';

export const AUTH_REPOSITORY = new InjectionToken<AuthRepository>('AUTH_REPOSITORY');
export const FUND_REPOSITORY = new InjectionToken<FundRepository>('FUND_REPOSITORY');
export const TX_REPOSITORY = new InjectionToken<TransactionRepository>('TX_REPOSITORY');
export const USER_REPOSITORY = new InjectionToken<UserRepository>('USER_REPOSITORY');

export function provideInfrastructure() {
  return [
    // Repositorios concretos
    { provide: USER_REPOSITORY, useClass: UserRepositoryImpl }, // única fuente de usuarios
    {
      provide: AUTH_REPOSITORY,
      deps: [USER_REPOSITORY],
      useFactory: (u: UserRepository) => new AuthRepositoryImpl(u),
    }, // Auth delega en UserRepo
    { provide: FUND_REPOSITORY, useClass: FundRepositoryImpl },
    { provide: TX_REPOSITORY, useClass: TransactionRepositoryImpl },

    // Use cases
    {
      provide: LoginUseCase,
      deps: [AUTH_REPOSITORY],
      useFactory: (a: AuthRepository) => new LoginUseCase(a),
    },

    {
      provide: GetFundsUseCase,
      deps: [FUND_REPOSITORY],
      useFactory: (f: FundRepository) => new GetFundsUseCase(f),
    },

    // Suscribir/Cancelar impactan balance/portfolio y registran transacción
    {
      provide: SubscribeFundUseCase,
      deps: [FUND_REPOSITORY, USER_REPOSITORY, TX_REPOSITORY],
      useFactory: (f: FundRepository, u: UserRepository, t: TransactionRepository) =>
        new SubscribeFundUseCase(f, u, t),
    },

    {
      provide: CancelFundUseCase,
      deps: [FUND_REPOSITORY, USER_REPOSITORY, TX_REPOSITORY],
      useFactory: (f: FundRepository, u: UserRepository, t: TransactionRepository) =>
        new CancelFundUseCase(f, u, t),
    },

    {
      provide: GetTransactionsUseCase,
      deps: [TX_REPOSITORY],
      useFactory: (t: TransactionRepository) => new GetTransactionsUseCase(t),
    },
    {
      provide: ChangePasswordUseCase,
      deps: [USER_REPOSITORY],
      useFactory: (u: UserRepository) => new ChangePasswordUseCase(u),
    },
    {
      provide: GetUsersUseCase,
      deps: [USER_REPOSITORY],
      useFactory: (u: UserRepository) => new GetUsersUseCase(u),
    },
  ];
}
