import {useState, useEffect} from "react";

export default function useLocalState( key, defaultValue ) {
    const [value, setValueState] = useState( () => {
        return getValueFromLocalStorage( key );
    } );

    useEffect( () => {
        const listener = ( e ) => {
            if ( e.storageArea === localStorage && e.key === key ) {
                setValueState( JSON.parse( e.newValue ) );
            }
        };
        window.addEventListener( "storage", listener );

        return () => {
            window.removeEventListener( "storage", listener );
        };
    }, [key] );

    const setValue = ( newValue ) => {
        setValueState( ( currentValue ) => {
            let value = null;

            if ( typeof newValue === "function" ) {
                value = newValue( currentValue );
            } else {
                value = newValue;
            }

            localStorage.setItem( key, JSON.stringify( value ) );

            return value;
        } );
    };

    return [value, setValue];
}

export const getValueFromLocalStorage = ( key ) => {
    const value = localStorage.getItem( key );
    return value ? JSON.parse( value ) : value;
};