/*
 * jQuery Form Validator Plugin
 * Copyright (c) 2015 Homero Cavazos
 * Version: 3.1.3 (24-JUN-2015)
 * Requires: jQuery v1.7.1 or later
 */
(function ($){

    var errors = false;
    var DEBUG = false;


    $.fn.jqv = function( options ){

        var $this = $(this);
        var formName = $this.attr('id');
        

        var defaults = {
            alphaRegEX    : /^([a-zA-Z]+\s)*[a-zA-Z]+$/,
            emailRegEx    : /^[a-zA-Z0-9][\w\+\.-]*@[a-zA-Z][\w\+\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/,
            phoneRegEx    : /^(\([0-9]{3}\)|[0-9]{3}-|[0-9]{3})([0-9]{3}-|[0-9]{3})[0-9]{4}$/,
            postalRegEx   : /^\d{5}(?:[-\s]\d{4})?$/,

            // colors
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
        };

        var methods = {
            validateField : function(fieldObj) {

                var fieldId = $('#' + fieldObj);
                var fieldValue = fieldId.val();
                fieldValue = $.trim(fieldValue);

                // only checks if its required
                if ( fieldId.hasClass( 'required' ) ) {
                    if ( fieldValue.length === 0 || fieldId.val() === opts.errorMsg ) {
                        errors = true;
                        fieldId.val( opts.errorMsg );
                        fieldId.css( 'color' , opts.errorColor );
                    }
                }
                //only checks if it's an zip field
                if( fieldId.hasClass( 'zip' ) ){
                    if (fieldValue.length !== 0) {
                        this.validateZip( fieldObj );
                    }
                }

                //only checks if it's an email field
                if( fieldId.hasClass( 'email' ) ){
                    if (fieldValue.length !== 0) {
                        this.validateEmail( fieldObj );
                    }
                }

                //only checks if it's an phone field
                if( fieldId.hasClass( 'phone' ) ){
                    if (fieldValue.length !== 0) {
                        this.validatePhone( fieldObj );
                    }
                }
                //only checks if it's an Alpha field
                if( fieldId.hasClass( 'alpha' ) ){
                    if (fieldValue.length !== 0) {
                        this.validateAlpha( fieldObj );
                    }
                }

            },//end validateField
            validateSelect : function(selectObj) {

                var selectedObj = selectObj.find('option:selected');
                var selectName = selectObj.attr('name');
                var selectId = selectObj.attr('id');


                if ( selectedObj.is(':disabled') ) {
                    errors = true;

                    if (DEBUG) { methods.log( selectName + ' : is required.'); }

                    if ( !$('.' + selectName.toLowerCase() + '_select_error' ).length ) {
                        selectObj.next().css('color',opts.errorColor);
                        selectObj.after('<span class="'+ selectName.toLowerCase() + '_select_error ' +opts.selectErrorClass+ '" >'+opts.selectErrorMsg+'</span>');
                        $('.'+selectName.toLowerCase() + '_select_error ').css( 'color' , opts.errorColor );
                    }

                }else{
                    //clear error
                    $('.' + selectName.toLowerCase() + '_select_error').remove();
                }

                 $('#'+selectId).change(function(){
                    if ( !selectedObj.is(':selected').length ) {
                        $('.' + selectName.toLowerCase() + '_select_error').remove();
                    }
                   });

            },//end validateSelect


            validateRadio : function(formName,radioGroup) {

                var radioGroupSelected = $('#'+formName+' :input[name$="'+radioGroup+'"]:checked').val();

                if (!radioGroupSelected) {
                    errors = true;

                    // If there is no error message, add one
                    if ( !$('.' + radioGroup + '_radio_error' ).length ) {
                        $('#'+formName+' :input[name$="'+radioGroup+'"]:first').before('<span class="' + radioGroup + '_radio_error" style="display:block;color:' +opts.errorColor+ ';font-size:12px;">'+opts.radioErrorMsg+'</span>');
                    }
                }else {
                    // If no errors, remove error element
                    $('.' + radioGroup + '_radio_error').remove();
                }

                $('#'+formName+' :input[name$="'+radioGroup+'"]').change(function(){
                     $('.' + radioGroup + '_radio_error').remove();
                });


            },//end validateRadio

            validateEmail : function(fieldObj) {

                var $el = $('#' + fieldObj);
                var fieldValue = $el.val();
                fieldValue = $.trim(fieldValue);

                if (!opts.emailRegEx.test(fieldValue)){
                    errors = true;
                    $el.val( opts.emailErrorMsg );
                    $el.css( 'color' , opts.errorColor );
                }

            },// end of validateEmail

            validateZip : function(fieldObj) {

                var $el = $('#' + fieldObj);
                var fieldValue = $el.val();
                fieldValue = $.trim(fieldValue);

                if (!opts.postalRegEx.test(fieldValue)){
                    errors = true;
                    $el.val( opts.zipErrorMsg );
                    $el.css( 'color' , opts.errorColor );
                }

            },// end of validateZip

            validatePhone : function(fieldObj) {

                var $el = $('#' + fieldObj);
                var fieldValue = $el.val();
                fieldValue = $.trim(fieldValue);

                if (!opts.phoneRegEx.test(fieldValue)){
                    errors = true;
                    $el.val( opts.phoneErrorMsg );
                    $el.css( 'color' , opts.errorColor );
                }

            },// end of validatePhone

            validateAlpha : function(fieldObj) {

                var $el = $('#' + fieldObj);
                var fieldValue = $el.val();
                fieldValue = $.trim(fieldValue);

                if (!opts.alphaRegEX.test(fieldValue) || fieldValue !== opts.errorMsg){
                    errors = true;
                    $el.val( opts.alphaErrorMsg );
                    $el.css( 'color' , opts.errorColor );
                }

            },// end of validateAlpha

            validateCheckbox : function(checkboxObj) {

                var $el = $('#' + checkboxObj);
                var checkboxId = $el.attr('id');

                if ( $('#'+checkboxId).is(':checked') ) {
                    if (DEBUG) { methods.log( checkboxId + ' is selected'); }

                    $('.' + $el.attr('name') + '_checkbox_error' ).remove();
                }
                else{
                    errors = true;
                    if ( !$('.' + $el.attr('name') + '_checkbox_error' ).length ) {
                        $('#' + checkboxObj+':first').before('<span class="' + $el.attr('name') + '_checkbox_error" style="display:block;color:' +opts.errorColor+ ';font-size:12px;">'+opts.checkboxErrorMsg+'</span>');
                        if (DEBUG) { methods.log(  $el.attr('id') + 'checkbox : is required.'); }
                    }
                }

                $el.change(function() {
                    if($(this).is(":checked")) {
                        $('.' + $el.attr('name') + '_checkbox_error' ).remove();
                    }

                });


            },// end of validateCheckbox
            log : function (message) {
              if (window['console'] && console['log']) {
                console.log(message);
              }
            }
        };// end of Methods

        var opts = $.extend( {}, defaults, options );

        $('input, textarea').focus(function() {

            switch( $.trim( $(this).val() ) ){
                case opts.errorMsg :
                case opts.emailErrorMsg :
                case opts.phoneErrorMsg :
                case opts.selectErrorMsg :
                case opts.zipErrorMsg :
                case opts.alphaErrorMsg :
                case opts.radioErrorMsg :
                    $(this).val('');
                    $(this).css( 'color' , opts.defaultColor);
                    break;
                default:
            }

        }).blur(function(){
            if ( $.trim( $(this).val() ) === '' ) {
                $(this).val('');
                $(this).css( 'color' , opts.defaultColor );
            }
        });




        return this.each(function(){
            $this.bind( "submit", validateForm );
            if (DEBUG) { methods.log('validating form: '+ formName ); }
        });//end return this.each







        function validateForm() {
            errors = false;
            // Collect radio group names.
            var radioGroupArray = [];

            // Start validating
            // Collect all the text inputs and validates
            $('#'+formName+' :input:not([type=\'radio\'], [type=\'select\'], [type=\'checkbox\'])').each( function() {
                methods.validateField( $(this).attr('id') );
            });

            $('#'+formName+' :input:radio').each(function() {
                // temporarily collect radio name
                var radioName = $(this).attr('name');
                if (DEBUG) { methods.log( 'Radio being checked: '+ radioName ); }
                // If radio is not in array, add it
                if ( $.inArray(radioName, radioGroupArray)===-1 && $(this).hasClass( 'required' ) ) {
                    radioGroupArray.push( radioName );

                    if (DEBUG) { methods.log( 'Radio being checked: '+ radioName ); }

                    methods.validateRadio( formName, $(this).attr('name') );
                }

            });// end of radio logic



            // Collect all the select drop down and validates
            $('#'+formName+' select').each(function() {
                // Is this select required?
                if( $(this).hasClass( 'required' ) ){
                    methods.validateSelect( $(this) );
                }// end of select drop down
            });

            // Collect checkbox
            $('#'+formName+' :input:checkbox').each(function(){

                if( $(this).hasClass( 'required' ) ){
                    //methods.log('must select');
                    methods.validateCheckbox( $(this).attr('id') );
                }// end of checkbox check
            });



            if (errors) {
                opts.onErrors.call( this );
                return false;
            }else{
                opts.onSuccess.call( this );
            }

        }

    };// end validateForm






})(jQuery);