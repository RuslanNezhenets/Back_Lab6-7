import React from 'react';
import {Routes, Route} from 'react-router-dom'
import {publicRoutes} from "../routes";
import Books from "../pages/Books";

const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(route =>
                <Route key={route.path} path={route.path} element={<route.Component/>}/>
            )}
            <Route path="*" element={<Books/>}/>
        </Routes>
    );
};

export default AppRouter;