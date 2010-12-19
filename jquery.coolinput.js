/**
 * CoolInput Plugin
 * 
 * @version 1.5 (10/09/2009)
 * @requires jQuery v1.2.6+
 * @author Alex Weber <alexweber.com.br>
 * @author Evan Winslow <ewinslow@cs.stanford.edu> (v1.5)
 * @copyright Copyright (c) 2008-2010, Alex Weber
 * @see http://remysharp.com/2007/01/25/jquery-tutorial-text-box-hints/
 * 
 * Distributed under the terms of the GNU General Public License
 * http://www.gnu.org/licenses/gpl-3.0.html
 */

/**
 * Ideally whenever the hint is being displayed, blurClass is present and whenever
 * the hint is not being displayed, blurClass is not present. This is not actually
 * the case, however, since javascript can set the value of the input and the 
 * blurClass will not be removed in this case.
 * 
 * There is no onchange event fired when values are altered with javascript.
 * Because of this, it is impossible to tell when javascript has changed the value.
 * To deal with this, we will check whether the value is equal to the hint, and whether
 * the blurClass is present when we are deciding whether to clear the value.  This takes
 * care of every case except when javascript is used to set the value equal to the hint.
 * 
 * In this case, we will simply have to ask the developer using CoolInput to manually
 * remove blurClass if he is going to change values with javascript.  However, we will
 * still retain the check for hint-equivalence in an attempt to correctly handle the
 * majority of cases by default.
 * 
 * Suggested test cases for 1.5:
 * Testing Functional Correctness (does the user experience the right functionality)
 * - Submit without typing in any value, hints should clear.
 * - Submit without typing in any value, then type in values, values should stay.
 * - Set the value with javascript, then submit, value should stay.
 * - Type in a value which is equal to the hint and submit, the value should stay.
 * - Set the value not equal to the hint with javascript and submit, the value should stay.
 * 
 * Testing Semantic Correctness (does the state of the input remain consistent)
 * - Blur the input, blurClass should be present.
 * - Focus the input, blurClass should not be present.
 * - Submit without typing in any value, blurClass should not be present.
 * - Type in a value which is equal to the hint, blurClass should not be present.
 *
 * Changes: (look for inline comments in code below)
 * 	1.5.1 - In 1.4 this line used to be if(d.hasClass(c.blurClass)), however this 
 * was changed to (d.val() == "") because 1) using javascript, the value of 
 * an input can be changed without focusing the input (therefore without removing 
 * the blurClass, and 2) it was inconsistent with the way the hint is cleared on 
 * focus. The criteria for clearing input values is consistent now.
 * 
 * 	1.5.2 - This line lacked the removeClass directive in 1.4.  It has been added
 * to keep the states consistent. (i.e. the blurClass should only be present on
 * the input when the input is displaying the hint.
 * 
 * 	1.5.3 - These lines lacked the hasClass check in 1.4.  This caused CoolInput
 * to think that user input which was identical to the hint was in fact the hint.
 * Now, users should be able to type in input which is identical to the hint and
 * not have it cleared on form submission or input focus.
 * 
 * 	1.5.4 - This variable was added as a space optimization.  c.blurClass was
 * appearing enough times that it made it worth it to declare another variable.
 * 
 * 	1.5.5 - This is a feature addition for customizability.  Suppose the user
 * wants to use coolinput not just as a hint, but to get people "jumpstarted"
 * on their input.  For example, a url input which suggests "http://".  You
 * wouldn't want this to be cleared on focus, but probably would want it restored
 * on blur if the user leaves the input blank.
 * 
 * 	1.5.6.1 - This is a feature addition for customizability. Suppose the user
 * wants the hint to appear only the first time people see their input.  This seems
 * like a rather uncommon case, but the implementation was so trivial I figured it
 * was worth making that 100th person out of 100 happy.
 * 
 * 	1.5.6.2 - This used to be d.blur(), but had to be changed to check for empty
 * input because the blur handler is optional now.
 * 
 * 	1.5.7 - There were identical repeats of anonymous functions appearing in the
 * code, which I decided to abstract for the sake of good practice and for size
 * optimization.
 */
;(function($) {
	$.fn.coolinput = function(b) {
		/* Default options */
		var c = {
			hint:null,
			source:"title",
			blurClass:"blur",
			iconClass:false,
			clearOnSubmit:true,
			clearOnFocus:true, /* 1.5.5 */
			persistent:true /* 1.5.6.1 */
		};
		
		if(b && typeof b == "object")
			$.extend(c,b);
		else
			c.hint = b;
		
		return this.each(function() {
			var d = $(this);
			var e = c.hint || d.attr(c.source);
			var f = c.blurClass; /* 1.5.4 */
			
			function g() { /* 1.5.7 */
				if(d.val() == "")
					d.val(e).addClass(f)
			}
			
			function h() { /* 1.5.7 */
				if(d.val() == e && d.hasClass(f)) /* 1.5.3 */
					d.val("").removeClass(f)
			}
			
			if(e) {
				if(c.persistent) /* 1.5.6.1 */
					d.blur(g); /* 1.5.7 */
				
				if(c.clearOnFocus) /* 1.5.5 */
					d.focus(h); /* 1.5.7 */
				
				if(c.clearOnSubmit)
					d.parents("form:first").submit(h); /* 1.5.7 */
				
				if(c.iconClass)
					d.addClass(c.iconClass);
				
				g() /* 1.5.6.2, 1.5.7 */
			}
		})
	}
})(jQuery);
