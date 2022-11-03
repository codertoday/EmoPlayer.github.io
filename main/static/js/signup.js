// var ref = new Firebase("https://emoplayer-17785-default-rtdb.firebaseio.com");
var firebaseConfig = {

    apiKey: "AIzaSyDixP3y0Txc0UJmEMkpqxphT5xpe9Lm2IY",

    authDomain: "emoplayer-17785.firebaseapp.com",

    projectId: "emoplayer-17785",

    storageBucket: "emoplayer-17785.appspot.com",

    messagingSenderId: "253735179695",

    appId: "1:253735179695:web:31e1e295c776deed254b5a",

    measurementId: "G-4CWPE1JB68"

  };

  function signUp(){
    firstName= document.getElementById('name').value;
    mail= document.getElementById('email').value;
    phone= document.getElementById('phone').value;
    password1= document.getElementById('setpassword').value;
    password2= document.getElementById('confirmpassword').value;

    if(validate_email(mail)==false || validate_passkey(password1)==false||validate_phone(phone)){
    alert('Email/Password/Mobile No is Outta Line!')
    return
    }
    if(confirm_Password(password2)==false){
    alert("Your Passwords dont match!")
    return
    }
    if(validate_field(firstName)==false){
    alert("There is some error in the info!")
    return
    }
    auth.createUserWithEmailAndPassword(mail,password2)
    .then(function(){
        console.log("hi")
        var user = getAuth().currentUser

        var dbref = database.ref()
        var userdata = {
            firstName:firstName,
            mail:mail,
            phone:phone,
            last_login:Date.now()
        }
        console.log(userdata)
        dbref.child("Users").child(userdata.uid).child(mail).setValue(mail);
        dbref.child("Users").child(userdata.uid).child(phone).setValue(phone);
        dbref.child("Users").child(userdata.uid).child(firstName).setValue(firstName);
    
        alert("User Created!")
    })
    .catch(function(error){
        var error_code=error.code
        var errormsg=error.message

        alert(errormsg)
    })
  }

function validate_email(mail){
   exp= /^[^@]+@\w+(\.\w+)+\w$/;
   if(exp.test(mail)==true){
    return true
   } else{
    return false
   }
}

function validate_passkey(password1){
    if (password1 < 6){
        return false
    }
    else{
        return true
    }
}

function confirm_Password(password1,password2) {
    if (password1==password2) {
      document.getElementById('message').innerHTML = 'Successfully Registered';
    } else {
      document.getElementById('message').innerHTML = 'Please Enter Your Password Again!';
    }
}

function validate_phone(phone){
    var phoneno = /^\d{10}$/;
    if((inputtxt.value.match(phone)))
    {
        return true;
    }
        else
    {
        return false;
    }
}

function validate_field(firstName){
    if(firstName==null){
        return false;
    }

    if(firstName.length <= 0){
        return false;
    } else {
        return true;
    }
}

