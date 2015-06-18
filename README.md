# **jqv Form Validation**

This jQuery plugin validates forms elements containing the class **_required_**, **_email_**, **_zip_** or **_phone_**.
<br/>

`bower install jqv`


###Activating the plugin
 
    
    
`$('#form').jqv();`


    
    <form id="form" method="post" action="#">
       <input id="input_NameFirst" class="required alpha" name="NameFirst" type="text" />
    </form>
    


###Regular Expressions
The plugin has defaults regular expression and message but you can add your own.
    
    $('#form').jqv(
       alphaRegEX  : /^[ --- ]$/,
       emailRegEx  : /^[ --- ]$/,
       phoneRegEx  : /^[ ... ]$/,
       postalRegEx : /^[ *** ]$/,

       defaultColor  : '#464646',
       errorColor    : '#ed1c24',

        // error messages
        errorMsg      : 'This field required.',
        alphaErrorMsg : 'Use alphpa letters.',
        emailErrorMsg : 'Use a valid email.',
        phoneErrorMsg : 'Use a valid US format.',
        zipErrorMsg   : 'Use a valid US format.',
        selectErrorMsg: 'Select One',
        radioErrorMsg : 'You must select one.',
        checkboxErrorMsg : 'You must check to continue.',

        // custom classes
        selectErrorClass : '',

        onSuccess: function() {},
        onErrors: function() {}
    );
    
