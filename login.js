
  class User {
    constructor() {}

    async login(u, p) {
      this.username = u;
      this.password = p;

      let acctual_data = JSON.stringify(this);

      try {
        let res = await fetch(
          `https://masai-api-mocker.herokuapp.com/auth/login`,
          {
            method: "POST",

            body: acctual_data,

            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let convert = await res.json();

        console.log("convert:", convert);

        alert("User Log In successfully");

        window.location.href = "index.html";
      } catch (error) {
        console.log("error:", error);
      }
    }
  }

  let U1 = new User();

  const login = () => {
    const Name = document.getElementById("login-username").value;

    const Pass = document.getElementById("login-password").value;

    let Detail = U1.login(Name, Pass);

    console.log(Detail);
  };

  import navbar from "./components/navbar.js";

  document.getElementById("navbar").innerHTML = navbar();

