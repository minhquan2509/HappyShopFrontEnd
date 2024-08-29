export async function my_request(endpoint:string) {
    
    const response = await fetch(endpoint)

    if(!response.ok){
        throw new Error(`Access deny! ${endpoint}`);
    }
    
    return response.json();
}