
/**
 * Globális tároló tetszőleges típushoz.
 */
export class GlobalStore<T>
{
    #listeners: ( () => void)[] = [];
    #value: T;

    /**
     * Konstruktor
     *
     * @param initialValue - A tároló alapvető tartalma.
     */
    constructor( initialValue: T ) { this.#value = initialValue; }  

    getValue = () => this.#value;

    
    /**
     * Feliratkozó függvény a módósításokra.
     *
     * @param callback - A feliratkozni kívánó fv.
     * 
     * @returns Egy függvény, amelyet meghívva a feliratkozás megszüntethető.
     */
    subscribe = ( callback: () => void ) =>
    {
        this.#listeners = [ ...this.#listeners, callback ];
        return () => { this.#listeners = this.#listeners.filter( x => x !== callback )} ;
    }

    
    /**
     * A tárolt adat módosítása
     *
     * @param v - Az új érték.
     */
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