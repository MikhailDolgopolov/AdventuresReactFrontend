import { useEffect, useState } from "react";
import axios from "axios";

function useFetch<Type>(url:string):[Type|undefined, boolean, Error|null, Function] {
    const [data, setData] = useState<Type>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url]);

    function refetch () {
        setLoading(true);
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return [ data, loading, error, refetch ];
}

export default useFetch;

