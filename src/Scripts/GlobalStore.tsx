export class GlobalStore<T>
{
    #listeners: ( () => void)[] = [];
    #value: T;
    constructor( initialValue: T ) { this.#value = initialValue; }  
    getValue = () => this.#value;

    subscribe = ( callback: () => void ) =>
    {
        this.#listeners = [ ...this.#listeners, callback ];
        return () => { this.#listeners = this.#listeners.filter( x => x !== callback )} ;
    }

    setValue( v: T )
    {
        if( !Object.is( this.#value, v ) )
        {
            this.#value = v;
            for( let listener of this.#listeners )
                listener();
        }
    }
}