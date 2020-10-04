import { ZexalQuestionComponent } from './zexal-question-component.js'

export class ZexalTextQuestionComponent extends ZexalQuestionComponent {

    _content() {
        var html = `<div class="question-text">`;
        if (this._value == undefined)
            html += `<input class="anser" name="` + this.name + `" type="text" placeholder="La tua risposta">`;
        else
            html += `<input class="anser" name="` + this.name + `" type="text" placeholder="La tua risposta" value="` + this._value + `">`;
        html += `<div class="underline"></div>
        </div>`;
        return html;
    }

    _addEvent() {
        var self = this;
        $('.anser', this).on("click focus", function() {
            $(this).parent().children('.underline').addClass('active');
        });
        $('.anser', this).on("focusout", function() {
            self._isValid();
        });
        self._extraEvent(self);
    }

    _extraEvent(self) {
        $('input', this).on("keydown keyup key", function(e) {
            var c = e.key == "Backspace" ||
                e.key == "Delete" ||
                e.key == "Tab";

            if (self.max == undefined) {

            } else if ($(this).val().length >= self.max) {
                if (this.selectionEnd - this.selectionStart == 0) {
                    if (!c) {
                        e.preventDefault();
                    }
                }
            }

        });
    }

    _isValid() {
        if (this.required) {

            if (this.reg == undefined) {
                this.reg = ".*";
            }
            var reg = new RegExp(this.reg);
            if (reg.test($('input', this).val()) && $('input', this).val() != "") {
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
customElements.define("zexal-text", ZexalTextQuestionComponent);