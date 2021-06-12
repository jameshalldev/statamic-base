var ajaxContactForm = function() {
    let form = document.getElementById('contact-form');
    let submit = document.querySelector('[data-contact-submit]');
    let success = document.querySelector('[data-contact-success]');
    let reCaptchaMessage = document.querySelector('[data-contact-recaptcha-fail]');

    function isCaptchaChecked() {
        return grecaptcha && grecaptcha.getResponse().length !== 0;
    }

    if (form != null) {
        console.log('Contact form');

        form.addEventListener("submit", function(e){
            e.preventDefault();
            var form = e.target
            var data = new FormData(form)
            var request = new XMLHttpRequest()
            
            if (isCaptchaChecked()) {

                reCaptchaMessage.classList.add('hidden');
        
                request.onreadystatechange = function(){
                    form.classList.add('hidden');
                    success.classList.remove('hidden');
                }

                request.open(form.method, form.action)
                request.send(data)
            } else {
                reCaptchaMessage.classList.remove('hidden');
            }
        });
    }
};
ajaxContactForm();