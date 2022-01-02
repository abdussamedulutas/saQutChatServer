export async function FetchBlob(request)
{
    let cache = await window.caches.open("v1");
    let res = await cache.match(request);
    if(res)
    {
        return res.blob();
    }else{
        cache.add(request)
        let response = await fetch(request);
        return response.blob();
    }
}
export async function FetchObjectURL(request)
{
    let e = await FetchBlob(request);
    return URL.createObjectURL(e);
}