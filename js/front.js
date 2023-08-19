function RecaptchaExt() {

    this.recaptchaAction = '';
    this.setRecaptchaAction = function (recaptchaAction) {
        this.recaptchaAction = recaptchaAction;
    }

    this.execute = function(sendform)
    {
        grecaptcha.ready(function () {
            let key = $('#recaptcha_script').data('key');
            grecaptcha.execute(key, {action: this.recaptchaAction})
                .then(function (token) {
                    sendform(token);
                });
        });
    }
}

function FeedbackReviewClass($form){
    this.$form = $form;

    this.send = function(token){

        let form = this.$form;
        let data = form.serialize();

        let formExtended = this.$form.serializeArray();
        formExtended.push({name: 'recaptcha_token', value: token});
        let request = {
            url: this.$form.prop('action'),
            data: formExtended
        };

        let modalContent = form.find('.js-modal-content-main');
        $.post(request).done(function () {
            setTimeout(function () {
                form[0].reset();
                modalContent.hide();
                $('.js-modal-result-ok')
                    .css('height', modalContent.css('height'))
                    .removeClass('modal__content_loading')
                    .show();
            }, 1000);

        }).fail(function () {
            setTimeout(function () {
                $('.js-modal-result-error')
                    .css('height', modalContent.css('height'))
                    .removeClass('modal__content_loading')
                    .show();
                modalContent.removeClass('modal__content_loading');
                modalContent.hide();
            }, 1000);
        });
    }
}




