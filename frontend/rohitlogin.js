const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});



const form = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const mobileInput = document.getElementById('mobile');
const passwordInput = document.getElementById('password');
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
let previousPasswords = [];

// Signup Logic

form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Validate password
    console.log(passwordRegex.test(passwordInput.value));
    if (!passwordRegex.test(passwordInput.value)) {
        alert('Please enter a password that meets the required criteria.')
        return;
    }
    let data = {
        username: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    }

    // Submit form
    console.log(data)
    fetch("http://localhost:9800/signup", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            console.log("success", result)
            if (result) {
                swal("Sign Up Successful!", "Now You've an Account with us! Yayy 😊👏", "success");

            }
        })
        .catch(err => console.log(JSON.stringify(err)))

});




// Sign In Logic

let signInform = document.getElementById("signin-form")
let signedInName = document.getElementById("signedIn_Name")
let signupBtn = document.getElementById("signUpBtn")
let logout = document.getElementById("logOutBtn")
signInform.addEventListener("submit", (e) => {
    e.preventDefault()
    let data = {
        username: signInform[0].value,
        password: signInform[1].value
    }
    fetchLogin(data)

})
function fetchLogin(data) {

    fetch("http://localhost:8080/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            console.log("success", result)
            if (result.msg === 'Login Successful') {
                console.log(result);

                localStorage.setItem("LoggedName", result.username)
                localStorage.setItem("LoggedID", result.token)

                swal({
                    title: "Login Successful!",
                    text: "You can now access our services!",
                    icon: "success",
                    button: "Yay!🎉",
                }).then((value) => {
                    if (value) {
                        window.location.href = "./index.html";
                    }
                });


            }
            else if (result.msg === 'User not found') {

                swal("Failed! User Not Found ❌", "Go To Sign Up And Create New Account! 🥺🙏", "error");
            }
            else {
                swal("Failed! Wrong Password ❌", "Don't be in hurry! Type your Password Correctly 🙏", "error");

            }

        })
        .catch(err => console.log(err))

}
