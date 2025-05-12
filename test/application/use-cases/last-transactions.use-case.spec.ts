import { Transaction } from "../../../src/domain/entities/transaction.entity";

import { GetLast60SecondsTransactionsUseCase } from "src/application/use-cases";

describe('LastTransactionsUseCase', () => {
    const mockRepo = {
        getLast60SecondsTransactions: jest.fn(),
    };

    const useCase = new GetLast60SecondsTransactionsUseCase(
        mockRepo as any,
    );

    it('Quando buscar transações, deve retornar uma lista de transações', async () => {
        const transactions = [
            new Transaction({ amount: 100, timestamp: new Date() }),
            new Transaction({ amount: 200, timestamp: new Date() }),
        ];

        mockRepo.getLast60SecondsTransactions.mockResolvedValue(transactions);
        const result = await useCase.execute();
        expect(result).toEqual(transactions);
        expect(mockRepo.getLast60SecondsTransactions).toHaveBeenCalledTimes(1);
    });

    it('Quando buscar transações, deve retornar uma lista vazia', async () => {
        const transactions: Transaction[] = [];

        mockRepo.getLast60SecondsTransactions.mockResolvedValue(transactions);
        const result = await useCase.execute();
        expect(result).toEqual(transactions);
        expect(mockRepo.getLast60SecondsTransactions).toHaveBeenCalledTimes(2);
    }
    );

    it('Quando buscar transações, deve retornar um erro', async () => {
        mockRepo.getLast60SecondsTransactions.mockRejectedValue(new Error('Erro ao buscar transações'));

        await expect(useCase.execute()).rejects.toThrow('Erro ao buscar transações');
        expect(mockRepo.getLast60SecondsTransactions).toHaveBeenCalledTimes(3);
    }
    );

    it('Quando busca as transações dentro da janela de tempo', async () => {
        const transactions = [
            new Transaction({ amount: 100, timestamp: new Date() }),
            new Transaction({ amount: 100, timestamp: new Date(Date.now() - 50000) }),
            new Transaction({ amount: 200, timestamp: new Date(Date.now() - 30000) }),
        ];

        const expectedTransactions = transactions.filter(transaction => {
            const diff = Math.abs(new Date().getTime() - transaction.timestamp.getTime());
            return diff <= 60000;
        }
        );

        mockRepo.getLast60SecondsTransactions.mockResolvedValue(transactions);
        const result = await useCase.execute();
        expect(result).toEqual(expectedTransactions);
        expect(mockRepo.getLast60SecondsTransactions).toHaveBeenCalledTimes(4); 
    }
    );

    it('Quando busca as transações fora da janela de tempo', async () => {
        const transactions = [
            new Transaction({ amount: 100, timestamp: new Date(Date.now() - 70000) }),
            new Transaction({ amount: 200, timestamp: new Date(Date.now() - 80000) }),
        ];

        const expectedTransactions = transactions.filter(transaction => {
            const diff = Math.abs(new Date().getTime() - transaction.timestamp.getTime());
            return diff > 60000;
        }
        );

        mockRepo.getLast60SecondsTransactions.mockResolvedValue(transactions);
        const result = await useCase.execute();
        expect(result).toEqual(expectedTransactions);
        expect(mockRepo.getLast60SecondsTransactions).toHaveBeenCalledTimes(5); 
    }
    );

});