$(document).ready(function() {
    sliders();
    menu();

    $('.js-feedback-form input:required').each(function (k, $v){
        $($v).get(0).addEventListener('invalid', function(e){
            e.preventDefault();
            $(this).closest('.form__row').find('.form-field__error-message').show();
        });
        $($v).get(0).addEventListener('input', function(e){
            e.preventDefault();
            $(this).closest('.form__row').find('.form-field__error-message').hide();
        });
    });

    $('.js-franchisee-form input:required').each(function (k, $v){
        $($v).get(0).addEventListener('invalid', function(e){
            e.preventDefault();
            $(this).closest('.form__row').find('.form-field__error-message').show();
        });
        $($v).get(0).addEventListener('input', function(e){
            e.preventDefault();
            $(this).closest('.form__row').find('.form-field__error-message').hide();
        });
    });




    $('.js-feedback-form').submit(function (){
        let modalContent = $(this).find('.modal__content');
        modalContent.addClass('modal__content_loading');
        $('.form-field__error-message').hide();

        let feedbackReview = new FeedbackReviewClass($(this));
        let recaptchaExt = new RecaptchaExt();
        recaptchaExt.setRecaptchaAction('feedback');
        recaptchaExt.execute(function (token) {
            feedbackReview.send(token);
        });

        return false;
    });

    $('.js-franchisee-form').submit(function (){
        let modalContent = $(this).find('.modal__content');
        modalContent.addClass('modal__content_loading');

        let feedbackReview = new FeedbackReviewClass($(this));
        let recaptchaExt = new RecaptchaExt();
        recaptchaExt.setRecaptchaAction('franchise');
        recaptchaExt.execute(function (token) {
            feedbackReview.send(token);
        });

        return false;
    });


    // $(".office-page-track__more").hide();
    // $(".office-page-track__state.office-page-track__state_not-found").hide();
    // $(".office-page-track__state.office-page-track__state_error").hide();
    // $(".office-page-track__form-information").hide();
    //
    //
    // let formWrap = $('.office-page-track');
    // let form = $('.office-page-track > form');
    //
    // form.on('submit', function (e) {
    //     e.preventDefault();
    //
    //     let data = form.serialize();
    //
    //     let url = 'api/tracking/get-tracking-info';
    //
    //     $.ajax({
    //         url: url,
    //         method: 'post',
    //         data: data,
    //         dataType: 'json',
    //         success: function (r) {
    //             if(r.status) {
    //
    //                 $(".city-from .office-page-track__form-information-city").text(r.cityFrom.name)
    //                 $(".city-to .office-page-track__form-information-city").text(r.cityTo.name)
    //
    //                 $(".city-from .office-page-track__form-information-date").text(r.orderDate)
    //                 $(".city-to .office-page-track__form-information-date").text(r.tariffDateEnd)
    //
    //                 $(".office-page-track__form-information-status span").text(r.status.name)
    //
    //                 $(".office-page-track__form-information").show();
    //
    //
    //                 if(r.trackingDetails) {
    //                     r.trackingDetails.forEach(function (detailItem, index){
    //                         let  detailBlock = $('.office-page-track__form-detail-item');
    //                         if(index == 0) {
    //                           let  detailBlock =
    //                         }
    //                     });
    //                 }
    //
    //
    //
    //
    //                 console.log(r);
    //             }
    //         },
    //         complete: function (r) {
    //
    //         }
    //     });
    //
    // })

    //demoFormProcessing
    $(".js-form").on('submit', function() {
        $(this).hide();
        $(".js-form-result").show();
        return false;
    })

    $('.calculator__content_step1 .primary-button_submit').click(function () {
        $('.calculator__content').has(this).addClass('calculator__content_loading');
        setTimeout(function () {
            $('.calculator__content_step1').hide();
            $('.calculator__content_step2')
                .removeClass('calculator__content_loading')
                .show()
            ;
        }, 3000);
        return false;
    });

    $('.calculator__content_step2 .calculator__step-link_back').click(function () {
        $('.calculator__content_step2').hide();
        $('.calculator__content_step1')
            .removeClass('calculator__content_loading')
            .show()
        ;
        return false;
    });

    $('.calculator__content_step2 input[type=radio]').change(function () {
        $('.calculator__content').has(this).addClass('calculator__content_loading');
        setTimeout(function () {
            $('.calculator__content_step2').hide();
            $('.calculator__content_step3')
                .removeClass('calculator__content_loading')
                .show()
            ;
        }, 1000);
        return false;
    });

    $('.calculator__content_step3 .calculator__step-link_back').click(function () {
        $('.calculator__content_step3').hide();
        $('.calculator__content_step2')
            .removeClass('calculator__content_loading')
            .show()
        ;
        return false;
    });

    $('.calculator__content .calculator__step-link_repeat').click(function () {
        $('.calculator__content')
            .css('display', 'none')
        ;
        $('.calculator__content_step1')
            .removeClass('calculator__content_loading')
            .show()
        ;
        return false;
    });

    $('.calculator__content_step3 .primary-button_submit').click(function () {
        var calculatorContent = $('.calculator__content').has(this);
        calculatorContent.addClass('calculator__content_loading');
        setTimeout(function () {
            $('.calculator__content_step3').hide();
            $('.js-calculator__content_step-result-ok')
                .css('height', calculatorContent.css('height'))
                .removeClass('calculator__content_loading')
                .show()
            ;
        }, 3000);
        return false;
    });

    var cities = [
        { value: 'Moscow', data: 1 },
        { value: 'Novosibirsk', data: 2 },
        { value: 'Ekaterinburg', data: 3 },
        { value: 'Irkutsk', data: 4 },
        { value: 'Vladivostok', data: 5 },
    ];

    // var countries = [
    //     { value: 'USA', data: 1 },
    //     { value: 'China', data: 2 },
    //     { value: 'UK', data: 3 },
    //     { value: 'Germany', data: 4 },
    //     { value: 'Turkey', data: 5 },
    // ];

    $('.form-field__input[name=from]')
        .autocomplete({
            //serviceUrl: '',
            lookup: cities,
            noCache: true,
            onSelect: function (suggestion) {
                $(this).val(suggestion.value);
            },
        })
    ;

    // $('.form-field__input[name=contact-country]')
    //     .autocomplete({
    //         //serviceUrl: '',
    //         lookup: countries,
    //         noCache: true,
    //         onSelect: function (suggestion) {
    //             $(this).val(suggestion.value);
    //         },
    //     })
    // ;
    modalOpen = function(jsel)
    {
        if ($('.modal-opened').length) {
            modalClose($('.modal-opened'));
        }

        if ($('.modal-bg').length == 0) {
            $('<div></div>')
                .addClass('modal-bg')
                .css('width',$(document).width())
                .css('height',$(document).height())
                .prependTo('body')
            ;
        }

        var vscroll = (document.all ? document.scrollTop : window.pageYOffset);
        $('.modal-container').has(jsel).css('display', 'flex').css('padding-top', vscroll + 'px');

        $('.modal-container').find('.js-modal-content-main').show();
        $('.modal-container').find('.js-modal-result-ok,.js-modal-result-error').hide();

        jsel.addClass('modal-opened').css('display','block');

        if ($(window).width() <= 480) {
            $('body')
                .css('height', '100vh')
                .css('position', 'relative')
                .css('overflow', 'hidden');
        }
    };

    modalClose = function(jsel)
    {
        jsel.removeClass('modal-opened').css('display','none');
        $('.modal-container').has(jsel).css('display', 'none').css('padding-top', 0);
        $('.modal-bg').remove();
        $('body')
            .css('height', 'auto')
            .css('overflow', 'auto');
    };

    $('.js-feedback-open').click(function (e) {
        e.preventDefault();
        $('#feedback-modal .js-heading').html($(this).data('title'));
        $('#feedback-modal form').prop('action', $(this).data('action'));
        $('#feedback-modal form').find('input[name="page"]').val($(this).data('page'));
        $('#feedback-modal form').find('input[name="title"]').val($(this).data('title'));
        modalOpen($('#feedback-modal'));
        return false;
    });

    if($('.js-open-franchisee-form-on-start').length){
        modalOpen($('#franchisee-modal'));
    }

    $('.js-franchise-open').click(function (e) {
        e.preventDefault();
        modalOpen($('#franchisee-modal'));
        return false;
    });

    $('.modal__close').click(function () {
        modalClose($('.modal').has(this));
    });


    $('.faq-list__faq-question').click(function () {
        var parent = $('.faq-list__faq').has(this);
        if (parent.hasClass('faq-list__faq_opened')) {
            parent.removeClass('faq-list__faq_opened');
        } else {
            parent.addClass('faq-list__faq_opened');
        }
    });

    if ($('#companyChart').length) {
        var ctx = $('#companyChart');
        Chart.defaults.global.defaultFontFamily = 'Roboto, sans-serif';
        Chart.defaults.global.defaultFontSize = 16;
        Chart.defaults.global.defaultFontColor = '#222222';
        Chart.defaults.global.defaultFontStyle = 600;
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2010', '2012', '2014', '2016', '2018', '2020'],
                datasets: [{
                    label: 'Number of franchisees',
                    backgroundColor: 'rgba(112,213,134, 0.2)',
                    //borderCapStyle: 'round',
                    borderColor: 'rgba(26,178,72, 1)',
                    pointBorderColor: 'rgba(26,178,72, 1)',
                    borderWidth: 2.5,
                    pointBorderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: 'rgba(255,255,255, 1)',
                    data: [
                        {
                            x: 2010,
                            y: 19
                        },
                        {
                            x: 2012,
                            y: 80
                        },
                        {
                            x: 2014,
                            y: 200
                        },
                        {
                            x: 2016,
                            y: 640
                        },
                        {
                            x: 2018,
                            y: 1350
                        },
                        {
                            x: 2020,
                            y: 3000
                        },
                    ],
                }]
            },
            options: {
                legend: {
                    display: false,
                },
                plugins: {
                    datalabels: {
                        align: 'top',
                        offset: 8,
                        formatter: function(value, context) {
                            return value.y;
                        },
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 25,
                        top: 50,
                        bottom: 0
                    }
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontStyle: 300,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontStyle: 300,
                            },
                        },
                    ],
                }
            }
        });
    }

    $("a.js-scroll").click(function(e) {
        var hash = $(this).attr("href").substr(2);
        if ($('a[name="'+hash+'"]').length > 0) {
            $("html:not(:animated),body:not(:animated)").animate({
                scrollTop: ($('a[name="'+hash+'"]').offset().top-91)
            }, 800);
            window.location.hash = '#' + hash;
            if ($(this).hasClass('scrollMini')) {
                $('.mobileMenu').hide();
                $('.openMenu').show();
            }
        } else {
            return true;
        }
        return false;
    });

    if (window.location.hash) {
        setTimeout(function() {
            window.scrollTo(0, 0);

            var hash = decodeURIComponent(window.location.hash.substr(1));
            if ($('a[name="'+hash+'"]').length > 0) {
                $("html:not(:animated),body:not(:animated)").animate({
                    scrollTop: ($('a[name="'+hash+'"]').offset().top-91)
                }, 800);
            }
        }, 1);
    }

    $('.js-partner-show-more').click(function (){
        $('.partner__item_hidden').fadeIn({
            duration: 700,
        });
        $(this).parent().hide();
        return false;
    });

    function formInputAddError(input, message)
    {
        $('.form-field').has(input).addClass('form-field_error');
        $('<div class="form-field__error-message fr-calculator__error-message">'+message+'</div>').insertAfter(input);
    }

});


