import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useFocusEffect } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite/next';
import React, { useCallback, useEffect } from 'react';
import { FlatList } from 'react-native';
import Book from 'src/components/Book';
import ScreenLayout from 'src/components/native/ScreenLayout';
import { BOOK } from 'src/interfaces/interfaces';
import { DBService } from 'src/services/DBService';
import styled from 'styled-components/native';

export default function Home() {
    const [allBooksTitle, setAllBooksTitle] = React.useState('All');
    const [segmentControlIndex, setSegmentControlIndex] = React.useState<Number>(0);
    const [books, setBooks]: any[] = React.useState([]);
    const db = useSQLiteContext();
    const dbService = DBService.getInstance();

    useFocusEffect(
        React.useCallback(() => {
            setBooks([]);
            allBooksLength();
            allBooks();
        }, [])
    );

    useEffect(() => {
        allBooksLength();
        if (segmentControlIndex === 0) {
            allBooks();
        }
    }, [segmentControlIndex]);

    const allBooks = () => {
        dbService.getAllBooks(db)
            .then(books => setBooks(books))
            .catch((e) => {
                console.error(e);
                alert(e);
            });
    }

    const allBooksLength = () => {
        dbService.getAllBooksLength(db)
            .then(books => setAllBooksTitle('All (' + books + ')'))
            .catch(error => {
                console.error(error);
                setAllBooksTitle('All (' + books + ')');
            });
    }

    const renderItem = useCallback(
        ({ item }: { item: BOOK }) => <Book {...item}></Book>,
        []
    );

    return (
        <ScreenLayout testID="home-screen-layout">
            <SegmentedControl
                values={[allBooksTitle]}
                onChange={(event) => {
                    setSegmentControlIndex(event?.nativeEvent?.selectedSegmentIndex ?? 0);
                }}
                appearance={'dark'}
                style={{ margin: 10, height: '10%', elevation: 3 }}
            />
            <S.Content>
                <FlatList
                    data={books}
                    keyExtractor={item => item.isbn}
                    renderItem={renderItem}
                    initialNumToRender={10}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={10}
                    windowSize={5}
                    onEndReachedThreshold={3}
                    viewabilityConfig={{
                        minimumViewTime: 500,
                        itemVisiblePercentThreshold: 0.5
                    }}
                />
            </S.Content>
        </ScreenLayout>
    );
}

const S = {
    Content: styled.View`
      flex: 1;
      align-items: center;
      justify-content: center;
    `,
    Title: styled.Text`
      color: ${(p) => p.theme.primary};
      font-weight: 900;
      font-size: ${(p) => p.theme.size(200, 'px')};
      margin-bottom: ${(p) => p.theme.size(10, 'px')};
    `,
    Text: styled.Text`
      color: ${(p) => p.theme.secondary};
      font-weight: 700;
      font-size: ${(p) => p.theme.size(15, 'px')};
      margin-bottom: ${(p) => p.theme.size(15, 'px')};
    `
}