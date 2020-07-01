import { ZexalQuestionComponent } from './zexal-question-component.js'

export class ZexalNumberQuestionComponent extends ZexalQuestionComponent {

    _content() {
        return `<div class="question-number">
            <input class="anser" name="` + this.name + `" type="number" placeholder="La tua risposta">
            <div class="underline"></div>
        </div>`;
    }

    _addEvent() {
        var self = this;
        $('.anser', this).on("click focus", function() {
            $(this).parent().children('.underline').addClass('active');
        });
        $('.anser', this).on("focusout", function() {
            self._isValid();
        });
        $('input', this).on("keydown keyup key", function(e) {
            if (self.max != undefined && $(this).val().length >= self.max) {
                e.preventDefault();
            }
        });
    }

    _isValid() {
        if (this.required) {
            if (this.reg == undefined) {
                this.reg = ".*";
            }
            var reg = new RegExp(this.reg);
            if (reg.test($('input', this).val())) {
                if ($('.section-question', this).hasClass('error')) {
                    $('.section-question', this).removeClass('error');
                }
                if ($('.underline', this).hasClass('active')) {
                    $('.underline', this).removeClass('active');
                }
                return true;
            } else {
                if (!$('.section-question', this).hasClass('error')) {
                    $('.section-question', this).addClass('error');
                }
                if (!$('.underline', this).hasClass('active')) {
                    $('.underline', this).addClass('active');
                }
                return false;
            }
        }
        return true;
    }
}
customElements.define("zexal-number", ZexalNumberQuestionComponent);