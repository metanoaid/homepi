setInterval(function() {
window.document.getElementById("clock").innerHTML=new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});;
},1000);