(function(window, $, _){
    'use strict';

    window.FrCalculator = function($wrapper, modelSettings, countriesSettings, formSubmitUrl) {
        const self = this;
        this.$wrapper = $wrapper;
        this.model = new window.FrCalculatorModel(modelSettings);
        this.countriesSettings = countriesSettings;
        this.formSubmitUrl = formSubmitUrl;
        this.isSettingsValid = this.validateSettings();
        this.fixedCosts = new window.FrCalculatorFixedCosts(
            $wrapper.find('.js-fr-calculator__fixed-costs')
        );
        this.init();

        this.$wrapper.find(".js-fr-calculator__calculate-button").on(
            'click',
            this.handleCalculateClick.bind(this)
        );
        this.$wrapper.find(".js-fr-calculator__country-form").on(
            'submit',
            this.handleCalculateClick.bind(this)
        );

        this.$wrapper.find(".js-fr-calculator__step2-button").on(
            'click',
            this.handleStep2ButtonClick.bind(this)
        );

        this.$wrapper.find(".js-fr-calculator__change-country").on(
            'click',
            this.handleChangeCountry.bind(this)
        );

        this.debouncedModelChangeHandler = _.debounce(this.handleModelParameterChange.bind(this), 500);

    }

    $.extend(window.FrCalculator.prototype, {
        validateSettings: function() {
            var isValid = true;
            const consoleError = {}
            const modelSettingsErrors = this.model.validateModelSettings();
            if (modelSettingsErrors.length > 0) {
                consoleError['modelSettingsErrors'] = modelSettingsErrors;
                isValid = false;
            }

            const countrySettingsErrors = this.model.validateCountrySettings(this.countriesSettings);
            if (countrySettingsErrors.length > 0) {
                consoleError['countrySettingsErrors'] = countrySettingsErrors;
                isValid = false;
            }

            if (!isValid) {
                this.formInputAddError(this.targetCountryInput(), 'Server Error. Countries settings are invalid');
                console.error(JSON.stringify(consoleError, null, 2)); //pretty print json
                return false;
            }
            return true;
        },

        init: function(){
            if (!this.isSettingsValid) {
                return;
            }

            this.model.init();
            this.initCountrySelector();
        },

        initCountrySelector: function(){
            const self = this;
            const suggestions = [];

            for (const key in this.countriesSettings) {
                if (this.countriesSettings.hasOwnProperty(key)) {
                    suggestions.push({
                        value: this.countriesSettings[key].name,
                        data: key,
                    })
                }
            }

            this.targetCountryInput()
                .autocomplete({
                    lookup: suggestions,
                    noCache: true,
                    onSelect: function (suggestion) {
                        self.handleCountrySelected(suggestion.data);
                        self.formInputClearError($(this));
                    },
                })
        },

        handleCountrySelected: function(countryKey) {
            this.model.setCountryData(this.countriesSettings[countryKey]);
        },

        handleChangeCountry: function() {
            location.reload();
        },

        handleCalculateClick: function(){
            const self = this;

            if (!this.isSettingsValid) {
                return false;
            }

            this.formInputClearError(this.targetCountryInput());

            if (this.model.countryData === null) {
                this.formInputAddError(this.targetCountryInput(), 'You should select the country from list')
                return false;
            }

            this.setLoadingState(true);
            setTimeout(function () {
                self.initUiFromModel();
                $('.fr-calculator__screen_step1').hide();
                $('.fr-calculator__screen_step2').show();

                $('.fr-calculator__screen_step2 .fr-calculator__costs-opening-button-container').show();
                $('.fr-calculator__screen_step2 .fr-calculator__costs-opening-button-container').next().show();

                self.setLoadingState(false);
            }, 1000);
            return false;
        },

        handleStep2ButtonClick: function (){
            var self = this;
            this.setLoadingState(true);
            setTimeout(function () {
                self.$wrapper.find('.fr-calculator__costs-opening-button-container')
                    .hide()
                    .next().hide();

                self.$wrapper.find('.fr-calculator__screen_step3').show();

                self.setLoadingState(false);
            }, 1000);
            return false;
        },


        initUiFromModel: function() {
            const self = this;
            this.$wrapper.find('.js-fr-calculator__country-name').html(this.model.getCountryName());
            this.$wrapper.find('.js-fr-calculator__lump-sum').html(this.formatAmount(this.model.getLumpSum()));

            const openingCostSlider = new window.FrCalculatorSlider2(
                $(".js-fr-calculator__opening-cost-slider"),
                this.model.getOpeningCostSliderSettings(),
                this.formatAmount.bind(this),
                function(newValue) {
                    self.model.openingCost = Number.parseInt(newValue);
                    self.debouncedModelChangeHandler();
                }
            );

            const salarySlider = new window.FrCalculatorSlider2(
                $(".js-fr-calculator__salary-slider"),
                this.model.getOpeningSalarySliderSettings(),
                this.formatAmount.bind(this),
                function(newValue) {
                    self.model.salary = Number.parseInt(newValue);
                    self.debouncedModelChangeHandler();
                }
            );

            const otherStaffCostsSlider = new window.FrCalculatorSlider2(
                $(".js-fr-calculator__other-costs-slider"),
                this.model.getOtherStaffCostSliderSettings(),
                this.formatAmount.bind(this),
                function(newValue) {
                    self.model.otherStaffCosts = Number.parseInt(newValue);
                    self.debouncedModelChangeHandler();
                }
            );

            this.fixedCosts.init(
                this.model.getCurrency(),
                this.formatAmount.bind(this),
                this.model.getLumpSum(),
                this.model.getInitialFixedCosts(),
                self.handleModelParameterChange.bind(self) //not debounced version. Debounce is not needed here
            );

            this.numberOfPackagesBlock = new FrCalculatorNumberOfPackages(
                $(".js-fr-calculator__number-of-packages"),
                this.model.getInitialPackagesNumbers(),
                function() {
                    self.debouncedModelChangeHandler()
                }
            )

            this.questionForm = new FrCalculatorQuestionForm(
                $('.js-fr-calculator__question-form'),
                this.formSubmitUrl,
                this.model,
            );

        },

        handleModelParameterChange: function() {
            this.model.fixedCosts = this.fixedCosts.getFixedCosts();
            this.model.numberOfPackagesData = this.numberOfPackagesBlock.getData();

            this.model.calculateResults();
            const calculationResults = this.model.getCalculationResults();
            this.updateCalculationResults(
                calculationResults
            );
        },

        formatCalculationResult: function(key, value) {
            if (['returnOnSales'].includes(key)) {
                return this.formatPercent(value);
            } else if (key === 'paybackPeriod') {
                if (value === '-') {
                    return value;
                }
                return value + ' mo.';
            } else if (key === 'numberOfParcels') {
                return this.formatAmount(value, false) + ' units';
            }
            return this.formatAmount(value);
        },

        updateCalculationResults: function(calculationResults) {
            const self = this;
            this.$wrapper.find('.js-fr-calculator__result').each(function() {
                const resultBlock = $(this);

                const key = resultBlock.attr('data-key');
                const value = calculationResults[key];
                const formattedValue = self.formatCalculationResult(key, value);

                if (!isNaN(value) && value < 0) {
                    resultBlock.addClass('fr-calculator__prop-value_negative')
                } else {
                    resultBlock.removeClass('fr-calculator__prop-value_negative')
                }

                resultBlock.html(formattedValue);
            })
        },

        formInputAddError: function(input, message) {
            $('.form-field').has(input).addClass('form-field_error');
            $('<div class="form-field__error-message fr-calculator__error-message">'+message+'</div>').insertAfter(input);
        },

        formInputClearError: function(input) {
            const $formField = $('.form-field').has(input);
            $formField.removeClass('form-field_error');
            $formField.find('.fr-calculator__error-message').remove();
        },

        setLoadingState: function(isLoading = true) {
            const loadingClass = 'fr-calculator__content_loading';
            if (isLoading) {
                this.targetCalculatorContent().addClass(loadingClass);
            } else {
                this.targetCalculatorContent().removeClass(loadingClass);
            }
        },

        formatAmount: function(num, withCurrency = true){
            num = parseInt(num);
            const signPrefix = num <0 ? '-' : '';
            num = Math.abs(num);
            let result = signPrefix;
            if (withCurrency) {
                result += this.model.getCurrency();
            }
            // const amountWithThousandSeparator = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
            const amountWithThousandSeparator = num.toLocaleString('ru');
            result += amountWithThousandSeparator;
            return result;
        },

        formatPercent: function(value) {
            const scaledValue = Math.round(value * 100);
            return scaledValue.toString() + '%';
        },

        targetCalculatorContent: function() {
            return this.$wrapper.find('.js-fr-calculator__content');
        },

        targetCountryInput: function() {
            return this.$wrapper.find('.js-fr-calculator__country');
        }
    })


})(window, jQuery, _);


