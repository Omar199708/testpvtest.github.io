/* <!-- send mail to client -->
<script>
  function sendMail(){
  var params = {
  from_name : document.getElementById("fullName").value,
  email_id : document.getElementById("email_id").value,
  message : document.getElementById("message").value
}
emailjs.send("service_2vgzf0o","template_tf5jz2c", params).then(function(res){
  alert("success!" + res.status);
})
}
</script>


<script type="text/javascript">
   (function(){
      emailjs.init("SztSptZvc18GUl41R");
   })();
</script> */



/* <h2>Contact Us</h2>
<input type="text" id="fullName" placeholder="Enter Name">
<input type="email" id="email_id" placeholder="Enter Email">
<textarea type="text" id="message" placeholder="Enter Message"></textarea>
<button onCLick="sendMail()">Send</button> */