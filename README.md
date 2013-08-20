# CoolInput

CoolInput is a straightforward and lightweight input-hint plugin for jQuery that defers to HTML5 when possible.
It supports a lot of custom options but has sensible defaults and can be easily used out of the box.

In short, it just works!

* Requires jQuery 1.2.6+

## Example

```javascript
// Simplest call, uses defaults.
$('.selector').coolinput();

// Most complex call, overrides all defaults.
$('.selector').coolinput({
  useHtml5:true, // Use HTML5's native placeholders when possible.
  hint:null, // Input hint text.
  source:"title", // Source attribute for input hint text. Overrides "hint".
  removeSource:true // Remove the source attribute after reading its value.
  blurClass:"blur", // Add a class to the input when it loses focus.
  iconClass:false, // Add an extra class to the input, used to add icons.
  clearOnSubmit:true, // Clear the input hint when the form is submitted (so an empty value is submitteed).
  clearOnFocus:true, // Clear the input hint when the input is focused.
  persistent:true, // If set to false, the input hint will only be visible the first time an input is seen.
});

// And, as usual, it's totally chainable can be chained.
$('.selector').find('.other-selector').coolinput().addClass('foo');
```

## Authors

CoolInput was created by Alex Weber and a significant contribution was made by Evan Winslow in version 1.5

## License

CoolInput is dual-licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php) and the [GNU General Public License](http://www.gnu.org/licenses/gpl-3.0.html).

Copyright (c) 2008-2012 [Alex Weber](http://alexweber.com.br)
