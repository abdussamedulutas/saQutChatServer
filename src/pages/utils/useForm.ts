import { useState } from "react";

interface useIForm
{
    input(name:string) : {value:string,onChange:(e:React.ChangeEvent<HTMLInputElement>) => any,disabled:boolean,readOnly:boolean};
    val(name:string,value?:string) : string|void;
    get(name:string) : any;
    set(name:string,value:any);
    state: {[key:string]:any};
    lock();
    unlock();
    disabled: boolean;
}

export default function useForm(e?:{[key:string]:any}) : useIForm
{
    let [data,setData] = useState<{[key:string]:any}>(e);
    let [locked,setLocked] = useState<boolean>(false);
    function set(name:string,value:any)
    {
        if(!locked) setData(old => ({
            ...old,
            [name]: value
        }));
    }
    function get(name:string) : any
    {
        return data[name]
    }
    function val(name:string,value?:string) : string|void
    {
        if(value === undefined)
        {
            return get(name);
        }else{
            return set(name,value);
        }
    }
    function input(name:string) : {value:string,onChange:(e:React.ChangeEvent<HTMLInputElement>) => any,disabled:boolean,readOnly:boolean}
    {
        return {
            value: get(name),
            onChange: (e) => set(name, e.target.value),
            disabled: locked,
            readOnly: locked
        }
    }
    return {
        input,
        val,
        get,
        set,
        disabled:locked,
        state:data,
        lock: () => setLocked(true),
        unlock: () => setLocked(false)
    }
}