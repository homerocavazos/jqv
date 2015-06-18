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
The plugin has default regular expression but you can add your own.
    
    $('#form').jqv(
       emailRegEx  : /^[ --- ]$/,
       phoneRegEx  : /^[ ... ]$/,
       postalRegEx : /^[ *** ]$/,
    );
    