(function(window, $){
    'use strict';

    window.FrCalculatorFixedCosts = function($wrapper) {
        this.$wrapper = $wrapper;
    }

    $.extend(window.FrCalculatorFixedCosts.prototype, {
        init: function(currencyPrefix, numberFormatter, costBase, initialFixedCosts, changeHandler) {
            this.currencyPrefix = currencyPrefix;
            this.numberFormatter = numberFormatter;
            this.costBase = costBase;
            this.initialFixedCosts = initialFixedCosts;
            this.changeHandler = changeHandler;

            this.createInitialFixedCosts(initialFixedCosts);
            this.initOriginalJqueryJs();
        },

        createInitialFixedCosts: function(fixedCosts) {
            const self = this;
            fixedCosts.forEach(function(item, index) {
                const amount = self.costBase * item.baseMultiplier;
                self.addNewFixedCost(
                    item.title,
                    amount
                );
            })

        },

        addNewFixedCost: function(costTitle, costAmount) {
            const formattedAmount = this.numberFormatter(costAmount);
            $('<div class="fr-calculator__fixed-cost">\n' +
                '                                <div class="fr-calculator__fixed-cost-close"></div>\n' +
                '                                <div class="fr-calculator__fixed-cost-state fr-calculator__fixed-cost-state_active"></div>\n' +
                '                                <div>\n' +
                '                                    <div class="fr-calculator__fixed-cost-title">'+costTitle+'</div>\n' +
                '                                    <div class="fr-calculator__fixed-cost-value">\n' +
                '                                        <div class="fr-calculator__fixed-cost-value-amount" data-amount="'+costAmount+'">'+formattedAmount+'</div>\n' +
                '                                        <input type="text" class="fr-calculator__fixed-cost-value-input" name="fixed-cost" style="display: none;" />\n' +
                '                                        <div class="fr-calculator__prop-edit"></div>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </div>').appendTo('.fr-calculator__fixed-cost-container');
        },

        informChangeHandler: function(){
            this.changeHandler();
        },

        /* returns array
            [
                {
                    title: 'Rent (starting from 30 sq. m)',
                    amount: 1100,
                },
                {
                    title: 'Advertising, marketing',
                    amount: 500,
                },
            ]
         */
        getFixedCosts: function() {
            const self = this;
            const result = [];
            $('.fr-calculator__fixed-cost').each(function() {
                const $fixedCostBlock = $(this);

                const $blockState = $fixedCostBlock.find('.fr-calculator__fixed-cost-state');
                if (!$blockState.hasClass('fr-calculator__fixed-cost-state_active')) {
                    return;
                }

                const title = $fixedCostBlock.find('.fr-calculator__fixed-cost-title').html();
                const amount = $fixedCostBlock.find('.fr-calculator__fixed-cost-value-amount').attr('data-amount');
                result.push({
                    title: title,
                    amount: amount,
                })
            })

            return result;
        },

        initOriginalJqueryJs: function() {
            const self = this;
            $(document).on('click', '.fr-calculator__fixed-cost-state', function () {
                if ($(this).hasClass('fr-calculator__fixed-cost-state_active')) {
                    $(this).removeClass('fr-calculator__fixed-cost-state_active');
                } else {
                    $(this).addClass('fr-calculator__fixed-cost-state_active');
                }
                self.informChangeHandler();
            });

            $(document).on('click', '.fr-calculator__fixed-cost-close', function () {
                $('.fr-calculator__fixed-cost').has(this).fadeOut();
                var input = $('.fr-calculator__fixed-cost').has(this).find('.fr-calculator__fixed-cost-value-input');
                var cleave = input.data('cleave');
                if (cleave !== undefined) {
                    cleave.destroy();
                }

                // make deleted block inactive to remove it from results
                $('.fr-calculator__fixed-cost').has(this).find('.fr-calculator__fixed-cost-state')
                    .removeClass('fr-calculator__fixed-cost-state_active');

                self.informChangeHandler();
            });

            var inputNewCostFormCleave = new window.Cleave('.fr-calculator__fixed-cost-form input[name=cost-amount]', {
                numeral: true,
                numeralPositiveOnly: true,
                numeralThousandsGroupStyle: 'thousand',
                delimiter: ' ',
                prefix: self.currencyPrefix,
                rawValueTrimPrefix: true,
            });

            $('.fr-calculator__fixed-cost-add').click(function (){
                $('.fr-calculator__fixed-cost-form').slideDown();
                $('.fr-calculator__fixed-cost-form input[name=cost-title]').focus();
            });

            $('.fr-calculator__fixed-cost-form-close').click(function (){
                var form = $('.fr-calculator__fixed-cost-form').has(this);
                form.slideUp({
                    done: function () {
                        $('.fr-calculator__fixed-cost-form .form-field_error').removeClass('form-field_error');
                        $('.fr-calculator__fixed-cost-form .fr-calculator__error-message').remove();
                        form.find('input[name=cost-title]').val('').focus();
                        // form.find('input[name=cost-amount]').val('$');
                        inputNewCostFormCleave.setRawValue('');
                    }
                });
            });

            $('.fr-calculator__fixed-cost-form input[name=cost-title]').keypress(function (e){
                if (e.which === 13) {
                    $('.fr-calculator__fixed-cost-form input[name=cost-amount]').focus();
                }
            });

            $('.fr-calculator__fixed-cost-form input[name=cost-amount]').keypress(function (e){
                if (e.which === 13) {
                    $('.fr-calculator__fixed-cost-form .primary-button').click();
                }
            });


            $('.fr-calculator__fixed-cost-form .primary-button').click(function (){
                $('.fr-calculator__fixed-cost-form .form-field_error').removeClass('form-field_error');
                $('.fr-calculator__fixed-cost-form .fr-calculator__error-message').remove();
                var form = $('.fr-calculator__fixed-cost-form').has(this);
                var hasError = false;
                ['cost-title', 'cost-amount'].forEach(function (field, key) {
                    var formInput = form.find('input[name=' + field + ']');
                    var val = formInput.val().trim();
                    if (val.length === 0) {
                        self.formInputAddError(formInput, 'Value is required');
                        hasError = true;
                    } else {
                        if (val.length > 55) {
                            self.formInputAddError(formInput, 'Value length is exceeded');
                            hasError = true;
                        } else {
                            if (field === 'cost-amount') {
                                // var cleanVal = val.replace(/[$ ]/g, '');
                                var cleanVal = inputNewCostFormCleave.getRawValue();
                                if (!$.isNumeric(cleanVal)) {
                                    self.formInputAddError(formInput, 'The value should be numeric');
                                    hasError = true;
                                } else {
                                    val = parseInt(cleanVal);
                                    if (val <= 0 || val > 10000000) {
                                        self.formInputAddError(formInput, 'The value should be greather than 0 and less then 10000000');
                                        hasError = true;
                                    }
                                }
                            }
                        }
                    }
                });

                if (!hasError) {
                    var costTitle = form.find('input[name=cost-title]').val();
                    // var costAmount = form.find('input[name=cost-amount]').val();
                    var costAmount = inputNewCostFormCleave.getRawValue();

                    self.addNewFixedCost(costTitle, costAmount);

                    form.find('input[name=cost-title]').val('').focus();
                    inputNewCostFormCleave.setRawValue('');
                    // form.find('input[name=cost-amount]').val('$');

                    self.informChangeHandler();
                }
            });

            $(document).on('click', '.fr-calculator__fixed-cost .fr-calculator__prop-edit', function (){
                var amount = $('.fr-calculator__fixed-cost').has(this).find('.fr-calculator__fixed-cost-value-amount');
                var initialAmountRawVal = amount.attr('data-amount');
                var input = $('.fr-calculator__fixed-cost').has(this).find('.fr-calculator__fixed-cost-value-input');
                var edit = $('.fr-calculator__fixed-cost').has(this).find('.fr-calculator__prop-edit');

                edit.hide();
                amount.hide();

                var cleave = new window.Cleave(input, {
                    numeral: true,
                    numeralPositiveOnly: true,
                    numeralThousandsGroupStyle: 'thousand',
                    delimiter: ' ',
                    prefix: self.currencyPrefix,
                    rawValueTrimPrefix: true,
                });

                cleave.setRawValue(initialAmountRawVal);

                input
                    .show()
                    .data('cleave', cleave)
                ;

                input.focus();
            });

            $(document).on('blur', '.fr-calculator__fixed-cost .fr-calculator__fixed-cost-value-input', function (){
                self.onEditedCost(this);
            });

            $(document).on('keypress', '.fr-calculator__fixed-cost .fr-calculator__fixed-cost-value-input', function (e){
                if (e.which === 13) {
                    self.onEditedCost(this);
                }
            });


        },

        onEditedCost: function(onInput) {
            var amount = $('.fr-calculator__fixed-cost').has(onInput).find('.fr-calculator__fixed-cost-value-amount');
            var initialAmountRawVal = amount.attr('data-amount');
            var input = $('.fr-calculator__fixed-cost').has(onInput).find('.fr-calculator__fixed-cost-value-input');
            var edit = $('.fr-calculator__fixed-cost').has(onInput).find('.fr-calculator__prop-edit');

            var cleave = input.data('cleave');
            var rawVal = cleave.getRawValue();

            if (rawVal === '' || rawVal === '0') {
                rawVal = initialAmountRawVal;
                cleave.setRawValue(rawVal);
            }

            var val = input.val();

            amount.attr('data-amount', rawVal).html(val).show();
            input.hide();
            edit.show();

            input.data('cleave').destroy();

            this.informChangeHandler();
        },

        formInputAddError: function(input, message)
        {
            $('.form-field').has(input).addClass('form-field_error');
            $('<div class="form-field__error-message fr-calculator__error-message">'+message+'</div>').insertAfter(input);
        }


    })


})(window, jQuery);


