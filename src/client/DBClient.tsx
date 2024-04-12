import { SQLiteDatabase, SQLiteRunResult } from "expo-sqlite/next";
import { BOOK } from "src/interfaces/interfaces";

export class DBClient {
    static instance: DBClient;

    public static getInstance(): DBClient {
        if (DBClient.instance === undefined) {
            DBClient.instance = new DBClient();
        }
        return DBClient.instance;
    }

    constructor() {
    }

    async getAllBooks(db: SQLiteDatabase): Promise<BOOK[]> {
        const query = 'SELECT * FROM books';
        const results = await db.getAllAsync(query);
        if (results !== undefined) {
            return results as BOOK[];
        }
        return [];
    }

    async getAllBooksLength(db: SQLiteDatabase): Promise<any> {
        const query = 'SELECT count(*) as books FROM books';
        const results = await db.getAllAsync(query);
        if (results !== undefined) {
            if (results.length === 1 && results[0] !== undefined
                && results[0] !== null && results[0] !== '{}') {
                const booksLength: any = results[0];
                return ('books' in booksLength ? booksLength.books : 0)
            }
        }
        return 0;
    }

    async updateBook(db: SQLiteDatabase, book: BOOK): Promise<SQLiteRunResult> {
        const query = 'UPDATE books SET '
            + `name = '${book.name}', author = '${book.author}' `
            + `WHERE isbn = '${book.isbn}';`;
        return await db.runAsync(query);
    }
}
