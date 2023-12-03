/* eslint-disable  @typescript-eslint/no-explicit-any */
import * as React from "react";
import { NavigateFunction, useSearchParams, useLocation, useNavigate, useParams } from "react-router-dom";

export interface IWithRouter<Params = any, State = any> {
    location: State;
    navigate: NavigateFunction;
    params: Params;
    searchParams: URLSearchParams;
}


export function WithRouter<P extends IWithRouter>( Child: React.ComponentClass<P> ) {
    return function Wrapper( props: Omit<P, keyof IWithRouter> ) {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        const [searchParams] = useSearchParams();
        return <Child { ...props as P } navigate={ navigate } location={ location } params={ params } searchParams={searchParams} />;
    };
}