(function(window, $){
    'use strict';

    const defaultCountryData = {
        name: 'United States of America',
        currency: '$',
        lumpSum: 6000,
        averagePackageCost: {
            b2c: 30,
            b2b: 40,
            c2c: 30,
        },
        variableCostsPercent: 0.455,
        vat: 0.2,
        incomeTax: 0.265,
    };

    window.FrCalculatorModel = function(settings) {
        this.settings = settings;
        this.countryData = null;
        this.openingCost = 0;
        this.salary = 0;
        this.otherStaffCosts = 0;
        this.fixedCosts = [];
    }

    $.extend(window.FrCalculatorModel.prototype, {

        init: function(){
            this.numberOfPackagesData = this.settings.numberOfPackagesData;
        },

        setCountryData: function(countryData) {
            this.countryData = $.extend(defaultCountryData, countryData);
        },

        getCountryName: function(){
            return this.countryData.name;
        },

        getCurrency: function() {
            return this.countryData.currency;
        },

        getLumpSum: function() {
            return Number.parseInt(this.countryData.lumpSum);
        },

        getOpeningCostSliderSettings: function() {
            return this.getStepSettings(
                this.getLumpSum() * this.settings.sliderCostMultipliers.openingCost,
                this.getLumpSum() * this.settings.sliderCostInitialMultiplier.openingCost
            )
        },

        getOpeningSalarySliderSettings: function() {
            return this.getStepSettings(
                this.getLumpSum() * this.settings.sliderCostMultipliers.salary,
                this.getLumpSum() * this.settings.sliderCostInitialMultiplier.salary
            )
        },

        getOtherStaffCostSliderSettings: function() {
            return this.getStepSettings(
                this.getLumpSum() * this.settings.sliderCostMultipliers.otherStaffCosts,
                this.getLumpSum() * this.settings.sliderCostInitialMultiplier.otherStaffCosts
            )
        },

        getStepSettings: function(upperLimit, initialValue, lowerLimitDivider = 20) {
            const upper = upperLimit;
            const lower = this.floorToOneDigit(upper / lowerLimitDivider);
            const step = lower / 2;

            let value;
            for (value=lower; value<=upper; value+=step) {
                if (value >= initialValue) {
                    break;
                }
            }

            return {
                min: lower,
                max: upper,
                step: step,
                initialValue: value,
            }
        },

        floorToOneDigit: function(num) {
            const numberOfZeroes = Math.floor(Math.log10(num));
            const multiplier = Math.pow(10, numberOfZeroes);
            return Math.floor(num/multiplier) * multiplier;
        },

        getInitialFixedCosts: function() {
            return this.settings.initialFixedCosts;
        },

        getInitialPackagesNumbers: function() {
            return this.settings.initialPackagesNumbers;
        },

        calculateResults: function() {
            const vars = {};
            const vatPercent = this.countryData.vat;
            const incomeTaxPercent = this.countryData.incomeTax;

            vars.openingCost = this.openingCost;
            vars.salary = this.salary;
            vars.otherStaffCosts = this.otherStaffCosts
            vars.grossProceeds = this.calculateGrossProceeds();
            vars.grossProceedsExclVat = Math.round(
                vars.grossProceeds/(1 + vatPercent)
            );
            vars.variableCosts = vars.grossProceeds * this.countryData.variableCostsPercent;
            vars.variableCostsExclVat = Math.round(
                vars.variableCosts/(1 + vatPercent)
            );
            vars.staffCosts = vars.salary + vars.otherStaffCosts;
            vars.otherFixedCosts = this.calculateOtherFixedCosts();
            vars.otherFixedCostsExclVat = Math.round(
                vars.otherFixedCosts/(1 + vatPercent)
            );
            vars.fixedCosts = vars.staffCosts + vars.otherFixedCosts;
            vars.totalCostsPerMonth = vars.variableCosts + vars.fixedCosts;

            vars.vatOutgoing = vars.grossProceeds * vatPercent;
            vars.vatIncoming = (vars.totalCostsPerMonth - vars.staffCosts) * vatPercent;
            vars.vatToPay = vars.vatOutgoing - vars.vatIncoming;

            vars.EBITDAPerMonth = Math.round(
                vars.grossProceedsExclVat -
                vars.variableCostsExclVat - vars.staffCosts - vars.otherFixedCostsExclVat
            );
            vars.incomeTax = Math.max(0, vars.EBITDAPerMonth * incomeTaxPercent);

            vars.afterTaxProfitsPerMonth = Math.round(
                vars.EBITDAPerMonth -
                vars.incomeTax - vars.vatToPay
            );

            vars.afterTaxProfitsPerYear = vars.afterTaxProfitsPerMonth * 12;

            if (vars.grossProceeds > 0) {
                vars.returnOnSales = (vars.grossProceeds - vars.totalCostsPerMonth) / vars.grossProceeds;
            } else {
                vars.returnOnSales = 0;
            }

            vars.returnOnSales = Math.round(vars.returnOnSales * 100) / 100;

            if (vars.afterTaxProfitsPerMonth > 0) {
                vars.paybackPeriod = Math.ceil(vars.openingCost / vars.afterTaxProfitsPerMonth);
            } else {
                vars.paybackPeriod = '-'
            }

            vars.numberOfParcels = this.calculateNumberOfParcels();

            this.calculationResults = vars;
            return true;
        },

        getCalculationResults: function() {
            return this.calculationResults;
        },

        getCalculationInputData: function() {
            return {
                openingCost: this.openingCost,
                salary: this.salary,
                otherStaffCosts: this.otherStaffCosts,
                fixedCosts: this.fixedCosts,
                numberOfParcels: this.numberOfPackagesData,
            }

        },

        calculateGrossProceeds: function() {
            let result = 0;
            for (const key in this.numberOfPackagesData) {
                if (this.numberOfPackagesData.hasOwnProperty(key)) {
                    result += this.numberOfPackagesData[key] * this.countryData.averagePackageCost[key];
                }
            }
            return result;
        },

        calculateNumberOfParcels: function() {
            let result = 0;
            for (const key in this.numberOfPackagesData) {
                if (this.numberOfPackagesData.hasOwnProperty(key)) {
                    result += this.numberOfPackagesData[key];
                }
            }
            return result;
        },

        calculateOtherFixedCosts: function() {
            let result = 0;
            this.fixedCosts.forEach(function(item, index) {
                result += Number.parseInt(item.amount);
            })
            return result;
        },

        validateModelSettings: function() {
            const self = this;
            const modelSettingsConstraints = {
                sliderCostMultipliers: {presence: {allowEmpty: false}},
                "sliderCostMultipliers.openingCost": {presence: {allowEmpty: false}, numericality: true},
                "sliderCostMultipliers.salary": {presence: {allowEmpty: false}, numericality: true},
                "sliderCostMultipliers.otherStaffCosts": {presence: {allowEmpty: false}, numericality: true},

                sliderCostInitialMultiplier: {presence: {allowEmpty: false}},
                "sliderCostInitialMultiplier.openingCost": {presence: {allowEmpty: false}, numericality: true},
                "sliderCostInitialMultiplier.salary": {presence: {allowEmpty: false}, numericality: true},
                "sliderCostInitialMultiplier.otherStaffCosts": {presence: {allowEmpty: false}, numericality: true},

                initialPackagesNumbers: {presence: {allowEmpty: false}},
                "initialPackagesNumbers.b2c": {presence: {allowEmpty: false}, numericality: true},
                "initialPackagesNumbers.b2b": {presence: {allowEmpty: false}, numericality: true},
                "initialPackagesNumbers.c2c": {presence: {allowEmpty: false}, numericality: true},

                initialFixedCosts: {presence: {allowEmpty: false}, type: 'array'},
            }

            const fixedCostItemConstraints = {
                title: {presence: {allowEmpty: false}},
                baseMultiplier: {presence: {allowEmpty: false}, numericality: true},
            }

            const results = [];

            const validationResults = validate(this.settings, modelSettingsConstraints);
            this.addValidationResultToListIfError(validationResults, results, 'model')

            //try catch is needed if initialFixedCosts is absent
            try {
                this.settings.initialFixedCosts.forEach(function(item, index) {
                    const validationResults = validate(item, fixedCostItemConstraints);
                    self.addValidationResultToListIfError(validationResults, results, 'fixedCost' + index)
                })
            } catch (e)
            {}

            return results;
        },

        addValidationResultToListIfError: function(validationResult, errorsArray, errorKey) {
            if (typeof(validationResult) == "undefined") {
                return;
            }
            errorsArray.push({
                key: errorKey,
                validationErrors: validationResult,
            });
        },

        getCountryDataConstraints: function() {
            const countryDataConstraints = {
                name: {presence: {allowEmpty: false}},
                currency: {presence: {allowEmpty: false}},
                lumpSum: {presence: {allowEmpty: false}, numericality: true},
                averagePackageCost: {presence: {allowEmpty: false}},
                "averagePackageCost.b2c": {presence: {allowEmpty: false}, numericality: true},
                "averagePackageCost.b2b": {presence: {allowEmpty: false}, numericality: true},
                "averagePackageCost.c2c": {presence: {allowEmpty: false}, numericality: true},
                variableCostsPercent: {
                    presence: {allowEmpty: false},
                    numericality: {
                        greaterThan: 0,
                        lessThanOrEqualTo: 1,
                    }
                },
                vat: {
                    presence: {allowEmpty: false},
                    numericality: {
                        greaterThan: 0,
                        lessThanOrEqualTo: 1,
                    }
                },
                incomeTax: {
                    presence: {allowEmpty: false},
                    numericality: {
                        greaterThan: 0,
                        lessThanOrEqualTo: 1,
                    }
                },
            }

            return countryDataConstraints;
        },

        validateCountrySettings: function(countrySettings) {
            const constraints = this.getCountryDataConstraints();
            const results = [];
            for (const key in countrySettings) {
                if (countrySettings.hasOwnProperty(key)) {
                    const validationErrors = validate(countrySettings[key], constraints);
                    this.addValidationResultToListIfError(validationErrors, results, key)
                }
            }
            return results;
        },
    })


})(window, jQuery);


