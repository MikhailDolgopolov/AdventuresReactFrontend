import { useEffect, useState } from "react";
import axios from "axios";
import {serverProperties} from "../././Server/ServerProperties";
import {FetchResult} from "../Helpers/HelperTypes";

function useFetch<Type>(url:string, refetchSwitch?:boolean):FetchResult<Type> {
    const [data, setData] = useState<Type>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
            .get(serverProperties.root+url)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url, refetchSwitch]);


    return [ data, loading, error];
}

export default useFetch;

