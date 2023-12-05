import React, { useState } from "react";
import { Fragment } from "react";
import { Button, Image, ScrollView, StyleSheet, View } from "react-native";
// import ImagePicker from 'react-native-image-crop-picker';
import { openPicker } from '@baronha/react-native-multiple-image-picker';
import { Colors } from '../utils/Colors';
import SubHeader from "./SubHeader";

const Home = () => {
    // const [images, setImages] = useState([]);

    // const selectImages = () => {
    //     openPicker({
    //         multiple: true,
    //         mediaType: 'photo',
    //     }).then(response => {
    //         const selectedImages = response.map(image => image.path);
    //         setImages(selectedImages);
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // };

    // const uploadImages = () => {
    //     // Logic tải ảnh lên Firebase hoặc xử lý theo ý đồ của bạn
    // };

    return (
        <Fragment>
            <ScrollView>
                {/* {images.map((imageUri, index) => (
                    <Image key={index} source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
                ))}
                <Button title="Select Images" onPress={selectImages} />
                <Button title="Upload Images" onPress={uploadImages} /> */}
                <SubHeader />
            </ScrollView>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        backgroundColor: Colors.background,
    },
});

export default Home;