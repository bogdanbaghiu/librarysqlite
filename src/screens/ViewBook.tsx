import { useNavigation } from '@react-navigation/native';
import getImageSize from 'image-size-from-url';
import React from 'react';
import * as RN from "react-native";
import { StyleSheet } from 'react-native';

export default function ViewBook(props: any) {

    const navigation = useNavigation();
    const [newItem, setNewItem]: any = React.useState(null);
    const [imageWidth, setImageWidth] = React.useState(250);
    const [imageHeight, setImageHeight] = React.useState(250);
    const predominantColor = 'white';
    const firstColorTitle = 'black';
    const secondColorTitle = 'black';

    React.useEffect(() => {
        if (!newItem && props && props.route && props.route.params) {
            setNewItem(props.route.params);
        }
    }, []);

    const IMAGE_COMPONENT = { type: 'image', key: 'image', style: styles.image };
    const TITLE_COMPONENT = { type: 'text', key: 'name', title: newItem?.name, style: [styles.title, { color: firstColorTitle }] };
    const AUTHOR_COMPONENT = { type: 'text', key: 'author', title: 'By ' + newItem?.author, style: [styles.author, { color: secondColorTitle }] };
    const PUBLISHER_COMPONENT = { type: 'text', key: 'publisher', title: newItem?.publisher, style: [styles.author, { color: secondColorTitle }] };
    const checkExistProperty = (property: string) => {
        if (newItem && newItem[property] && newItem[property] !== '') {
            return true;
        }
        return false;
    }

    const generateComponent = (component: any) => {
        if (component.type === 'image') {
            return generateImage(component);
        }
        else if (component.type === 'text') {
            return generateText(component);
        }
    }

    interface TEXT {
        key: string;
        style: any;
        title: string;
    }

    const generateText = (text: TEXT) => {
        return (
            <RN.Text
                id={text.key}
                style={text?.style}
            >
                {text?.title}
            </RN.Text>
        );
    }

    interface IMAGE {
        key: string;
        style?: any;
    }

    const generateImage = (image: IMAGE) => {
        const urlImage = newItem?.[image?.key] ?? '';
        if (urlImage === '') {
            return <RN.Image id={image.key}></RN.Image>;
        }
        try {
            getCustomImageSize(urlImage);
        } catch (error) {
            console.log(error);
        }
        return (
            <RN.Image source={{ uri: urlImage }}
                id={image?.key}
                style={[image?.style, { width: imageWidth, height: imageHeight, borderRadius: 10 }]}
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

    return (
        <RN.ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
            <RN.View id='mainContainer' style={styles.container}>
                {newItem &&
                    <RN.View id='imageTitleContainer' style={[styles.imageTitleContainer, { backgroundColor: predominantColor }]}>
                        {checkExistProperty('image') &&
                            <RN.View id='imageContainer' style={styles.imageContainer}>
                                {generateImage(IMAGE_COMPONENT)}
                            </RN.View>
                        }
                        {newItem &&
                            <RN.View id='titleContainer' style={styles.titleContainer}>
                                {generateComponent(TITLE_COMPONENT)}
                                {generateComponent(AUTHOR_COMPONENT)}
                                {generateComponent(PUBLISHER_COMPONENT)}
                            </RN.View>
                        }
                    </RN.View>
                }
            </RN.View>
            <RN.View style={styles.footer}>
                <RN.Pressable
                    id='save-buttons'
                    android_ripple={{ color: '#D8D8D8', borderless: false, radius: 4 }}
                    style={styles.button}
                    onPress={() => navigation.navigate('EditBook' as never, ...[{ ...newItem }] as never)}>
                    <RN.Text style={styles.buttonText} id='save-text'>Edit Book</RN.Text>
                </RN.Pressable>
            </RN.View>
        </RN.ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    imageTitleContainer: {
        padding: 20,
        marginTop: 0,
        width: '90%',
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {},
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
    },
    author: {
        fontSize: 16,
        fontWeight: '400',
        color: 'snow',
        textAlign: 'center',
    },
    div: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%'
    },
    button: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
        width: '90%',
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    buttonicon: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 4,
        elevation: 5,
        backgroundColor: 'black',
        margin: 5
    },
    footer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20
    },
});