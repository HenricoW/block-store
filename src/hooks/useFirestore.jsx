import { useEffect, useState } from "react";
import { fbFireStore } from "../firebase/config";

// Get an array of objects containing the id's and data
// of items stored in the FireStore database
// @param collection :- (string) path of FireStore collection
const useFirestore = (collection) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const unsub = fbFireStore.collection(collection).onSnapshot((snap) => {
            let documents = [];
            snap.forEach((doc) => {
                documents.push({ ...doc.data(), id: doc.id });
            });

            setDocs(documents);
        });

        return unsub();
    }, [collection]);

    return docs;
};

export default useFirestore;
