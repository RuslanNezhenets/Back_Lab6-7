import {BOOKS_ROUTE, READERS_ROUTE, ISSUANCE_ROUTE, API_ROUTE} from "./utils/consts";
import Books from "./pages/Books";
import Readers from "./pages/Readers";
import Issuance from "./pages/Issuance";
import API from "./pages/API";

export const publicRoutes = [
    {path: BOOKS_ROUTE, Component: Books},
    {path: READERS_ROUTE, Component: Readers},
    {path: ISSUANCE_ROUTE, Component: Issuance},
    {path: API_ROUTE, Component: API},
]