(function(window, $){
    'use strict';

    /* initialPackagesNumbers - associative array of the following structure
        {
            b2c: 200,
            b2b: 100,
            c2c: 42,
        }
     */
    window.FrCalculatorNumberOfPackages = function($wrapper, initialPackagesNumbers, changeHandler) {
        this.MAX_NUMBER_OF_PACKAGES = 10000;
        this.$wrapper = $wrapper;
        this.changeHandler = changeHandler;
        this.initPackagesNumbers(initialPackagesNumbers);
        this.initOriginalJqueryJs();
    }

    $.extend(window.FrCalculatorNumberOfPackages.prototype, {

        initPackagesNumbers: function(initialPackagesNumbers) {
            this.$wrapper.find('.fr-calculator__counter-amount').each(function() {
                const $numberBlock = $(this);

                const key = $numberBlock.attr('data-key');
                const value = initialPackagesNumbers[key];
                $numberBlock.html(value.toLocaleString('ru'));
            })
        },

        /* returns associative array
            {
                b2c: 200,
                b2b: 100,
                c2c: 42,
            }
         */
        getData: function() {
            const self = this;
            const result = {};
            this.$wrapper.find('.fr-calculator__counter-amount').each(function() {
                const $numberBlock = $(this);

                const key = $numberBlock.attr('data-key');
                const value = self.convertToNumberValue($numberBlock.html())
                result[key] = value;
            })

            return result;
        },

        convertToNumberValue: function(numberAsString) {
            const cleanedValue = numberAsString.replace(/[^0-9]/g, '');
            return parseInt(cleanedValue);
        },

        informChangeHandler: function(){
            this.changeHandler();
        },

        initOriginalJqueryJs: function() {
            const self = this;

            $('.fr-calculator__counter-control_type_minus').click(function (){
                var $amount = $('.fr-calculator__counter').has(this).find('.fr-calculator__counter-amount');

                var currentValue = $amount.html().replace(/[^0-9]/g, '');
                var currentValueNum = parseInt(currentValue);
                var previousValue = (currentValueNum-1).toString();
                var previousCapacity = previousValue.length;

                var stepCapacity = previousCapacity - 1;
                var step = Math.pow(10, stepCapacity) * 0.5;
                if (stepCapacity <= 0) {
                    step = currentValueNum;
                }

                var newValue = currentValueNum - step;
                if (newValue < 100) {
                    newValue = 0;
                }

                $amount.html(newValue.toLocaleString('ru'));

                self.informChangeHandler();
            });

            $('.fr-calculator__counter-control_type_plus').click(function (){
                var $amount = $('.fr-calculator__counter').has(this).find('.fr-calculator__counter-amount');

                var currentValue = $amount.html().replace(/[^0-9]/g, '');
                var currentValueNum = parseInt(currentValue);
                var currentValueCapacity = currentValue.length;

                var stepCapacity = currentValueCapacity - 1;
                var step = Math.pow(10, stepCapacity) * 0.5;

                var newValue = currentValueNum + step;
                if (newValue > self.MAX_NUMBER_OF_PACKAGES) {
                    newValue = self.MAX_NUMBER_OF_PACKAGES;
                }
                if (currentValueNum === 0) {
                    newValue = 100;
                }

                $amount.html(newValue.toLocaleString('ru'));

                self.informChangeHandler();
            });

        },

    })


})(window, jQuery);


