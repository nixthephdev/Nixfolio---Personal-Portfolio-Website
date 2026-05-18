(function ($) {
    "use strict";
    
    // Handle both forms using a common class or multiple selectors
    $("#contactForm, #contactForms").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            formError($(this));
            submitMSG(false, "Did you fill in the form properly?", $(this));
        } else {
            event.preventDefault();
            submitForm($(this));
        }
    });

    function submitForm($form) {
        // Get form ID to determine which form was submitted
        var formId = $form.attr('id');
        var formData = {};

        if (formId === 'contactForm') {
            // Full contact form
            formData = {
                name: $form.find("#name").val(),
                email: $form.find("#email").val(),
                phone_number: $form.find("#phone_number").val(),
                subject: $form.find("#subject").val(),
                message: $form.find("#message").val()
            };
        } else if (formId === 'contactForms') {
            // Simple contact form
            formData = {
                name: $form.find("input[name='name']").val(),
                email: $form.find("input[name='email']").val(),
                message: $form.find("textarea[name='message']").val(),
                phone_number: '', // Set empty for optional fields
                subject: ''
            };
        }

        $.ajax({
            type: "POST",
            url: "assets/php/form-process.php",
            data: formData,
            success: function (response) {
                if (typeof response === 'object') {
                    response = JSON.stringify(response);
                }
                if (response.includes("successfully")){
                    formSuccess($form);
                } else {
                    formError($form);
                    submitMSG(false, response, $form);
                }
            },
            error: function(xhr, status, error) {
                formError($form);
                submitMSG(false, "Something went wrong. Please try again.", $form);
            }
        });
    }

    function formSuccess($form){
        $form[0].reset();
        submitMSG(true, "Message Submitted Successfully!", $form);
    }

    function formError($form){
        $form.removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg, $form){
        var msgClasses = valid ? "h4 text-left tada animated text-success" : "h4 text-left text-danger";
        
        // Create msgSubmit div if it doesn't exist
        var $msgSubmit = $form.find("#msgSubmit");
        if ($msgSubmit.length === 0) {
            $form.append('<div id="msgSubmit" class="mt-3"></div>');
            $msgSubmit = $form.find("#msgSubmit");
        }
        
        $msgSubmit.removeClass().addClass(msgClasses).text(msg);
    }
}(jQuery));