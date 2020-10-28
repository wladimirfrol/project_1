import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LinkCard } from '../components/LinkCard/LinkCard';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const DetailPage = () => {
    const { token } = useContext(AuthContext);
    const [link, setLink] = useState(null);
    const linkId = useParams().id;
    const { request, loading } = useHttp();

    const getLink = useCallback( async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            });
            setLink(fetched);
        } catch (e) {}
    }, [token, linkId, request]);

    useEffect(() => {
        getLink();
    }, [getLink]);

    if (loading) return (<div><h1>LOADING</h1></div>);

    return (
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    );
};