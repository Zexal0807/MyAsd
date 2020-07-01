import { ZexalQuestionComponent } from './zexal-question-component.js'

export class ZexalRadioQuestionComponent extends ZexalQuestionComponent {

    _content() {
        var self = this;
        var html = `<div class="question-radio">`;
        Object.entries(this.option).forEach(function(el) {
            html += `<div class="radio-option">
                <div class="outer-radio">
                    <div class="inner-radio"></div>
                </div>
                <div class="radio-desc">` + el[1] + `</div>
                <input class="anser" type="radio" name="` + self.name + `" value="` + el[0] + `">
            </div>`;
        });
        html += `</div>`;
        return html;
    }

    _addEvent() {
        $('.radio-option > *', this).on("click", function() {
            $('input', $(this).parents('.question-radio')).prop('checked', false);
            $('.inner-radio', $(this).parents('.question-radio')).removeClass("selected");
            $('input', $(this).parents('.radio-option')).prop('checked', true);
            $('.inner-radio', $(this).parents('.radio-option')).addClass("selected");
        });
    }

    _isValid() {
        if (this.required) {
            if ($('input:checked', this).length != 0) {
                if ($('.section-question', this).hasClass('error')) {
                    $('.section-question', this).removeClass('error');
                }
                return true;
            } else {
                if (!$('.section-question', this).hasClass('error')) {
                    $('.section-question', this).addClass('error');
                }
                return false;
            }
        }
        return true;
    }
}
customElements.define("zexal-radio", ZexalRadioQuestionComponent);