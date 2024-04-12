import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { BOOK } from 'src/interfaces/interfaces';

function Book(book: BOOK) {

    const navigation = useNavigation();

    const generateImage = (sourceImage: string) => {
        if (sourceImage !== undefined) {
            return (
                <Image
                    source={{ uri: sourceImage }}
                    resizeMode='cover'
                    style={[styles.img]} />
            );
        }
    };

    return (
        <View style={styles.bookContainer} id={book.isbn}>
            <Pressable
                style={({ pressed }) => [
                    { opacity: pressed ? 0.5 : 1.0, padding: 10, borderRadius: 12 }
                ]}
                onPress={() => {
                    navigation.navigate('ViewBook' as never, ...[{ ...book }] as never)
                }}
            >
                <View style={styles.card}>
                    {generateImage(book.image)}
                    <View style={[styles.cardTextVertical, { width: '77%', maxWidth: '100%' }]}>
                        <View style={[styles.cardTextVertical, { width: '100%', maxWidth: '100%' }]}>
                            <Text style={styles.name}>{book.name}</Text>
                            <Text style={styles.author}>By {book.author}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    bookContainer: {
        margin: 10,
        marginLeft: 18,
        marginRight: 18,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 14,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
    },
    img: {
        width: 70,
        height: 100,
        marginRight: 10,
        borderRadius: 10
    },
    cardTextVertical: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    cardTextHorizontal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 10
    },
    cardTextHorizontalSpaceBetween: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    author: {
        fontSize: 13,
        color: 'grey',
    },
    smallText: {
        fontSize: 10,
        color: 'grey'
    },
    mediumText: {
        fontSize: 12,
        color: 'rgba(221, 5, 37, 0.99)',
        fontWeight: 'bold'
    }
});

export default memo(Book, (prevProps, nextProps) => prevProps.isbn === nextProps.isbn);