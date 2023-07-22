async function login(e) {
    e.preventDefault();
    console.log(e.target.name);
  
    const loginDetails = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(loginDetails);
  
    try {
      const response = await axios.post('http://localhost:3000/users/login', loginDetails);
      alert(response.data.message);
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      window.location.href = '../expenseTracker/expense.html'
    } catch (err) {
      console.log(JSON.stringify(err));
      const errorMessage = err.response && err.response.data && err.response.data.err
        ? err.response.data.err
        : 'An error occurred. Please try again.';
      document.body.innerHTML += `<div style="color:red;">${errorMessage}</div>`;
    }
  }
  