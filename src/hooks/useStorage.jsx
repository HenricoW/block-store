import { useEffect, useState } from "react";
import { fbStorage } from "../firebase/config";
import { useDispatch } from "react-redux";
import { setImageUrl } from "../redux/actions/adminPanelActions";

const useStorage = (file, collectionStr) => {
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(null);
    const [url, setUrl] = useState(null);

    // redux
    const dispatch = useDispatch();

    useEffect(() => {
        // references
        const storageRef = fbStorage.ref(file.name);
        setUrl(null);
        setProgress(0);

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
                if (collectionStr === "images") dispatch(setImageUrl(url));
                setUrl(url);
            }
        );
    }, [file, collectionStr, dispatch]);

    return { error, progress, url };
};

export default useStorage;
