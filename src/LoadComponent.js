import React from 'react'
import Loadable from 'react-loadable'
const Loading = () => <p> Loading </p>

export const Home = Loadable({
    loader: () => import('./Page/home/Home'),
    loading: Loading,
    timeout: 5000,
});

export const NotFound = Loadable({
    loader: () => import('./Page/notFound/NotFound'),
    loading: Loading,
    timeout: 5000,
});

export const Editor = Loadable({
    loader: () => import('./Page/editor/Editor'),
    loading: Loading,
    timeout: 5000,
});
