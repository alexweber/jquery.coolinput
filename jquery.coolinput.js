/**
 * CoolInput Plugin
 *
 * @version 2.1 (19/08/2013)
 * @requires jQuery v1.2.6+
 * @author Alex Weber <alexweber.com.br>
 * @author Evan Winslow <ewinslow@cs.stanford.edu> (v1.5)
 * @see http://remysharp.com/2007/01/25/jquery-tutorial-text-box-hints/
 *
 * Dual licensed under the MIT and GPLv3 Licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 */
;(function($) {
  $.fn.coolinput = function(b) {
    /* Default options */
    var c = {
      useHtml5:true, // Use HTML5's native placeholders when possible.
      hint:null, // Input hint text.
      source:"title", // Source attribute for input hint text. Overrides "hint".
      removeSource:true, // Remove the source attribute after reading its value.
      blurClass:"blur", // Add a class to the input when it loses focus.
      extraClass:false, // Extra classes to ad to the input.
      clearOnSubmit:true, // Clear the input hint when the form is submitted (so an empty value is submitteed).
      clearOnFocus:true, // Clear the input hint when the input is focused.
      persistent:true // If set to false, the input hint will only be visible the first time an input is seen.
    };

    if (b && typeof b == "object") {
      $.extend(c,b);
    } else {
      c.hint = b;
    }

    // Check for HTML5 placeholder attribute support.
    c.html5 = c.useHtml5 && ('placeholder' in document.createElement('input'));

    return this.each(function() {
      var d = $(this),
      e = c.hint || d.attr(c.source),
      f = c.blurClass;
      
      if (c.removeSource && !c.hint) {
        d.removeAttr(c.source));
      }

      function g() {
        if (d.val() == "") {
          d.val(e).addClass(f);
        }
      }

      function h() {
        if (d.val() == e && d.hasClass(f)) {
          d.val("").removeClass(f);
        }
      }

      if (e) {
        // only use coolinput if we don't have HTML5 placeholder support
        if (!c.html5) {
          if (c.persistent) {
            d.blur(g);
          }

          if (c.clearOnFocus) {
            d.focus(h);
          }

          if (c.clearOnSubmit) {
            d.parents("form:first").submit(h);
          }

          if (c.extraClass) {
            d.addClass(c.extraClass);
          }

          g();
        } else {
          d.attr('placeholder', e);
        }
      }
    })
  }
})(jQuery);