(function(window, $){
    'use strict';

    window.FrCalculatorQuestionForm = function($wrapper, formSubmitUrl, model) {
        this.$wrapper = $wrapper;
        this.formSubmitUrl = formSubmitUrl;
        this.model = model;
        this.isValid = false;

        this.targetForm().on(
            'submit',
            this.handleSubmit.bind(this)
        )

    }

    $.extend(window.FrCalculatorQuestionForm.prototype, {

        handleSubmit: function() {
            const self = this;
            this.processForm();
            if (!this.isValid) {
                return false;
            }

            const data = {
                questionForm: this.values,
                countryData: this.model.countryData,
                inputData: this.model.getCalculationInputData(),
                calculationResults: this.model.getCalculationResults(),
            }

            $.ajax({
                type: 'POST',
                url: this.formSubmitUrl,
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
            }).done(function(data) {
                self.showConfirmation();
            }).fail(function(){
                self.showFormSendError();
            })

            return false;
        },

        processForm: function() {
            const self = this;

            this.clearAllErrors();

            const formData = new FormData(this.targetForm()[0]);
            this.values = {};

            for (var pair of formData.entries()) {
                this.values[pair[0]] = pair[1];
            }

            const validationResult = validate(this.values, this.getConstraints());

            if (typeof(validationResult) == "undefined") {
                this.isValid = true;
                return;
            }

            this.isValid = false;

            for (const key in validationResult) {
                if (validationResult.hasOwnProperty(key)) {
                    this.showErrorMessage(key, validationResult[key][0])
                }
            }

        },

        getConstraints: function() {
            return {
                name: {presence: {allowEmpty: false}},
                phone: {
                    presence: {allowEmpty: false},
                    format: {
                        pattern: '[ \\+\\-\\(\\)0-9]{10,}',
                        message: "^It is not a valid phone number"
                    }
                },
                email: {
                    presence: {allowEmpty: false},
                    email: true,
                },
                agree: {
                    presence: {
                        allowEmpty: false,
                        message: '^It is necessary to agree with privacy notice',
                    },
                },
            }

        },


        showErrorMessage: function(name, message) {
            const $input = this.$wrapper.find('input[name="' + name + '"]');
            this.formInputAddError($input, message);
        },

        formInputAddError: function(input, message) {
            const $message = $('<div class="form-field__error-message fr-calculator__error-message">'+message+'</div>');
            $('.form-field').has(input).addClass('form-field_error').append($message);
        },

        clearAllErrors: function() {
            this.$wrapper.find('.form-field').removeClass('form-field_error');
            this.$wrapper.find('.fr-calculator__error-message').remove();
        },

        showConfirmation: function() {
            this.showSendResult(
                this.$wrapper.find('.js-calculator-result-ok')
            )
        },

        showFormSendError: function() {
            this.showSendResult(
                this.$wrapper.find('.js-calculator-result-error')
            )
        },

        showSendResult: function($resultDiv) {
            var form = this.$wrapper.find('.form');
            var formHeight = form.height();
            form.addClass('fr-calculator__content_loading-nbr');
            setTimeout(function () {
                form.removeClass('fr-calculator__content_loading-nbr');
                form.hide();
                $resultDiv
                    .height(formHeight)
                    .show()
                ;
            }, 500);
            return false;
        },

        targetForm: function() {
            return this.$wrapper.find('form');
        }

    })


})(window, jQuery);


