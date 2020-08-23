  export async function fetchQuestions() {
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