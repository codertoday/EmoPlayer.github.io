
var loggedin = localStorage.getItem('loggedin');
//alert(loggedin);
console.log(loggedin);
if(loggedin=='yes'){

    document.getElementById('login').innerHTML = 'Logout'
}

// import {PythonShell} from 'python-shell';
function goToPlayer(){
    // location.href=''
    // document.getElementById('getStarted-btn').src='manage.py';

    var PythonShell = require('python-shell');
    
    PythonShell.run('/manage.py', function (err) {
    if (err) throw err;
    console.log('finished');
});

}

//document.getElementById('getStarted-btn').onclick = function() { goToPlayer() };  