(function(window, $){
    'use strict';

    window.FrCalculatorSlider2 = function($wrapper, stepSettings, numberFormatter, changeHandler) {
        this.$wrapper = $wrapper;
        this.stepSettings = stepSettings;
        this.numberFormatter = numberFormatter;
        this.changeHandler = changeHandler;
        this.initSlider();
        this.initSliderGridClickHandler();
    }

    $.extend(window.FrCalculatorSlider2.prototype, {

        initSlider: function() {
            self = this;

            this.targetSliderInput().ionRangeSlider({
                grid: true,
                grid_snap: true,
                skin: "round",
                min: this.stepSettings.min,
                max: this.stepSettings.max,
                step: this.stepSettings.step,
                from: this.stepSettings.initialValue,

                hide_min_max: true,
                hide_from_to: true,
                prettify: function(value) {
                    return self.numberFormatter(value);
                },

                onChange: this.handleSliderChange.bind(this),
                onStart: this.handleSliderChange.bind(this),
            });
        },

        handleSliderChange: function(data) {
            this.updateSelectedValue(
                this.numberFormatter(data.from)
            );
            this.informChangeHandler(data.from);
        },

        initSliderGridClickHandler: function() {
            const self = this;
            this.$wrapper.on('click', '.irs-grid-text',function (){
                var classMatches = $(this)
                    .attr('class')
                    .match(/js-grid-text-([0-9]+)/g)
                ;
                if (classMatches.length === 0) {
                    return false;
                }

                self.updateSelectedValue($(this).html());

                var fromId = classMatches[0].replace('js-grid-text-', '');
                var value = self.stepSettings.min + fromId * self.stepSettings.step;

                self.targetSliderInput().data("ionRangeSlider").update({
                    from: value,
                });
                self.informChangeHandler(value);
            });
        },

        informChangeHandler: function(value) {
            this.changeHandler(value);
        },

        targetSliderInput: function(){
            return this.$wrapper.find('.range-slider');
        },

        updateSelectedValue: function(formattedValue){
            this.$wrapper.find('.fr-calculator__prop-slider-value').html(formattedValue);
        },

    })


})(window, jQuery);


(function(window, $) {

    window.menu = function() {
        $('.js-menu-open-button').click(function(){
            $('.js-menu-container').addClass('opened');
            $('.js-fade_background').addClass('opened');
            return false;
        });

        $('.js-menu-close-button').click(function(){
            closeMenu();
            return false;
        });

        $('.js-fade_background').click(function(){
            closeMenu();
            return false;
        });
    }

    function closeMenu() {
        $('.js-menu-container').removeClass('opened');
        $('.js-fade_background').removeClass('opened');
    }

})(window, jQuery);



(function(window, $) {

    var activatedClass = 'activated';

    window.activateSlider = function(sliderDiv, sliderOptions){
        if (sliderDiv.hasClass(activatedClass)) {
            return;
        }
        sliderDiv.addClass(activatedClass);

        // start slider after some timeout to stabilize div width after resize
        setTimeout(function () {
            sliderDiv.owlCarousel(sliderOptions);
        }, 100);
    }

    window.destroySlider = function(sliderDiv) {
        if (!sliderDiv.hasClass(activatedClass)) {
            return;
        }
        sliderDiv.removeClass(activatedClass);
        sliderDiv.trigger('destroy.owl.carousel');
        // sliderDiv.find('.owl-stage-outer').children(':eq(0)').unwrap();
    }

})(window, jQuery);



(function(window, $) {

    window.sliders = function() {

        var companyAdvantagesSlider = $('.js-steps-slider');
        var companyAdvantagesOptions  = {
            nav: true,
            dots: true,
            items: 1,
            loop: true,
            autoplay: false,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            margin: 0,
            autoHeight: true,
        };

        var storiesSlider = $('.js-stories-slider');

        $(window).resize(function() {
            processOnResize()
        });

        $(window).trigger('resize');

        function processOnResize() {
            if (isWider480()) {
                destroySlider(companyAdvantagesSlider);
                destroySlider(storiesSlider);
            } else {
                activateSlider(companyAdvantagesSlider, companyAdvantagesOptions);
                activateSlider(storiesSlider, companyAdvantagesOptions);
            }

        }

        function isWider480() {
            if(window.innerWidth >= 481) {
                return true;
            } else {
                return false;
            }
        }

    };

})(window, jQuery);


const formSubmitUrl = $('#franchcalc_form_submit_url').val();

const frCalculatorSettings = {
    sliderCostMultipliers: {
        openingCost: 2,
        salary: 1.2,
        otherStaffCosts: 0.6,
    },
    sliderCostInitialMultiplier: {
        openingCost: 1.5,
        salary: 0.7,
        otherStaffCosts: 0.35,
    },
    initialPackagesNumbers: {
        b2c: 500,
        b2b: 250,
        c2c: 150,
    },
    initialFixedCosts: [
        {
            title: 'Rent (starting from 30 sq. m)',
            baseMultiplier: 0.2,
        },
        {
            title: 'Advertising, marketing',
            baseMultiplier: 0.2,
        },
        {
            title: 'Equipment (computer, payment terminal etc.)',
            baseMultiplier: 0.25,
        },
        {
            title: 'Utility charges and other payments',
            baseMultiplier: 0.1,
        },
        {
            title: 'Other costs',
            baseMultiplier: 0.1,
        },
    ]
}

//Realisation of defer for inline javascript
window.addEventListener('DOMContentLoaded', function() {
    $('.js-fr-calculator').each(function() {
        const frCalculator = new FrCalculator($(this), frCalculatorSettings, frCalculatorCountries, formSubmitUrl);
    })
});
