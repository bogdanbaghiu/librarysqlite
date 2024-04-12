import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite/next';
import { SQLiteProvider } from 'expo-sqlite/next';
import { Suspense, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const DATABASE_NAME = 'libraryMedium.db';

export function DBContextProvider({ children }: { children: any }) {
    const [isLoading, setIsLoading] = useState(false);

    async function openDatabase(): Promise<any> {
        if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
        }
        const dbAsset = require('../../assets/' + DATABASE_NAME);
        const asset = await Asset.fromModule(dbAsset).downloadAsync();
        const dbUri = Asset.fromModule(dbAsset).uri;
        await FileSystem.copyAsync({
            from: asset?.localUri ?? dbUri,
            to: FileSystem.documentDirectory + 'SQLite/' + DATABASE_NAME,
        });
        const database = await SQLite.openDatabaseAsync(DATABASE_NAME);
        const queryResult = await database.getAllAsync('Select count(*) as numBooks from books');
        console.log(queryResult);
        return database;
    }

    useEffect(() => {
        openDatabase()
            .then(() => setIsLoading(false))
            .catch((e) => {
                console.error(e);
                openDatabase()
                    .then(() => setIsLoading(false))
                    .catch((e) => {
                        console.error(e);
                        alert(e);
                    });
            });
    }, []);

    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size={'large'} />
                <Text style={{ marginTop: 10, fontSize: 18 }}>Loading database...</Text>
            </View>
        );
    }

    return (
        <Suspense
            fallback={
                <View style={{
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size={'large'} />
                    <Text style={{ marginTop: 10, fontSize: 18 }}>Loading database...</Text>
                </View>
            }>
            <SQLiteProvider
                databaseName={DATABASE_NAME}
                useSuspense={true}
            >
                {children}
            </SQLiteProvider>
        </Suspense>
    )
}