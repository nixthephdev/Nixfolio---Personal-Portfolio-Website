(function ($) {
    "use strict";

    // Inject success modal into the DOM once
    var modalHTML = [
        '<div id="successModal" style="',
            'display:none;position:fixed;inset:0;z-index:99999;',
            'align-items:center;justify-content:center;',
            'background:rgba(0,0,0,0.75);backdrop-filter:blur(4px);',
        '">',
            '<div style="',
                'background:#1F1F1F;border-radius:20px;padding:48px 40px 40px;',
                'max-width:400px;width:90%;text-align:center;',
                'box-shadow:0 24px 60px rgba(0,0,0,0.5);',
                'transform:scale(0.85);opacity:0;',
                'transition:transform 0.35s cubic-bezier(0.34,1.56,0.64,1),opacity 0.3s ease;',
            '" id="successModalInner">',
                '<div style="margin-bottom:20px;">',
                    '<svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">',
                        '<circle cx="36" cy="36" r="34" stroke="#C9F31D" stroke-width="2.5" ',
                            'stroke-dasharray="213.6" stroke-dashoffset="213.6" ',
                            'style="transition:stroke-dashoffset 0.6s ease 0.1s;" id="successCircle"/>',
                        '<polyline points="20,37 31,48 52,26" ',
                            'stroke="#C9F31D" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" ',
                            'fill="none" stroke-dasharray="50" stroke-dashoffset="50" ',
                            'style="transition:stroke-dashoffset 0.45s ease 0.55s;" id="successCheck"/>',
                    '</svg>',
                '</div>',
                '<h3 style="color:#FFFFFF;font-size:1.5rem;font-weight:700;margin-bottom:10px;">Message Sent!</h3>',
                '<p style="color:#B0AFAF;font-size:0.95rem;line-height:1.6;margin-bottom:28px;">',
                    "Thanks for reaching out. I'll get back to you as soon as possible.",
                '</p>',
                '<button id="successModalClose" class="theme-btn" style="border:none;font-size:0.9rem;padding:10px 36px;">',
                    'Got it!',
                '</button>',
            '</div>',
        '</div>'
    ].join('');

    $('body').append(modalHTML);

    function showSuccessModal() {
        var $modal = $('#successModal');
        var $inner = $('#successModalInner');
        $modal.css('display', 'flex');
        // Trigger animation on next frame
        setTimeout(function () {
            $inner.css({ transform: 'scale(1)', opacity: '1' });
            document.getElementById('successCircle').style.strokeDashoffset = '0';
            document.getElementById('successCheck').style.strokeDashoffset = '0';
        }, 20);
    }

    function hideSuccessModal() {
        var $modal = $('#successModal');
        var $inner = $('#successModalInner');
        $inner.css({ transform: 'scale(0.85)', opacity: '0' });
        // Reset SVG for next time
        document.getElementById('successCircle').style.strokeDashoffset = '213.6';
        document.getElementById('successCheck').style.strokeDashoffset = '50';
        setTimeout(function () { $modal.css('display', 'none'); }, 320);
    }

    $('#successModalClose').on('click', hideSuccessModal);
    $('#successModal').on('click', function (e) {
        if ($(e.target).is('#successModal')) hideSuccessModal();
    });

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
        var formId = $form.attr('id');
        var formData = {};

        if (formId === 'contactForm') {
            formData = {
                name: $form.find("#name").val(),
                email: $form.find("#email").val(),
                phone_number: $form.find("#phone_number").val(),
                subject: $form.find("#subject").val(),
                message: $form.find("#message").val()
            };
        } else if (formId === 'contactForms') {
            formData = {
                name: $form.find("input[name='name']").val(),
                email: $form.find("input[name='email']").val(),
                message: $form.find("textarea[name='message']").val(),
                phone_number: '',
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
                if (response.includes("successfully")) {
                    formSuccess($form);
                } else {
                    formError($form);
                    submitMSG(false, response, $form);
                }
            },
            error: function () {
                formError($form);
                submitMSG(false, "Something went wrong. Please try again.", $form);
            }
        });
    }

    function formSuccess($form) {
        $form[0].reset();
        showSuccessModal();
    }

    function formError($form) {
        $form.removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg, $form) {
        var msgClasses = valid ? "h4 text-left tada animated text-success" : "h4 text-left text-danger";
        var $msgSubmit = $form.find("#msgSubmit");
        if ($msgSubmit.length === 0) {
            $form.append('<div id="msgSubmit" class="mt-3"></div>');
            $msgSubmit = $form.find("#msgSubmit");
        }
        $msgSubmit.removeClass().addClass(msgClasses).text(msg);
    }
}(jQuery));
