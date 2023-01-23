// указываем что внутри функции будет асинхр код
const postData = async (url, data) => {
    // ждёт результата
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    // ждёт результата
    return await res.json();

};

 // указываем что внутри функции будет асинхр код
 async function getResource(url) {
    // ждёт результата
   let res = await fetch(url);

   if (!res.ok) {
       throw new Error(`Could not fetch ${url}, status: ${res.status}`);
   }
   // ждёт результата
   return await res.json();
}

export {postData};
export {getResource};