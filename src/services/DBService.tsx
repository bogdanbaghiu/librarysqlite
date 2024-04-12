import { SQLiteDatabase } from 'expo-sqlite/next';
import { BOOK } from 'src/interfaces/interfaces';
import { DBClient } from '../client/DBClient';

export class DBService {
    private readonly dbClient: DBClient;
    static instance: DBService;

    public static getInstance(): DBService {
        if (DBService.instance === undefined) {
            DBService.instance = new DBService();
        }

        return DBService.instance;
    }

    constructor() {
        this.dbClient = DBClient.getInstance();
    }

    async getAllBooks(db: SQLiteDatabase): Promise<BOOK[]> {
        return await this.dbClient
            .getAllBooks(db)
            .then((response) => {
                return response;
            });
    }

    async getAllBooksLength(db: SQLiteDatabase): Promise<any> {
        return await this.dbClient
            .getAllBooksLength(db)
            .then((response) => {
                return response;
            });
    }

    async updateBook(db: SQLiteDatabase, book: BOOK): Promise<any> {
        return await this.dbClient
            .updateBook(db, book)
            .then((response) => {
                return response;
            });
    }

}
