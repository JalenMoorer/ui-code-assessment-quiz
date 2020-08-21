// export async function getQuestions() { // (1)
//     const response = await fetch('http://localhost:4000/api/questions'); // (2)
  
//     if (response.status === 200) {
//       let json = await response.json(); // (3)
//       return json;
//     }
  
//     throw new Error(response.status);
//   }


  export async function getQuestions() {
    try {
        const response = await fetch('http://localhost:4000/api/questions');
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      } catch (error) {
        console.log(error);
    }
  }