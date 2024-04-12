import { BOOK } from "src/interfaces/interfaces";

export type StackNavigatorParamList = {
    Books: undefined;
    ViewBook: {
        book?: BOOK;
    };
};