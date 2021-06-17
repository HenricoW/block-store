import { useEffect, useState } from "react";
import { fbStorage, fbFireStore, timestamp } from "../firebase/config";

const useStorage = (file, collectionStr) => {
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        // references
        const storageRef = fbStorage.ref(file.name);
        const databaseRef = fbFireStore.collection(collectionStr);

        storageRef.put(file).on(
            "state_changed",
            (snap) => {
                let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(percentage);
            },
            (error) => {
                console.log("File upload error occured: ", error.code);
                setError(error);
            },
            async () => {
                const url = await storageRef.getDownloadURL();
                await databaseRef.add({ url, createdAt: timestamp() });
                setUrl(url);
            }
        );
    }, [file, collectionStr]);

    return { error, progress, url };
};

export default useStorage;
