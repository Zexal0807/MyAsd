import { ZexalQuestionComponent } from './zexal-question-component.js'

export class ZexalCheckQuestionComponent extends ZexalQuestionComponent {

    _content() {
        var self = this;
        var html = `<div class="question-check">`;
        Object.entries(this.option).forEach(function(el) {
            html += `<div class="check-option">
                <div class="outer-check">
                    <div class="inner-check"></div>
                </div>
                <div class="check-desc">` + el[1] + `</div>
                <input class="anser" type="check" name="` + self.name + `" value="` + el[0] + `">
            </div>`;
        });
        html += `</div>`;
        return html;
    }

    _addEvent() {
        $('.check-option > *', this).on("click", function() {
            if ($('input', $(this).parents('.check-option')).prop('checked')) {
                $('input', $(this).parents('.check-option')).prop('checked', false);
                $('.inner-check', $(this).parents('.check-option')).removeClass("selected");
            } else {
                $('input', $(this).parents('.check-option')).prop('checked', true);
                $('.inner-check', $(this).parents('.check-option')).addClass("selected");
            }
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
customElements.define("zexal-check", ZexalCheckQuestionComponent);