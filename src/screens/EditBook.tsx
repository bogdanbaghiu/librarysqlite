import { useNavigation } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite/next';
import getImageSize from 'image-size-from-url';
import React from 'react';
import * as RN from "react-native";
import { BOOK } from 'src/interfaces/interfaces';
import { DBService } from 'src/services/DBService';

export default function EditBook(props: any) {

    const navigation = useNavigation();
    const [newItem, setNewItem]: any = React.useState(null);
    const [imageWidth, setImageWidth] = React.useState(250);
    const [imageHeight, setImageHeight] = React.useState(250);
    const db = useSQLiteContext();
    const dbService = DBService.getInstance();

    React.useEffect(() => {
        if (!newItem && props && props.route && props.route.params) {
            setNewItem(props.route.params as BOOK);
        }
    }, []);

    const IMAGE_COMPONENT = { type: 'image', key: 'image', id: Math.random() };

    interface IMAGE {
        key: string;
        style?: any;
    }

    const generateImage = (image: IMAGE) => {
        const urlImage = newItem?.[image?.key] ?? '';
        if (urlImage === '') {
            return <RN.Image id={`${Math.random()}`}></RN.Image>;
        }
        try {
            getCustomImageSize(urlImage);
        } catch (error) {
            console.log(error);
        }
        return (
            <RN.Image source={{ uri: urlImage }}
                id={`${Math.random()}`}
                style={[image?.style, { width: imageWidth, height: imageHeight, borderRadius: 10, marginBottom: 20 }]}
                resizeMode="cover"
            />
        );
    }

    const getCustomImageSize = async (urlImage: string) => {
        getImageSize(urlImage).then((data) => {
            if (data && data.height && data.width) {
                setImageHeight(data.height > 250 ? 250 : data.height);
                setImageWidth(data.width > 250 ? 250 : data.width);
            } else {
                setImageWidth(250);
                setImageHeight(250);
            }
        }).catch(() => {
            setImageWidth(250);
            setImageHeight(250);
        });
    }

    function saveBook() {
        dbService.updateBook(db, newItem as BOOK)
            .then(() => navigation.navigate('Books' as never))
            .catch(console.error);
    }

    const generateComponents = () => {
        return <>
            <RN.TextInput
                id={`${Math.random()}`}
                value={newItem?.isbn ?? ''}
                onChangeText={(text) => setNewItem({ ...newItem, isbn: text })}
                placeholder={'ISBN'}
                style={styles.inputContainer}
                keyboardType={'number-pad'}
            />
            <RN.TextInput
                id={`${Math.random()}`}
                value={newItem?.name ?? ''}
                onChangeText={(text) => setNewItem({ ...newItem, name: text })}
                placeholder={'Name'}
                style={styles.inputContainer}
            />
            <RN.View style={styles.div} id={`${Math.random()}`}>
                <RN.TextInput
                    id={`${Math.random()}`}
                    value={newItem?.image ?? ''}
                    onChangeText={(text) => setNewItem({ ...newItem, image: text })}
                    placeholder={'Image'}
                    style={[styles.inputContainer, { flex: 1 }]}
                />
            </RN.View>
            <RN.TextInput
                id={`${Math.random()}`}
                value={newItem?.author ?? ''}
                onChangeText={(text) => setNewItem({ ...newItem, author: text })}
                placeholder={'Author'}
                style={styles.inputContainer}
            />
        </>
    }

    return (
        <RN.ScrollView contentContainerStyle={{ flexBasis: 'auto' }}>
            <RN.View style={styles.container}>
                {newItem && newItem.image && generateImage(IMAGE_COMPONENT)}
                {newItem && generateComponents()}
                <RN.Pressable
                    key='save-buttons'
                    android_ripple={{ color: '#D8D8D8', borderless: false, radius: 4 }}
                    style={styles.buttonSave}
                    onPress={saveBook}
                >
                    <RN.Text style={styles.ButtonSaveText} id='save-text'>Save</RN.Text>
                </RN.Pressable>
            </RN.View>
        </RN.ScrollView>
    )
}

const styles = RN.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    div: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonSave: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        width: '90%'
    },
    ButtonSaveText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    inputContainer: {
        width: '100%',
        padding: 13,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
    },
});